import ProductFilter from '@/components/feature/product-filter';
import { ProductList } from '@/components/feature/product-list';


async function Page() {
  return (
    <section className="container my-8 grid grid-cols-[1fr_5fr] gap-4">
      <ProductFilter />
      <ProductList perPage={20} />
    </section>
  );
}

export default Page;
