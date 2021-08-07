import type { IBaseProduct } from './IBaseProduct';

import type { IStrapiImage } from '~/types';


export interface IProductPreview extends IBaseProduct {
    mainImage: IStrapiImage;
}
