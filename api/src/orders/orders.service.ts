import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, desc, gte, lte } from 'drizzle-orm';
import { orders, orderItems, products, vendors } from '../database/schema';
import { DatabaseType } from 'src/database/database.module';

@Injectable()
export class OrdersService {
  constructor(@Inject('DATABASE') private db: DatabaseType) {}

  async create(
    userId: string,
    createOrderDto: {
      items: Array<{ productId: string; quantity: number }>;
      shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      paymentReference?: string;
    },
  ) {
    // Calculate total and validate stock
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of createOrderDto.items) {
      const [product] = await this.db
        .select()
        .from(products)
        .where(eq(products.id, item.productId));

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}`,
        );
      }

      totalAmount += Number(product.price) * item.quantity;
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });

      // Update stock
      await this.db
        .update(products)
        .set({ stockQuantity: product.stockQuantity - item.quantity })
        .where(eq(products.id, item.productId));
    }

    // Create order
    const [order] = await this.db
      .insert(orders)
      .values({
        userId,
        totalAmount,
        shippingAddress: createOrderDto.shippingAddress,
        paymentReference: createOrderDto.paymentReference,
      })
      .returning();

    // Create order items
    const createdOrderItems = await Promise.all(
      orderItemsData.map((item) =>
        this.db
          .insert(orderItems)
          .values({
            orderId: order.id,
            ...item,
          })
          .returning(),
      ),
    );

    return {
      status: 'success',
      statusCode: 201,
      message: 'Order created successfully',
      data: {
        order,
        items: createdOrderItems.flat(),
      },
    };
  }

  async findAll(userId: string) {
    const results = await this.db
      .select({
        id: orders.id,
        totalAmount: orders.totalAmount,
        status: orders.status,
        shippingAddress: orders.shippingAddress,
        paymentReference: orders.paymentReference,
        createdAt: orders.createdAt,
        items: orderItems,
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));

    // Group items by order
    const ordersMap = new Map();
    results.forEach((row) => {
      if (!ordersMap.has(row.id)) {
        ordersMap.set(row.id, {
          id: row.id,
          totalAmount: row.totalAmount,
          status: row.status,
          shippingAddress: row.shippingAddress,
          paymentReference: row.paymentReference,
          createdAt: row.createdAt,
          items: [],
        });
      }
      if (row.items) {
        ordersMap.get(row.id).items.push(row.items);
      }
    });

    return {
      status: 'success',
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: Array.from(ordersMap.values()),
    };
  }

  async findOne(id: string, userId: string) {
    const [order] = await this.db
      .select()
      .from(orders)
      .where(and(eq(orders.id, id), eq(orders.userId, userId)));

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const items = await this.db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));

    return {
      status: 'success',
      statusCode: 200,
      message: 'Order retrieved successfully',
      data: {
        ...order,
        items,
      },
    };
  }

  async updateStatus(
    id: string,
    vendorId: string,
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled',
  ) {
    // Verify the order belongs to this vendor
    const [order] = await this.db
      .select()
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(and(eq(orders.id, id), eq(products.vendorId, vendorId)));

    if (!order) {
      throw new NotFoundException('Order not found or unauthorized');
    }

    const [updatedOrder] = await this.db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    return {
      status: 'success',
      statusCode: 200,
      message: 'Order status updated successfully',
      data: updatedOrder,
    };
  }

  async findVendorOrders(
    vendorId: string,
    query: {
      page?: number;
      limit?: number;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    } = {},
  ) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any[] = [eq(products.vendorId, vendorId)];

    if (query.status) {
      // Cast to any to satisfy type narrowing since status is runtime string
      // We rely on database to ignore invalid status values
      whereConditions.push(eq(orders.status, query.status as any));
    }

    if (query.dateFrom) {
      whereConditions.push(gte(orders.createdAt, new Date(query.dateFrom)));
    }

    if (query.dateTo) {
      whereConditions.push(lte(orders.createdAt, new Date(query.dateTo)));
    }

    const results = await this.db
      .select({
        orderId: orders.id,
        totalAmount: orders.totalAmount,
        status: orders.status,
        shippingAddress: orders.shippingAddress,
        createdAt: orders.createdAt,
        item: orderItems,
        product: products,
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(and(...whereConditions))
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    // Group by order
    const ordersMap = new Map();
    results.forEach((row) => {
      if (!ordersMap.has(row.orderId)) {
        ordersMap.set(row.orderId, {
          id: row.orderId,
          totalAmount: row.totalAmount,
          status: row.status,
          shippingAddress: row.shippingAddress,
          createdAt: row.createdAt,
          items: [],
        });
      }
      if (row.item && row.product) {
        ordersMap.get(row.orderId).items.push({
          ...row.item,
          product: row.product,
        });
      }
    });

    // Total count for pagination
    const totalCountRows = await this.db
      .select({ count: orders.id })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(and(...whereConditions));

    const total = totalCountRows.length;

    return {
      status: 'success',
      statusCode: 200,
      message: 'Vendor orders retrieved successfully',
      data: Array.from(ordersMap.values()),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Aggregated order statistics for dashboards
   */
  async getStats() {
    const statusRows = await this.db
      .select({ status: orders.status })
      .from(orders);

    const statusCounts = {
      pending: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    } as Record<string, number>;

    statusRows.forEach((row) => {
      if (row.status in statusCounts) {
        statusCounts[row.status] += 1;
      }
    });

    const revenueRows = await this.db
      .select({ totalAmount: orders.totalAmount })
      .from(orders);
    const totalRevenue = revenueRows.reduce(
      (acc, row) => acc + Number(row.totalAmount),
      0,
    );

    const totalOrders = statusRows.length;

    return {
      status: 'success',
      statusCode: 200,
      message: 'Order statistics retrieved successfully',
      data: {
        totalOrders,
        pendingOrders: statusCounts.pending,
        shippedOrders: statusCounts.shipped,
        deliveredOrders: statusCounts.delivered,
        cancelledOrders: statusCounts.cancelled,
        totalRevenue,
      },
    };
  }
}
