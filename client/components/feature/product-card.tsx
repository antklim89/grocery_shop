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


export function ProductCard({ product }: { product: ProductType }) {
  const {
    id,
    category,
    country,
    discount,
    name,
    price,
  } = product;
  return (
    <Card className="flex flex-col">
      <Image
        alt={name}
        className="w-full h-64 object-cover"
        height={300}
        src={`/server/api/files/products/${id}/${product.images[0] ?? ''}`}
        width={300}
      />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <span className="capitalize">{category}</span>
          <span> from </span>
          <span className="capitalize">{country}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Price discount={discount} price={price} />
      </CardContent>
      <CardFooter className="flex justify-end mt-auto">
        <Button asChild>
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
