import type { ListOptions } from 'pocketbase';
import { getProducts } from '@/lib/actions/product';
import { ProductCard } from './product-card';
import { ProductListPagination } from './product-list-pagination';


export async function ProductList(props: ListOptions & { page?: number; perPage?: number }) {
  const { items, page, totalPages } = await getProducts(props);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ProductListPagination page={page} totalPages={totalPages} />
    </section>
  );
}
