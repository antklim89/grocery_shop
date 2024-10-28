import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AuthProvider from '@/components/feature/auth-provider';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { initPocketBase } from '@/lib/pocketbase/server';
import './global.css';


export const metadata: Metadata = {
  title: {
    default: 'Grocery Shop',
    template: '&s | Grocery Shop',
  },
};

async function RootLayout({ children }: { children: ReactNode }) {
  const pb = await initPocketBase();

  return (
    <html lang="en">
      <head />
      <AuthProvider isAuth={pb.authStore.isValid}>
        <body className="grid grid-rows-[auto_1fr_auto] h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}

export default RootLayout;
