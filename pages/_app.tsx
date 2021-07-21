import '~/styles/globals.scss';
import axios from 'axios';
import type { AppProps } from 'next/app';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AuthProvider from '~/components/auth/AuthProvider';
import CartProvider from '~/components/cart/CartProvider';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || '';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <AuthProvider>
            <CartProvider>
                <Header />
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </CartProvider>
        </AuthProvider>
    );
};


export default MyApp;
