import { useRouter, useSearchParams } from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
} from 'react';


export function useSearchParamsState(key: string, initState: string = '') {
  const searchparams = useSearchParams();
  const [state, setState] = useState(() => searchparams.get(key) ?? initState);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    if (state.length === 0) newSearchParams.delete(key);
    else newSearchParams.set(key, state);

    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (newSearchParams.toString() === new URLSearchParams(location.search).toString()) return;
      router.replace(`?${newSearchParams.toString()}`);
    }, 700);

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [state, router, key]);

  return [state, setState] as const;
}
