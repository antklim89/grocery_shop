import type { CartItem } from './types';
import { CartItemSchema } from './schemas';


export async function getCartFromLocalStorage(): Promise<CartItem[]> {
  const cartStr = localStorage.getItem('cart');
  if (cartStr == null) return [];

  try {
    const cartJson = JSON.parse(cartStr) as unknown;
    const cart = await CartItemSchema.array().parseAsync(cartJson);
    return cart;
  } catch (error) {
    localStorage.removeItem('cart');
    console.error(error);
    return [];
  }
}

export async function addCartToLocalStorage({
  qty,
  product: {
    batch,
    id,
    name,
    price,
    unit,
  },
}: CartItem) {
  const cart = await getCartFromLocalStorage();
  const newCart = [
    ...cart,
    {
      qty,
      product: {
        batch,
        id,
        name,
        price,
        unit,
      },
    },
  ];
  localStorage.setItem('cart', JSON.stringify(newCart));
}

export async function removeCartFromLocalStorage(cartProductId: string) {
  const cart = await getCartFromLocalStorage();
  const newCart = cart.filter(item => item.product.id !== cartProductId);

  localStorage.setItem('cart', JSON.stringify(newCart));
}

export async function updateCartFromLocalStorage(cartProductId: string, cartItemUpdate: Partial<CartItem>) {
  const cart = await getCartFromLocalStorage();
  const updatedCart = cart.map(item => item.product.id === cartProductId ? { ...item, ...cartItemUpdate } : item);

  localStorage.setItem('cart', JSON.stringify(updatedCart));
}
