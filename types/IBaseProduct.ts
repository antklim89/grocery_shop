
export interface IBaseProduct {
    id: number|string
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
