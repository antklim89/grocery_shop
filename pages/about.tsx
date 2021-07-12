import { GetStaticProps } from 'next';

import AboutUs from '~/components/about/AboutUs';
import Features from '~/components/about/Features';
import Seo from '~/components/utils/Seo';
import { AboutAsProps, IFeature } from '~/types';


interface AboutUsPageProps {
    about: AboutAsProps
    features: IFeature[]
}

export default function aboutUs({ about, features }: AboutUsPageProps): JSX.Element {
    return (
        <>
            <Seo title="AboutUs" />
            <AboutUs {...about} />
            <Features features={features} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const [about, features] = await Promise.all([
        fetch(`${process.env.API_URL}/about-us`).then<AboutAsProps>((d) => d.json()),
        fetch(`${process.env.API_URL}/features`).then<IFeature[]>((d) => d.json()),
    ]);


    return {
        props: {
            about,
            features,
        },
    };
};
