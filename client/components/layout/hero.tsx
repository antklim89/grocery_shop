import { Button } from '@/components/ui/button';
import heroImg from '@/public/hero.png';
import Image from 'next/image';
import Link from 'next/link';


function Hero() {
  return (
    <section>
      <div className="container mx-auto pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-green-900">Grocery Shop</span>
              <span className="block text-green-600">The easiest way to buy your groceries online</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We are dedicated to providing the best possible service to our customers. We will always strive to be the best in the business.
            </p>

            <Button asChild className="text-lg font-bold" size="lg">
              <Link href="/products">Catalog</Link>
            </Button>
          </div>
          <Image
            alt="hero"
            className="hidden lg:block w-full max-h-[480px] object-contain"
            src={heroImg}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
