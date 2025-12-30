import { pgTable, text, integer, timestamp, uuid, decimal } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price').notNull(),
  stock: integer('stock').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
