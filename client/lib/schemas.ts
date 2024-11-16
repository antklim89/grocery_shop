import { z } from 'zod';


export const LoginSchema = z.object({
  email: z.string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(200, { message: 'Username must be less than 200 characters.' })
    .email({ message: 'Invalid email address.' }),

  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(200, { message: 'Password must be less than 200 characters.' }),
});

export const SignupSchema = z.object({
  confirm: z.string(),
})
  .merge(LoginSchema)
  .refine(data => data.password === data.confirm, {
    message: 'Passwords do not match.',
    path: ['confirm'],
  });

export const AuthUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export const CartItemSchema = z.object({
  qty: z.number().int().min(1),
  product: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    price: z.number().min(0),
  }),
});
