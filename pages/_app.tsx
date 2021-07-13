import '~/styles/globals.scss';
import type { AppProps } from 'next/app';

import CartProvider from '~/components/cart/CartProvider';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';


const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <CartProvider>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </CartProvider>
    );
};


export default MyApp;
