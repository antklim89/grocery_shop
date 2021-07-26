
export interface IBaseProduct {
    id: number;
    name: string;
    price: number;
    category: {
        id: number;
        name: string;
    };
    country: {
        id: number;
        name: string;
    };
    discount: number;
    unit: number;
    measure: string;
}
