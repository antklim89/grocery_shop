import type { ProductType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';


async function ProductSearchBadges({ products }: { products: ProductType[] }) {
  const productFilters = products.reduce((acc, product) => {
    acc.categories.add(product.category);
    acc.countries.add(product.country);
    return acc;
  }, {
    categories: new Set<string>(),
    countries: new Set<string>(),
  });

  return (
    <section className="my-8">
      {Object.entries(productFilters).map(([key, value]) => (
        <div className="p-4" key={key}>
          <h3 className="mb-2 text-2xl capitalize">{key}: </h3>
          <div className="flex gap-2">
            {Array.from(value, item => (
              <Link href={`/products?${key}=${item}`} key={item}>
                <Badge className="text-xl font-normal capitalize" variant="outline">
                  {item}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductSearchBadges;
