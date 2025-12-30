import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
});


export const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
});

export type Product = z.infer<typeof ProductSchema>;
