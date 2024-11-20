'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Price } from '@/components/ui/price';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCart, useRemoveCart } from '@/lib/queries/cart';
import { Trash } from 'lucide-react';
import Link from 'next/link';


export default function CartList() {
  const { data: cart = [] } = useGetCart();
  const { trigger: removeCart } = useRemoveCart();


  const totalPrice = cart.reduce((total, { product, qty }) => total + product.price * (qty / product.batch), 0);
  return (
    <section className="container grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 my-8">
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map(({ product, qty }) => (
            <TableRow key={product.id}>
              <TableCell className="w-full min-w-32 font-bold">
                <Link href={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </TableCell>
              <TableCell>
                <span>{product.price}$</span>
                {' '}
                <span className="text-nowrap">for {product.batch} {product.unit}</span>
              </TableCell>
              <TableCell className="text-center">{qty}</TableCell>
              <TableCell className="text-center">
                <Button
                  aria-label="Remove cart item."
                  size="icon"
                  variant="destructive"
                  onClick={async () => removeCart({ cartProductId: product.id })}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card>
        <CardHeader>
          <CardTitle>Total Price: </CardTitle>
          <CardContent>
            <Price price={totalPrice} />
          </CardContent>
        </CardHeader>
      </Card>

      <Button asChild>
        <Link href="/checkout">Checkout</Link>
      </Button>
    </section>
  );
}
