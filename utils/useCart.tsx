import { useContext } from 'react';

import { Context } from '~/components/cart/CartProvider';
import { CartStore } from '~/types';


export const useCart = (): CartStore => useContext(Context);
