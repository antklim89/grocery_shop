import { z } from 'zod';


export const loginSchema = z.object({
  email: z.string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(200, { message: 'Username must be less than 200 characters.' }),

  password: z.string()
    .min(2, { message: 'Password must be at least 2 characters.' })
    .max(200, { message: 'Password must be less than 200 characters.' }),
});

export const registerSchema = z.object({
  confirm: z.string(),
})
  .merge(loginSchema)
  .refine(data => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match.',
  });
