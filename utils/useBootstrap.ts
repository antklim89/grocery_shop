import type bootstrap from 'bootstrap';
import {
    useState, useRef, useEffect, RefObject,
} from 'react';


type Modules = keyof typeof bootstrap;

type Bootstrap = typeof bootstrap;

type BootstrapInstance<T extends Modules> = InstanceType<Bootstrap[T]> | null;

type Return<T extends Modules> = [
    BootstrapInstance<T>,
    RefObject<HTMLDivElement>
];

type Options = Record<string, boolean | number | string>;

const useBootstrap = <T extends Modules>(moduleName: T, opt: Options = {}): Return<T> => {
    const [module, setModule] = useState<BootstrapInstance<T>>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import(`bootstrap/js/src/${moduleName.toLocaleLowerCase()}`)
            .then(({ default: Module }) => {
                if (ref.current) {
                    setModule(new Module(ref.current, { toggle: false, ...opt }));
                }
            });
    }, []);

    return [module, ref];
};

export default useBootstrap;
