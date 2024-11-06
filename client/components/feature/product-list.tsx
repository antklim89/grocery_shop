import type { ListOptions } from 'pocketbase';
import { getProducts } from '@/lib/actions/product';
import { ProductCard } from './product-card';


async function ProductList(props: ListOptions & { page?: number; perPage?: number }) {
  const products = await getProducts(props);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export { ProductList };
