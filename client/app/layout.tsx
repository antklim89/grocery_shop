import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import './global.css';


export const metadata: Metadata = {
  title: {
    default: 'Grocery Shop',
    template: '&s | Grocery Shop',
  },
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="grid grid-rows-[auto_1fr_auto] h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
