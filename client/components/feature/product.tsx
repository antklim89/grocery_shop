import type { RecordOptions } from 'pocketbase';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Price } from '@/components/ui/price';
import { getProduct } from '@/actions/product';
import Image from 'next/image';
import { CartAddButton } from './cart-add-button';


export async function Product({ id, options }: { id: string; options?: RecordOptions }) {
  const product = await getProduct({ id, options });
  const {
    name,
    price,
    discount,
    description,
    images,
    category,
    country,
    batch,
    unit,
  } = product;

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <Carousel>
              <CarouselContent>
                {images.map(image => (
                  <CarouselItem key={image}>
                    <Image
                      alt={name}
                      className="w-full h-64 object-cover"
                      height={300}
                      src={`/server/api/files/products/${id}/${image}`}
                      width={300}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="prose mt-6 sm:mt-8 lg:mt-0">
            <h1>
              {name}
            </h1>

            <p className="text-lg">
              <span className="capitalize">{category}</span>
              <span> from </span>
              <span className="capitalize">{country}</span>
            </p>

            <div className="flex flex-col items-start">
              <h3>Price for {batch} {unit}:</h3>
              <Price discount={discount} price={price} size="lg" />
            </div>

            <CartAddButton product={product} />

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
