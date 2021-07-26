import { IBaseProduct } from './IBaseProduct';

import { StrapiImage } from '~/types';


export interface IProduct extends IBaseProduct {
    description: string;
    images: StrapiImage[];
}
