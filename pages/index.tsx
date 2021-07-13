import { GetStaticProps } from 'next';

import Features from '~/components/about/Features';
import Hero from '~/components/about/Hero';
import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/utils/Seo';
import { HeroProps, IFeature, IProduct } from '~/types';


interface Props {
    hero: HeroProps
    features: IFeature[]
    newProducts: IProduct[]
}

export default function Home({ hero, features, newProducts }: Props): JSX.Element {
    return (
        <>
            <Seo title="Home" />
            <Hero {...hero} />
            <ProductsList products={newProducts} />
            <Features features={features} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const [hero, features, newProducts] = await Promise.all([
        fetch(`${process.env.API_URL}/hero`).then<HeroProps>((d) => d.json()),
        fetch(`${process.env.API_URL}/features`).then<IFeature[]>((d) => d.json()),
        fetch(`${process.env.API_URL}/products?_limit=4&_sort=id:DESC`).then<IProduct[]>((d) => d.json()),
    ]);

    return {
        props: { hero, features, newProducts },
    };
};
