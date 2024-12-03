import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useReducer, useRef } from 'react';


export function useSearchParamsState<T extends Record<string, string>>(
  initState: T,
  { onChange }: { onChange?: (newSearchParams: URLSearchParams) => void } = {},
) {
  const onChangeRef = useRef<typeof onChange>();
  onChangeRef.current = onChange;

  const searchparams = useSearchParams();
  const [state, setState] = useReducer(
    (oldState: T, newState: Partial<T>) => ({ ...oldState, ...newState }),
    initState,
    arg => ({ ...arg, ...Object.fromEntries(searchparams.entries()) }),
  );
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newSearchParams = new URLSearchParams(location.search);

      Object.entries(state).forEach(([key, value]) => {
        if (value.length === 0) newSearchParams.delete(key);
        else newSearchParams.set(key, value);
      });

      onChangeRef.current?.(newSearchParams);

      if (location.search.substring(1) === newSearchParams.toString()) return;
      router.replace(`?${newSearchParams.toString()}`);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [state, router]);

  return [state, setState] as const;
}
