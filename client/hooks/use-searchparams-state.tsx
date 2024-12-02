import { useRouter, useSearchParams } from 'next/navigation';
import {
  useEffect,
  useReducer,
  useRef,
} from 'react';


export function useSearchParamsState<T extends Record<string, string>>(initState: T) {
  const searchparams = useSearchParams();
  const [state, setState] = useReducer(
    (oldState: T, newState: Partial<T>) => ({ ...oldState, ...newState }),
    initState,
    arg => ({ ...arg, ...Object.fromEntries(searchparams.entries()) }),
  );
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);

    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      Object.entries(state).forEach(([key, value]) => {
        if (value.length === 0) newSearchParams.delete(key);
        else newSearchParams.set(key, value);
      });


      if (newSearchParams.toString() === searchparams.toString()) return;
      router.replace(`?${newSearchParams.toString()}`);
    }, 700);

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [state, router, searchparams]);

  return [state, setState] as const;
}
