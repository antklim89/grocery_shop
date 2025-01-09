import HeaderAuthMenu from '@/components/auth/header-auth-menu';
import { CartListButton } from '@/components/feature/cart-list-button';
import ProductSearchInput from '@/components/feature/product-search-input';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';


const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Products',
    href: '/products',
  },
  {
    name: 'About',
    href: '/about',
  },
];

function Header() {
  return (
    <header className="sticky top-0 border-b bg-primary px-4 md:px-6 z-50">
      <div className="container flex h-16 items-center gap-4">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Logo className="size-10 fill-white" />
            <span className="sr-only">Grocery Shop</span>
          </Link>
          {links.map(link => (
            <Link
              className="text-white text-lg transition-colors hover:text-primary-foreground"
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="#"
              >
                <Logo className="size-10" />
                <span className="sr-only">Grocery Shop</span>
              </Link>
              {links.map(link => (
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  href={link.href}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto"></div>
          <div className="hidden md:block">
            <ProductSearchInput />
          </div>
          <HeaderAuthMenu />
          <CartListButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
