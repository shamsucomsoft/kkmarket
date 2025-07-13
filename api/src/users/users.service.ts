import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from '../database/schema';
import { DatabaseType } from 'src/database/database.module';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE') private readonly db: DatabaseType) {}

  async create(userData: {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role?: 'user' | 'vendor' | 'admin';
  }) {
    const [user] = await this.db
      .insert(users)
      .values({
        ...userData,
        role: userData.role || 'user',
      })
      .returning();
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  }

  async findById(id: string) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async update(id: string, updateData: Partial<typeof users.$inferInsert>) {
    const [user] = await this.db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async delete(id: string) {
    await this.db.delete(users).where(eq(users.id, id));
  }
}
