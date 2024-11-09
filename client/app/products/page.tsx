import { ProductList } from '@/components/feature/product-list';


async function Page() {
  return (
    <section className="container my-8">
      <ProductList perPage={20} />
    </section>
  );
}

export default Page;
