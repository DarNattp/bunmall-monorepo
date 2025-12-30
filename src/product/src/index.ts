import { Elysia } from 'elysia';
import { db } from './db';
import { products } from './db/schema';
import { ProductSchema } from '@bunmall/shared';
import { eq } from 'drizzle-orm';

const app = new Elysia()
  .get('/products', async () => {
    return await db.select().from(products);
  })
  .get('/products/:id', async ({ params: { id } }) => {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    if (!product) throw new Error('Product not found');
    return product;
  })
  .post('/products', async ({ body }) => {
    try {
      const [newProduct] = await db.insert(products).values({
        name: body.name,
        description: body.description,
        price: body.price.toString(),
        stock: body.stock,
      }).returning();
      return newProduct;
    } catch (e: any) {
      console.error(e);
      return new Response(JSON.stringify({ error: e.message, code: e.code, detail: e.detail || 'No detail' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }, {
    body: ProductSchema
  })
  .listen(3002);

console.log(`Product service running at ${app.server?.hostname}:${app.server?.port}`);
