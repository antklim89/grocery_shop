import HeaderAuthMenu from '@/components/auth/header-auth-menu';
import { CartListButton } from '@/components/feature/cart-list-button';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
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
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
          <HeaderAuthMenu />
          <CartListButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
