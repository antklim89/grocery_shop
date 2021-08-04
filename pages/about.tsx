import { GetStaticProps } from 'next';

import AboutUs from '~/components/about/AboutUs';
import Features from '~/components/about/Features';
import { useAuth } from '~/components/auth/AuthProvider';
import Seo from '~/components/utils/Seo';
import AboutUsPageQuery from '~/queries/AboutUsPageQuery.gql';
import { AboutAsProps, IFeature } from '~/types';
import client from '~/utils/graphql-request';


interface Props {
    aboutUs: AboutAsProps
    features: IFeature[]
}

export default function AboutPage({ aboutUs, features }: Props): JSX.Element {
    const auth = useAuth();
    console.debug('auth.is: \n', auth.isAuth);

    return (
        <>
            <Seo title="AboutUs" />
            <AboutUs {...aboutUs} />
            <Features features={features} />
        </>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const props = await client.request<Props>(AboutUsPageQuery, {});


    return { props };
};
