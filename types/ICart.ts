import type { IProductPreview } from './IProductPreview';


export interface ICart {
    id: number
    qty: number
    product: IProductPreview
}
