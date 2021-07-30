const cls = (...classes: Array<string|undefined|false|null>): string => (
    classes.reduce<string>((acc, item): string => {
        if (item) return `${acc} ${item}`;
        return acc;
    }, '')
);

export default cls;
