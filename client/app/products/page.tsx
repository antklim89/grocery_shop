import { getProducts } from '@/actions/product';
import ProductFilter from '@/components/feature/product-filter';
import { ProductList } from '@/components/feature/product-list';
import { ProductListPagination } from '@/components/feature/product-list-pagination';
import { z } from 'zod';


interface SearchParams {
  name?: string;
  country?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page: paramsPage, ...filter } = await searchParams;
  const page = z.coerce.number().min(1).default(1).catch(1).parse(paramsPage);

  const { items: products, totalPages } = await getProducts({
    page,
    perPage: 10,
    sort: '-created,id',
    filter,
  });

  return (
    <section className="container my-8 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
      <ProductFilter />
      <div>
        <ProductList products={products} />
        <ProductListPagination className="mt-4 md:mt-8" page={page} totalPages={totalPages} />
      </div>
    </section>
  );
}

export default Page;
