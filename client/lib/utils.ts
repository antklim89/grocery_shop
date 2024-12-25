import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormat = Intl.NumberFormat('en-Us', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: 'USD',
  style: 'currency',
  currencyDisplay: 'symbol',
  useGrouping: false,
});

export function getPrice(args: { price: number; discount?: number; qty?: number }): string {
  return priceFormat.format(calculatePrice(args));
}

export function calculatePrice({
  price = 0,
  discount = 0,
  qty = 1,
}: { price: number; discount?: number; qty?: number }): number {
  return (price / (1 - discount / 100)) * qty;
}

export function getSearchParams(
  searchParams: string[][] | Record<string, string> | string | URLSearchParams,
  key: string,
  value: string | number,
): string {
  const nextLink = new URLSearchParams(searchParams);
  nextLink.set(key, value.toString());

  return `?${nextLink.toString()}`;
}


const PocketBaseResponseSchema = z.object({
  response: z.object({
    status: z.number().optional(),
    message: z.string().optional(),
    data: z.record(z.string(), z.object({
      code: z.string(),
      message: z.string(),
    }).optional()),
  }),
});

export function isPocketBaseError(error: unknown): error is z.infer<typeof PocketBaseResponseSchema> {
  return PocketBaseResponseSchema.safeParse(error).success;
}
