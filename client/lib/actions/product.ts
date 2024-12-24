'use server';
import type { ProductsResponse } from '@/lib/pocketbase-types';
import type { ListOptions, ListResult, RecordOptions } from 'pocketbase';
import { handlePocketBaseError } from '@/lib/handlePocketbaseError';
import { initPocketBase } from '@/lib/pocketbase/server';


export async function getProducts({
  page = 1,
  perPage = 10,
  ...options
}: ListOptions & { page?: number; perPage?: number }): Promise<ListResult<ProductsResponse<unknown>>> {
  try {
    const pb = await initPocketBase();
    const result = await pb.collection('products').getList(page, Math.min(perPage, 100), options);

    return result;
  } catch (error) {
    throw new Error(handlePocketBaseError(error));
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
    throw new Error(handlePocketBaseError(error));
  }
}
