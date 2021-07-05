import '~/styles/globals.scss';
import type { AppProps } from 'next/app';

import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';


const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
};


export default MyApp;
