import type { CollectionRecords } from './pocketbase-types';
import { type ClassValue, clsx } from 'clsx';
import { ClientResponseError } from 'pocketbase';
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

export function getPbImageURL(collectionName: keyof CollectionRecords, collectionId: string, fileId: string) {
  return `/pb/api/files/${collectionName}/${collectionId}/${fileId}`;
}


export function isPocketBaseError(error: unknown): error is {
  response: {
    data: Record<string, {
      code: string;
      message: string;
    } | undefined>;
    message?: string | undefined;
    status?: number | undefined;
  };
} {
  return error instanceof ClientResponseError;
}
