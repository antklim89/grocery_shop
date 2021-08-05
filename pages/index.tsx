import { GetStaticProps } from 'next';

import Features from '~/components/about/Features';
import Hero from '~/components/about/Hero';
import ProductsList from '~/components/products/ProductsList';
import ShowMoreProductsButton from '~/components/products/ShowMoreProductsButton';
import Seo from '~/components/utils/Seo';
import IndexPageQuery from '~/queries/IndexPageQuery.gql';
import { HeroProps, IFeature, IProductPreview } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    hero: HeroProps
    features: IFeature[]
    newProducts: IProductPreview[]
}

export default function HomePage({ hero, features, newProducts }: Props): JSX.Element {
    return (
        <>
            <Seo title="Home" />
            <Hero {...hero} />
            <ProductsList products={newProducts} />
            <ShowMoreProductsButton />
            <Features features={features} />
        </>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await fetcher<Props>(IndexPageQuery, {});

    return { props };
};
