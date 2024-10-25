import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';


const PocketBaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.record(z.string(), z.object({
    code: z.string(),
    message: z.string(),
  }).optional()),
});

export function handlePocketBaseError(error: unknown): string {
  if (error instanceof ClientResponseError) {
    const { message, data: errors } = PocketBaseResponseSchema.parse(error.response);
    const firstError = Object.values(errors)[0];
    if (firstError?.message != null) return firstError.message;
    else return message;
  }

  return 'Unexpected error. Try again later';
}
