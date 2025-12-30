import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { RegisterSchema, LoginSchema } from '@bunmall/shared';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET || 'secret-key-for-dev',
    })
  )
  .post('/register', async ({ body }) => {
    try {
      const existing = await db.select().from(users).where(eq(users.email, body.email));
      if (existing.length > 0) {
        return { error: 'User already exists' };
      }

      const hashedPassword = await Bun.password.hash(body.password);
      const [user] = await db.insert(users).values({
        email: body.email,
        password: hashedPassword,
        name: body.name,
      }).returning();

      const { password, ...userSafe } = user;
      return { success: true, user: userSafe };
    } catch (e) {
      console.error(e);
      return { error: 'Registration failed' };
    }
  }, {
    body: RegisterSchema
  })
  .post('/login', async ({ body, jwt }) => {
    const [user] = await db.select().from(users).where(eq(users.email, body.email));

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isValid = await Bun.password.verify(body.password, user.password);
    if (!isValid) {
      return { error: 'Invalid credentials' };
    }

    const token = await jwt.sign({
      id: user.id,
      email: user.email
    });

    return { token };
  }, {
    body: LoginSchema
  })
  .listen(3001);

console.log(`Auth service running at ${app.server?.hostname}:${app.server?.port}`);
