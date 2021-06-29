import { GetStaticProps } from 'next';

import AboutUs from '~/components/about/AboutUs';
import Features from '~/components/about/Features';
import { AboutAsProps, IFeature } from '~/types';


interface AboutUsPageProps {
    about: AboutAsProps
    features: IFeature[]
}

export default function aboutUs({ about, features }: AboutUsPageProps): JSX.Element {
    return (
        <main>
            <AboutUs {...about} />
            <Features features={features} />
        </main>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const about: AboutAsProps = await fetch(`${process.env.API_URL}/about-us`).then((d) => d.json());
    about.image.url = `${process.env.API_URL}${about.image.url}`;

    const features: IFeature[] = await fetch(`${process.env.API_URL}/features`).then((d) => d.json());
    for (const feature of features) {
        feature.image.url = `${process.env.API_URL}${feature.image.url}`;
    }

    return {
        props: {
            about,
            features,
        },
    };
};
