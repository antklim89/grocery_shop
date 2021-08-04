import { GetStaticProps } from 'next';

import AboutUs from '~/components/about/AboutUs';
import Features from '~/components/about/Features';
import Seo from '~/components/utils/Seo';
import AboutUsPageQuery from '~/queries/AboutUsPageQuery.gql';
import { AboutAsProps, IFeature } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    aboutUs: AboutAsProps
    features: IFeature[]
}

export default function AboutPage({ aboutUs, features }: Props): JSX.Element {
    return (
        <>
            <Seo title="AboutUs" />
            <AboutUs {...aboutUs} />
            <Features features={features} />
        </>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await fetcher<Props>(AboutUsPageQuery, {});

    return { props };
};
