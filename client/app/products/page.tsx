import ProductFilter from '@/components/feature/product-filter';
import { ProductList } from '@/components/feature/product-list';
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
  const {
    name,
    country,
    category,
    minPrice,
    maxPrice,
    page,
  } = await searchParams;
  const filterArr: string[] = [];
  if (name != null) filterArr.push(`name ~ "${name}"`);
  if (country != null) filterArr.push(`country ~ "${country}"`);
  if (category != null) filterArr.push(`category ~ "${category}"`);
  if (minPrice != null) filterArr.push(`price >= "${minPrice}"`);
  if (maxPrice != null) filterArr.push(`price <= "${maxPrice}"`);
  const filter = filterArr.join(' && ');

  return (
    <section className="container my-8 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
      <ProductFilter />
      <ProductList
        filter={filter}
        page={z.coerce.number().min(1).optional().catch(undefined).parse(page)}
        perPage={10}
      />
    </section>
  );
}

export default Page;
