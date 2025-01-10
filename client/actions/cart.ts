'use server';
import type { CartsRecord, CartsResponse, ProductsRecord } from '@/lib/pocketbase-types';
import type { CartItem, CartItemUpdate } from '@/lib/types';
import type { ListOptions, RecordOptions } from 'pocketbase';
import { initPocketBase } from '@/lib/pocketbase/server';


export async function getCarts(options: ListOptions = {}): Promise<CartItem[]> {
  try {
    const pb = await initPocketBase();
    if (!pb.authStore.isValid) throw new Error('You are not authenticated.');

    const result = await pb.collection<CartsResponse<{ product: ProductsRecord }>>('carts').getFullList({ expand: 'product', ...options });

    return result.map((i) => {
      if (!i.expand?.product) throw new Error('expand.product is not defined.');
      return ({
        cartId: i.id,
        qty: i.qty,
        batch: i.expand.product.batch,
        productId: i.expand.product.id,
        name: i.expand.product.name,
        price: i.expand.product.price,
        unit: i.expand.product.unit,
      });
    });
  } catch {
    throw new Error('Failed to fetch cart. Try again later.');
  }
}


export async function addCart({
  productId,
  qty,
}: {
  productId: string;
  qty: number;
}, options: RecordOptions = {}): Promise<CartItem> {
  try {
    const pb = await initPocketBase();
    if (!pb.authStore.isValid || !pb.authStore.model) throw new Error('You are not authenticated.');

    const data: Partial<CartsRecord> = {
      qty,
      product: productId,
      owner: pb.authStore.record.id,
    };
    const record = await pb
      .collection<CartsResponse<{ product: ProductsRecord }>>('carts')
      .create(data, { expand: 'product', ...options });

    if (!record.expand?.product) throw new Error('expand.product is not defined.');
    return {
      cartId: record.id,
      qty: record.qty,
      batch: record.expand.product.batch,
      productId: record.expand.product.id,
      name: record.expand.product.name,
      price: record.expand.product.price,
      unit: record.expand.product.unit,
    };
  } catch {
    throw new Error('Failed to add cart. Try again later.');
  }
}

export async function removeCart({ cartId }: { cartId: string }): Promise<void> {
  try {
    const pb = await initPocketBase();
    if (!pb.authStore.isValid || !pb.authStore.model) throw new Error('You are not authenticated.');

    await pb.collection('carts').delete(cartId);
  } catch {
    throw new Error('Failed to remove cart. Try again later.');
  }
}

export async function updateCart({ cartId, data }: { cartId: string; data: CartItemUpdate }): Promise<void> {
  try {
    const pb = await initPocketBase();
    if (!pb.authStore.isValid || !pb.authStore.model) throw new Error('You are not authenticated.');

    await pb.collection('carts').update(cartId, data);
  } catch {
    throw new Error('Failed to update cart. Try again later.');
  }
}
