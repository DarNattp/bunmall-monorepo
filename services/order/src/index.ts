import { Elysia } from 'elysia';
import { db } from './db';
import { orders, orderItems } from './db/schema';
import { eq } from 'drizzle-orm';
// import { jwt } from '@elysiajs/jwt'; // Middleware for auth if needed

const app = new Elysia()
  .get('/orders', async () => {
    // Return all orders (for demo)
    return await db.query.orders.findMany({
      with: {
        items: true
      }
    });
  })
  .post('/orders', async ({ body }) => {
    // Simple order creation
    // Body: { userId, items: [{ productId, quantity, price }] } <Type check needed>
    const { userId, items } = body as any;

    // Calculate total
    const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    return await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        userId,
        totalAmount: total.toString(),
      }).returning();

      for (const item of items) {
        await tx.insert(orderItems).values({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price.toString(),
        });
      }

      return newOrder;
    });
  })
  .listen(3003);

console.log(`Order service running at ${app.server?.hostname}:${app.server?.port}`);
