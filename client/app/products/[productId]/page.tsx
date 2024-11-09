import { Product } from '@/components/feature/product';


async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  return (
    <section className="container my-8">
      <Product id={productId} />
    </section>
  );
}

export default Page;
