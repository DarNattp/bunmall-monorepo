import { pgTable, text, integer, timestamp, uuid, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(), // Assuming foreign key to Users if we had mono-db-schema, but microservice usually just ID
  totalAmount: decimal('total_amount').notNull(),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price').notNull(),
});

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
