'use client';
import type { CartItem, ProductType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAddCart,
  useGetCart,
  useRemoveCart,
  useUpdateCart,
} from '@/lib/queries/cart';
import { ShoppingCart } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';


function CartAddButton({ product }: { product: ProductType }) {
  const { data: cart, isLoading } = useGetCart();
  const cartItem = cart?.find(item => item.product.id === product.id);

  if (isLoading) return <CartAddButtonSkeleton />;
  return <CartAddButtonForm cartItem={cartItem} product={product} />;
}

function CartAddButtonForm({ cartItem, product }: { cartItem?: CartItem; product: ProductType }) {
  const {
    id,
    unit,
  } = product;
  const [qty, setQty] = useState(() => cartItem?.qty ?? 1);

  const { trigger: addCart } = useAddCart();
  const { trigger: removeCart } = useRemoveCart();
  const { trigger: updateCart } = useUpdateCart();

  useEffect(() => {
    if (cartItem == null) return;
    void updateCart({ cartProductId: id, cartItemUpdate: { qty } });
  }, [qty, id, updateCart, cartItem]);

  async function handleAddToCart(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (cartItem) await removeCart({ cartProductId: id });
    else await addCart({ cartItem: { product, qty } });
  }

  return (
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
          value={qty}
          onBlur={e => setQty(Number(e.target.value))}
          onChange={e => setQty(Number.parseInt(e.target.value, 10))}
        />
        <span>{unit}</span>
      </div>
    </form>
  );
}

function CartAddButtonSkeleton() {
  return (
    <div className="flex flex-col-reverse sm:flex-row mt-6 gap-2 sm:gap-4 sm:items-center sm:mt-8">
      <Skeleton className="w-[150px] h-10" />
      <Skeleton className="w-[150px] h-10" />
    </div>
  );
}

export { CartAddButton };
