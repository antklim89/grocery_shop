'use server';
import type { ProductsResponse } from '@/lib/pocketbase-types';
import type { ListOptions, ListResult, RecordOptions } from 'pocketbase';
import { initPocketBase } from '@/lib/pocketbase/server';
import { isPocketBaseError } from '@/lib/utils';


export async function getProducts({
  page = 1,
  perPage = 10,
  ...options
}: ListOptions & { page?: number; perPage?: number }): Promise<ListResult<ProductsResponse<unknown>>> {
  try {
    const pb = await initPocketBase();
    const result = await pb.collection('products').getList(page, Math.min(perPage, 100), options);

    return result;
  } catch {
    throw new Error('Failed to fetch products list. Try again later.');
  }
}

export async function getProduct({
  id,
  options,
}: { id: string; options?: RecordOptions }): Promise<ProductsResponse<unknown>> {
  try {
    const pb = await initPocketBase();
    const result = await pb.collection('products').getOne(id, options);

    return result;
  } catch (error) {
    if (isPocketBaseError(error)) {
      if (error.response.status === 404) throw new Error('The product wasn\,t found.');
    }
    throw new Error('Failed to fetch product. Try again later.');
  }
}
