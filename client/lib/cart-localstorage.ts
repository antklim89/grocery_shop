import type { CartItem, CartItemUpdate } from './types';
import { CartItemSchema } from './schemas';


export function getCartFromLocalStorage(): CartItem[] {
  const cartStr = localStorage.getItem('cart');
  if (cartStr == null) return [];

  try {
    const cartJson = JSON.parse(cartStr) as unknown;
    const cart = CartItemSchema.array().parse(cartJson);
    return cart;
  } catch (error) {
    localStorage.removeItem('cart');
    console.error(error);
    return [];
  }
}

export function addCartToLocalStorage(newCartItem: CartItem) {
  const cart = getCartFromLocalStorage();
  const newCart: CartItem[] = [
    ...cart,
    newCartItem,
  ];
  localStorage.setItem('cart', JSON.stringify(newCart));
}

export function replaceCartToLocalStorage(newCart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(newCart));
}

export function removeCartFromLocalStorage(cartProductId: string) {
  const cart = getCartFromLocalStorage();
  const newCart = cart.filter(item => item.product.id !== cartProductId);

  localStorage.setItem('cart', JSON.stringify(newCart));
}

export function updateCartFromLocalStorage(cartProductId: string, cartItemUpdate: CartItemUpdate) {
  const cart = getCartFromLocalStorage();
  const updatedCart = cart.map(item => item.product.id === cartProductId ? { ...item, ...cartItemUpdate } : item);

  localStorage.setItem('cart', JSON.stringify(updatedCart));
}
