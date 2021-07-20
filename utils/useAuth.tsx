import { useContext } from 'react';

import { Context } from '~/components/auth/AuthProvider';
import { AuthStore } from '~/types';


export const useAuth = (): AuthStore => useContext(Context);
