import { ProductList } from '@/components/feature/product-list';


interface SearchParams {
  name?: string;
}

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { name = '' } = await searchParams;
  const filter = `name ~ "${name}"`;

  return (
    <section className="my-8">
      <ProductList
        skipTotal
        filter={filter}
        perPage={10}
      />
    </section>
  );
}

export default Page;
