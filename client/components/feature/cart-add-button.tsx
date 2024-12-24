'use client';
import type { CartItem, ProductType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Price } from '@/components/ui/price';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateEffect } from '@/hooks/use-update-effect';
import {
  useAddCart,
  useGetCarts,
  useRemoveCart,
  useUpdateCart,
} from '@/lib/queries/cart';
import { ShoppingCart } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';


export function CartAddButton({ product }: { product: ProductType }) {
  const { data: cart, isLoading } = useGetCarts();
  const cartItem = cart?.find(item => item.product.id === product.id);

  if (isLoading) return <CartAddButtonSkeleton />;
  return <CartAddButtonForm cartItem={cartItem} product={product} />;
}

function CartAddButtonForm({ cartItem, product }: { cartItem?: CartItem; product: ProductType }) {
  const [qtyInput, setQtyInput] = useState<string>(() => String(cartItem?.qty ?? product.batch));
  const qty = z.number().catch(1).parse(Number.parseFloat(qtyInput));

  const { trigger: addCart } = useAddCart();
  const { trigger: removeCart } = useRemoveCart({ productId: product.id, cartId: cartItem?.id });
  const { trigger: updateCart } = useUpdateCart({ productId: product.id, cartId: cartItem?.id });


  useUpdateEffect(() => {
    const timeoutId = setTimeout(() => {
      void updateCart({ qty });
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [qty, updateCart]);


  async function handleAddToCart(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (cartItem != null) await removeCart();
    else await addCart({ cartItem: { product, qty } });
  }

  const totalPrice = qty * (product.price / product.batch);

  return (
    <div>
      <div className="flex flex-col items-start">
        <h3>Total Price: </h3>
        <Price discount={product.discount} price={totalPrice} size="lg" />
      </div>

      <form
        className="flex flex-col-reverse sm:flex-row mt-6 gap-2 sm:gap-4 sm:items-center sm:mt-8"
        onSubmit={handleAddToCart}
      >

        <Button className="space-x-2">
          <ShoppingCart />
          <span>{cartItem == null ? 'Add to cart' : 'Remove from cart'}</span>
        </Button>
        <div className="flex items-center gap-2">
          <Input
            required
            className="min-w-32"
            max={1000000}
            min={1}
            name="qte"
            placeholder="Quantity"
            type="number"
            value={qtyInput}
            onBlur={() => setQtyInput(String(qty))}
            onChange={e => setQtyInput(e.target.value)}
          />
          <span>{product.unit}</span>
        </div>
      </form>
    </div>
  );
}


function CartAddButtonSkeleton() {
  return (
    <div className="mt-8">
      <div className="flex flex-col items-start gap-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>

      <div
        className="flex flex-col-reverse sm:flex-row mt-6 gap-2 sm:gap-4 sm:items-center sm:mt-8"
      >
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>
    </div>
  );
}
