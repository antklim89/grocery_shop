import { GetStaticProps } from 'next';

import Hero from '~/components/about/Hero';
import Seo from '~/components/utils/Seo';
import { HeroProps } from '~/types';


interface IndexPageProps {
    hero: HeroProps
}

export default function Home({ hero }: IndexPageProps): JSX.Element {
    return (
        <>
            <Seo title="Home" />
            <Hero {...hero} />
            <section>CONTENT</section>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const [hero] = await Promise.all([
        fetch(`${process.env.API_URL}/hero`).then<HeroProps>((d) => d.json()),
    ]);
    hero.image.url = `${process.env.API_URL}${hero.image.url}`;

    return {
        props: { hero },
    };
};
