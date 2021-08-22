import { DependencyList, useEffect } from 'react';


export default function useAsyncEffect(effect: () => void, deps: DependencyList, clear?: () => void): void {
    useEffect(() => {
        effect();
        return clear?.();
    }, deps);
}
