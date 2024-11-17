'use client';
import type { ReactNode } from 'react';
import { useGetCart } from '@/lib/queries/cart';


export function CartPresence({ productId, inCart, notInCart }: { productId: string; notInCart?: ReactNode; inCart?: ReactNode }) {
  const { data: cart = [] } = useGetCart();
  const idCartItemExists = cart?.findIndex(item => item.product.id === productId) >= 0;

  return (
    <div>
      {idCartItemExists ? (inCart ?? 'In Cart') : (notInCart ?? null)}
    </div>
  );
}
