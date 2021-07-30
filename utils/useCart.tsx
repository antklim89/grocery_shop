import { useContext } from 'react';

import { Context } from '~/components/cart/CartProvider';
import { CartStore } from '~/store/CartStore';


export const useCart = (): CartStore => useContext(Context);
