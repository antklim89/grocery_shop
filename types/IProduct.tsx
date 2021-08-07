import type { IBaseProduct } from './IBaseProduct';

import type { IStrapiImage } from '~/types';


export interface IProduct extends IBaseProduct {
    description: string;
    images: IStrapiImage[];
}
