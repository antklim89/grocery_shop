import { ProductList } from '@/components/feature/product-list';
import Hero from '@/components/layout/hero';


async function HomePage() {
  return (
    <div>
      <Hero />
      <section className="container my-8">
        <ProductList perPage={3} />
      </section>
    </div>
  );
}

export default HomePage;
