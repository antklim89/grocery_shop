import { ProductList } from '@/components/feature/product-list';
import Hero from '@/components/layout/hero';


async function HomePage() {
  return (
    <div>
      <Hero />
      <section className="container my-8">
        <h2 className="text-4xl font-bold mb-4 ml-8">New Products</h2>
        <ProductList perPage={3} />
      </section>
    </div>
  );
}

export default HomePage;
