import { IBaseProduct } from './IBaseProduct';

import { StrapiImage } from '~/types';


export interface IProductPreview extends IBaseProduct {
    mainImage: StrapiImage;
}
