import { StrapiImage } from '~/types';


export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    category: {
        id: number;
        name: string;
    };
    country: {
        id: number;
        name: string;
    };
    discount: number;
    published_at: string;
    created_at: string;
    updated_at: string;
    mainImage: StrapiImage;
    images: StrapiImage[];
    unit: number;
    measure: string;
}
