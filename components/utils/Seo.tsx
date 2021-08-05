import Head from 'next/head';
import { FC } from 'react';


export interface Props {
    description?: string;
    title: string;
    keywords?: string[]
}


const Seo: FC<Props> = ({
    description,
    keywords = [],
    title,
}) => {
    const metaDescription = `Grocery Shop. ${description || ''}`.trim();
    const defaultTitle = `${title ? `${title} | ` : ''}Grocery Shop`;

    return (
        <Head>
            <title>{defaultTitle}</title>
            <link href="/favicon.ico" rel="icon" />
            <meta content={metaDescription} name="description" />
            <meta content={['grocery', 'shop', ...keywords].join(', ')} name="keywords" />
            <meta content={metaDescription} name="description" />
            <meta content={title} property="og:title" />
            <meta content={metaDescription} property="og:description" />
            <meta content="website" property="og:type" />
            <meta content="summary" name="twitter:card" />
            <meta content="Me'" name="twitter:creator" />
            <meta content={title} name="twitter:title" />
            <meta content={metaDescription} name="twitter:description" />
        </Head>
    );
};

export default Seo;
