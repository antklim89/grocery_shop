import type { ProductType } from '@/lib/types';
import { ProductCard } from './product-card';


export async function ProductList({ products }: { products: ProductType[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
