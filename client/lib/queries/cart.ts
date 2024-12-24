import type { CartItem, CartItemUpdate } from '@/lib/types';
import {
  addCart,
  getCarts,
  removeCart,
  updateCart,
} from '@/actions/cart';
import {
  addCartToLocalStorage,
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
  replaceCartToLocalStorage,
  updateCartFromLocalStorage,
} from '@/lib/cart-localstorage';
import { pb } from '@/lib/pocketbase/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';


type QueryKey = 'cart';

export function useGetCarts() {
  return useSWR<CartItem[], Error, QueryKey>(
    'cart',
    async () => {
      const localCart = getCartFromLocalStorage();
      if (!pb.authStore.isValid) return localCart;

      const serverCart = await getCarts();

      const localRemains = new Set(localCart);
      serverCart.forEach((serverCartItem) => {
        try {
          const localCartItem = localCart.find(i => i.product.id === serverCartItem.product.id);

          if (localCartItem == null) {
            addCartToLocalStorage(serverCartItem);
          } else {
            localRemains.delete(localCartItem);
          }
        } catch (error) {
          console.error('🚀 ~ error: \n', error);
        }
      });

      await Promise.all(Array.from(localRemains, async (i) => {
        const newCartItem = await addCart({
          qty: i.qty,
          productId: i.product.id,
        });
        if (newCartItem == null) return;
        serverCart.push(newCartItem);
      }));

      replaceCartToLocalStorage(serverCart);

      return serverCart;
    },
    {
      fallbackData: [],
    },
  );
}

export function useAddCart() {
  return useSWRMutation<CartItem, Error, QueryKey, { cartItem: CartItem }, CartItem[]>(
    'cart',
    async (_, { arg: { cartItem } }) => {
      if (pb.authStore.isValid) {
        const serverCart = await addCart({ qty: cartItem.qty, productId: cartItem.product.id });
        addCartToLocalStorage(serverCart);
        return serverCart;
      }
      addCartToLocalStorage(cartItem);
      return cartItem;
    },
    {
      revalidate: false,
      populateCache(cartItem, currentData) {
        if (!currentData) return [];
        return [...currentData, cartItem];
      },
    },
  );
}

export function useRemoveCart({ cartId, productId }: { cartId?: string; productId: string }) {
  return useSWRMutation<void, Error, QueryKey, void, CartItem[]>(
    'cart',
    async () => {
      if (pb.authStore.isValid && cartId != null) {
        await removeCart({ cartId });
      }
      removeCartFromLocalStorage(productId);
    },
    {
      revalidate: false,
      populateCache(_, currentData) {
        if (!currentData) return [];
        return currentData.filter(item => item.product.id !== productId);
      },
    },
  );
}

export function useUpdateCart({ cartId, productId }: { cartId?: string; productId: string }) {
  return useSWRMutation<CartItemUpdate, Error, QueryKey, CartItemUpdate, CartItem[]>(
    'cart',
    async (_, { arg: cartItemUpdate }) => {
      if (pb.authStore.isValid && cartId != null) {
        await updateCart({ cartId, data: cartItemUpdate });
      }
      updateCartFromLocalStorage(productId, cartItemUpdate);
      return cartItemUpdate;
    },
    {
      revalidate: false,
      populateCache(cartItemUpdate, currentData) {
        if (!currentData) return [];
        return currentData.map(item => item.product.id === productId ? { ...item, ...cartItemUpdate } : item);
      },
    },
  );
}
