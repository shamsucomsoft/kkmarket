import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, like, desc, asc, and, gte, lte } from 'drizzle-orm';
import { products, vendors } from '../database/schema';
import { DatabaseType } from 'src/database/database.module';

@Injectable()
export class ProductsService {
  constructor(@Inject('DATABASE') private db: DatabaseType) {}

  async findAll(query: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    let whereConditions = [eq(products.isActive, true)];

    if (query.category) {
      whereConditions.push(eq(products.category, query.category));
    }

    if (query.search) {
      whereConditions.push(like(products.name, `%${query.search}%`));
    }

    if (query.minPrice) {
      whereConditions.push(gte(products.price, query.minPrice));
    }

    if (query.maxPrice) {
      whereConditions.push(lte(products.price, query.maxPrice));
    }

    const orderBy =
      query.sortBy === 'price'
        ? query.sortOrder === 'desc'
          ? desc(products.price)
          : asc(products.price)
        : desc(products.createdAt);

    const results = await this.db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stockQuantity: products.stockQuantity,
        category: products.category,
        images: products.images,
        variants: products.variants,
        createdAt: products.createdAt,
        vendor: {
          id: vendors.id,
          businessName: vendors.businessName,
          businessDescription: vendors.businessDescription,
        },
      })
      .from(products)
      .leftJoin(vendors, eq(products.vendorId, vendors.id))
      .where(and(...whereConditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const total = await this.db
      .select({ count: products.id })
      .from(products)
      .where(and(...whereConditions));

    return {
      status: 'success',
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: results,
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  }

  async findOne(id: string) {
    const [product] = await this.db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stockQuantity: products.stockQuantity,
        category: products.category,
        images: products.images,
        variants: products.variants,
        createdAt: products.createdAt,
        vendor: {
          id: vendors.id,
          businessName: vendors.businessName,
          businessDescription: vendors.businessDescription,
        },
      })
      .from(products)
      .leftJoin(vendors, eq(products.vendorId, vendors.id))
      .where(eq(products.id, id));

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      status: 'success',
      statusCode: 200,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  async create(
    vendorId: string,
    createProductDto: {
      name: string;
      description?: string;
      price: number;
      stockQuantity: number;
      category: string;
      images?: string[];
      variants?: Record<string, any>;
    },
  ) {
    const [product] = await this.db
      .insert(products)
      .values({
        ...createProductDto,
        vendorId,
      })
      .returning();

    return {
      status: 'success',
      statusCode: 201,
      message: 'Product created successfully',
      data: product,
    };
  }

  async update(
    id: string,
    vendorId: string,
    updateProductDto: Partial<typeof products.$inferInsert>,
  ) {
    const [product] = await this.db
      .update(products)
      .set({ ...updateProductDto, updatedAt: new Date() })
      .where(and(eq(products.id, id), eq(products.vendorId, vendorId)))
      .returning();

    if (!product) {
      throw new NotFoundException('Product not found or unauthorized');
    }

    return {
      status: 'success',
      statusCode: 200,
      message: 'Product updated successfully',
      data: product,
    };
  }

  async delete(id: string, vendorId: string) {
    const [product] = await this.db
      .update(products)
      .set({ isActive: false, updatedAt: new Date() })
      .where(and(eq(products.id, id), eq(products.vendorId, vendorId)))
      .returning();

    if (!product) {
      throw new NotFoundException('Product not found or unauthorized');
    }

    return {
      status: 'success',
      statusCode: 200,
      message: 'Product deleted successfully',
    };
  }

  async findByVendor(vendorId: string) {
    const results = await this.db
      .select()
      .from(products)
      .where(eq(products.vendorId, vendorId));

    return {
      status: 'success',
      statusCode: 200,
      message: 'Vendor products retrieved successfully',
      data: results,
    };
  }
}
