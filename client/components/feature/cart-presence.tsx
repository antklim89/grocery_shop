'use client';
import type { ReactNode } from 'react';
import { useGetCarts } from '@/hooks/use-cart';


export function CartPresence({ productId, inCart, notInCart }: { productId: string; notInCart?: ReactNode; inCart?: ReactNode }) {
  const { data: cart = [] } = useGetCarts();
  const idCartItemExists = cart?.findIndex(item => item.productId === productId) >= 0;

  return (
    <div>
      {idCartItemExists ? (inCart ?? 'In Cart') : (notInCart ?? null)}
    </div>
  );
}
