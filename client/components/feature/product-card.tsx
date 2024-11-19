import type { ProductType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Price } from '@/components/ui/price';
import Image from 'next/image';
import Link from 'next/link';
import { CartPresence } from './cart-presence';


export function ProductCard({ product }: { product: ProductType }) {
  const {
    id,
    category,
    country,
    discount,
    name,
    price,
    batch,
    unit,
    images,
  } = product;
  return (
    <Card className="flex flex-col">
      <Image
        alt={name}
        className="w-full h-64 object-cover"
        height={300}
        src={`/server/api/files/products/${id}/${images[0] ?? ''}`}
        width={300}
      />
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
        <CardDescription>
          <span className="capitalize">{category}</span>
          <span> from </span>
          <span className="capitalize">{country}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 justify-between">
        <Price discount={discount} price={price} />
        <p>for {batch} {unit}</p>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto">
        <CartPresence
          inCart={<Link className="text-primary text-lg" href="/cart">In Cart</Link>}
          productId={id}
        />
        <Button asChild>
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
