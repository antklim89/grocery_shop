import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { SWRConfigProvider } from '@/components/providers/swr-config-provider';
import { Toaster } from '@/components/ui/toaster';
import { NuqsAdapter } from 'nuqs/adapters/next';
import './global.css';


export const metadata: Metadata = {
  title: {
    default: 'Grocery Shop',
    template: '&s | Grocery Shop',
  },
};

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <SWRConfigProvider>
        <NuqsAdapter>
          <body className="grid grid-rows-[auto_1fr_auto] h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </body>
        </NuqsAdapter>
      </SWRConfigProvider>
    </html>
  );
}

export default RootLayout;
