import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


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
  return (price - price * (discount / 100)) * qty;
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
