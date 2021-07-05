

export function getPrice(price: number, discount: number): string {
    return (price - ((price / 100) * discount)).toFixed(2);
}
