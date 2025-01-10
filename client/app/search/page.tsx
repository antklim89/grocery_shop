import { getProducts } from '@/actions/product';
import { ProductList } from '@/components/feature/product-list';


interface SearchParams {
  name?: string;
}

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filter = await searchParams;

  const { items: products } = await getProducts({
    skipTotal: true,
    perPage: 10,
    sort: '-created,id',
    filter,
  });

  return (
    <section className="my-8">
      <ProductList products={products} />
    </section>
  );
}

export default Page;
