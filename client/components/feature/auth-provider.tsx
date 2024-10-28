'use client';
import {
  createContext,
  type ReactNode,
  useContext,
} from 'react';


const Context = createContext(false);

function AuthProvider({ children, isAuth = false }: { children: ReactNode; isAuth: boolean }) {
  return (
    <Context.Provider value={isAuth}>{children}</Context.Provider>
  );
}

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Context);
