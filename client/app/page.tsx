import { getProducts } from '@/actions/product';
import { ProductList } from '@/components/feature/product-list';
import Hero from '@/components/layout/hero';


async function HomePage() {
  const [newProducts, discountProducts] = await Promise.all([
    getProducts({
      skipTotal: true,
      perPage: 6,
      sort: '-created,id',
    }),
    getProducts({
      skipTotal: true,
      perPage: 6,
      sort: '-discount',
    }),
  ]);

  return (
    <div>
      <Hero />
      <section className="container space-y-4 md:space-y-12 my-4 md:my-8">
        <h2 className="text-4xl font-bold mb-4 ml-8">New Products</h2>
        <ProductList products={newProducts.items} />

        <h2 className="text-4xl font-bold mb-4 ml-8">Best Discount</h2>
        <ProductList products={discountProducts.items} />
      </section>
    </div>
  );
}

export default HomePage;
