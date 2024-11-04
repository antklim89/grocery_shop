import type { z } from 'zod';
import type { AuthUserSchema } from './schemas';


export type AuthUser = z.infer<typeof AuthUserSchema>;
