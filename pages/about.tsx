import { GetStaticProps } from 'next';

import AboutUs from '~/components/about/AboutUs';
import Features from '~/components/about/Features';
import Seo from '~/components/utils/Seo';
import AboutUsPageQuery from '~/queries/AboutUsPageQuery.gql';
import { AboutAsProps, IFeature } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    about: AboutAsProps
    features: IFeature[]
}

const AboutPage = ({ about, features }: Props): JSX.Element => {
    return (
        <>
            <Seo title="AboutUs" />
            <AboutUs {...about} />
            <Features features={features} />
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await fetcher<Props>(AboutUsPageQuery, {});

    return { props, revalidate: 1000 };
};

export default AboutPage;
