'use client';
import { Button } from '@/components/ui/button';
import { useGetCart } from '@/lib/queries/cart';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';


export function CartListButton() {
  const { data: cart = [] } = useGetCart();


  return (
    <Button asChild className="relative inline-flex items-center p-3 text-sm font-medium text-center">
      <Link href="/cart">
        {cart.length === 0
          ? null
          : (
              <>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">
                  {cart.length}
                </div>
              </>
            )}
        <ShoppingCart />
      </Link>
    </Button>
  );
}
