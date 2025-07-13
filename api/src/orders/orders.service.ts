import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, desc } from 'drizzle-orm';
import { orders, orderItems, products, vendors } from '../database/schema';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('DATABASE') private db: NodePgDatabase<typeof orders>,
  ) {}

  async create(userId: string, createOrderDto: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    paymentReference?: string;
  }) {
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
        throw new BadRequestException(`Insufficient stock for product ${product.name}`);
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
      orderItemsData.map(item =>
        this.db
          .insert(orderItems)
          .values({
            orderId: order.id,
            ...item,
          })
          .returning()
      )
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
    results.forEach(row => {
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

  async updateStatus(id: string, vendorId: string, status: 'pending' | 'shipped' | 'delivered' | 'cancelled') {
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

  async findVendorOrders(vendorId: string) {
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
      .where(eq(products.vendorId, vendorId))
      .orderBy(desc(orders.createdAt));

    // Group by order
    const ordersMap = new Map();
    results.forEach(row => {
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

    return {
      status: 'success',
      statusCode: 200,
      message: 'Vendor orders retrieved successfully',
      data: Array.from(ordersMap.values()),
    };
  }
}