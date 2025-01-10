'use server';
import type { ProductsResponse } from '@/lib/pocketbase-types';
import type { ListResult } from 'pocketbase';
import { initPocketBase } from '@/lib/pocketbase/server';
import { isPocketBaseError } from '@/lib/utils';


const GET_PRODUCTS_FILTER_QUERY = 'name ~ {:name} && country ~ {:country} && category ~ {:category} && price >= {:minPrice} && price <= {:maxPrice}';

interface GetProductsArguments {
  page?: number;
  perPage?: number;
  sort?: string;
  skipTotal?: boolean;
  filter?: {
    name?: string;
    country?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

export async function getProducts({
  page = 1,
  perPage = 10,
  sort = '',
  skipTotal = false,
  filter: {
    name = '',
    country = '',
    category = '',
    minPrice = '0',
    maxPrice = '',
  } = {},
}: GetProductsArguments): Promise<ListResult<ProductsResponse<unknown>>> {
  try {
    const pb = await initPocketBase();

    const filter = pb.filter(GET_PRODUCTS_FILTER_QUERY, {
      name,
      country,
      category,
      page,
      minPrice,
      maxPrice,
    });
    const result = await pb
      .collection('products')
      .getList(page, Math.min(perPage, 100), { sort, skipTotal, filter });

    return result;
  } catch {
    throw new Error('Failed to fetch products list. Try again later.');
  }
}

export async function getProduct({ id }: { id: string }): Promise<ProductsResponse<unknown>> {
  try {
    const pb = await initPocketBase();
    const result = await pb.collection('products').getOne(id);

    return result;
  } catch (error) {
    if (isPocketBaseError(error)) {
      if (error.response.status === 404) throw new Error('The product wasn\'t found.');
    }
    throw new Error('Failed to fetch product. Try again later.');
  }
}
