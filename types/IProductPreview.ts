import type { IBaseProduct } from './IBaseProduct';

import type { StrapiImage } from '~/types';


export interface IProductPreview extends IBaseProduct {
    mainImage: StrapiImage;
}
