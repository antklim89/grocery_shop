import { StrapiImage } from '~/types';


export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    country: string;
    discount: number;
    published_at: string;
    created_at: string;
    updated_at: string;
    mainImage: StrapiImage;
    images: StrapiImage[];
}
