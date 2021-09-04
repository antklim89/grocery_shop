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
    discountProducts: IProductPreview[]
}

const HomePage = ({ hero, features, newProducts, discountProducts }: Props): JSX.Element => {
    return (
        <>
            <Seo title="Home" />
            <Hero {...hero} />
            <div className="container">
                <ProductsList products={newProducts} />
            </div>
            <div className="text-center my-5 p-5 bg-primary-gradient">
                <p className="text-white display-1 m-5 text-uppercase">{hero.secondText}</p>
            </div>
            <div className="container">
                <ProductsList products={discountProducts} />
            </div>
            <ShowMoreProductsButton />
            <Features features={features} />
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await fetcher<Props>(IndexPageQuery, {});

    return { props, revalidate: 1000 };
};

export default HomePage;
