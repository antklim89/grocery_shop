import type { IBaseProduct } from './IBaseProduct';

import type { StrapiImage } from '~/types';


export interface IProduct extends IBaseProduct {
    description: string;
    images: StrapiImage[];
}
