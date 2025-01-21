import { getProducts } from '@/actions/product';
import { ProductList } from '@/components/feature/product-list';
import ProductSearchBadges from '@/components/feature/product-search-badges';


interface SearchParams {
  s?: string;
}

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { s: search } = await searchParams;

  const { items: products } = await getProducts({
    skipTotal: true,
    perPage: 10,
    sort: '-created,id',
    filter: {
      search,
    },
  });

  return (
    <section className="container my-8">
      <ProductSearchBadges products={products} />
      <ProductList products={products} />
    </section>
  );
}

export default Page;
