
export interface IBaseProduct {
    id: number
    name: string
    price: number
    category: {
        id: number
        name: string
    }
    country: {
        id: number
        name: string
    }
    discount: number
    discountPrice: number
    quantityPerUnit: number
    unit: string
}
