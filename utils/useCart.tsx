import { useContext } from 'react';

import { Context } from '~/components/cart/CartProvider';
import { CartContext } from '~/types';


export const useCart = (): CartContext => useContext(Context);
