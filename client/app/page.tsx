import { ProductList } from '@/components/feature/product-list';
import Hero from '@/components/layout/hero';


async function HomePage() {
  return (
    <div>
      <Hero />
      <section className="container space-y-4 md:space-y-12 my-4 md:my-8">
        <h2 className="text-4xl font-bold mb-4 ml-8">New Products</h2>
        <ProductList skipTotal perPage={6} sort="-created,id" />

        <h2 className="text-4xl font-bold mb-4 ml-8">Best Discount</h2>
        <ProductList skipTotal perPage={6} sort="-discount" />
      </section>
    </div>
  );
}

export default HomePage;
