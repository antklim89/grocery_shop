import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef,
} from 'react';


export function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const isInit = useRef(true);

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }

    return effect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
