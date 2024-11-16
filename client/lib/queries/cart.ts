import type { CartItem } from '@/lib/types';
import {
  addCartToLocalStorage,
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
  updateCartFromLocalStorage,
} from '@/lib/cart-localstorage';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';


type QueryKey = 'cart';

export function useGetCart() {
  return useSWR<CartItem[], Error, QueryKey>(
    'cart',
    async () => {
      const cart = await getCartFromLocalStorage();
      return cart;
    },
    {
      fallbackData: [],
    },
  );
}

export function useAddCart() {
  return useSWRMutation<{ cartItem: CartItem }, Error, QueryKey, { cartItem: CartItem }, CartItem[]>(
    'cart',
    async (_, { arg: { cartItem } }) => {
      await addCartToLocalStorage(cartItem);
      return { cartItem };
    },
    {
      revalidate: false,
      populateCache({ cartItem }, currentData) {
        if (!currentData) return [];
        return [...currentData, cartItem];
      },
    },
  );
}

export function useRemoveCart() {
  return useSWRMutation<{ cartProductId: string }, Error, QueryKey, { cartProductId: string }, CartItem[]>(
    'cart',
    async (_, { arg: { cartProductId } }) => {
      await removeCartFromLocalStorage(cartProductId);
      return { cartProductId };
    },
    {
      revalidate: false,
      populateCache({ cartProductId }, currentData) {
        if (!currentData) return [];
        return currentData.filter(item => item.product.id !== cartProductId);
      },
    },
  );
}

export function useUpdateCart() {
  return useSWRMutation<{ cartProductId: string; cartItemUpdate: Partial<CartItem> }, Error, QueryKey, { cartProductId: string; cartItemUpdate: Partial<CartItem> }, CartItem[]>(
    'cart',
    async (_, { arg: { cartProductId, cartItemUpdate } }) => {
      await updateCartFromLocalStorage(cartProductId, cartItemUpdate);
      return { cartProductId, cartItemUpdate };
    },
    {
      revalidate: false,
      populateCache({ cartProductId, cartItemUpdate }, currentData) {
        if (!currentData) return [];
        return currentData.map(item => item.product.id === cartProductId ? { ...item, ...cartItemUpdate } : item);
      },
    },
  );
}
