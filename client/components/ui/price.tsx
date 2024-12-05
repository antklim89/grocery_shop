import { cn, getPrice } from '@/lib/utils';


const classes = {
  sizes: {
    sm: {
      base: 'text-lg',
      precent: 'text-xs',
      withoutDiscount: 'text-xs',
    },
    md: {
      base: 'text-xl',
      precent: 'text-sm',
      withoutDiscount: 'text-sm',
    },
    lg: {
      base: 'text-2xl',
      precent: 'text-md',
      withoutDiscount: 'text-md',
    },
  },
} as const;

interface Props {
  price: number;
  discount?: number;
  qty?: number;
  size?: keyof typeof classes.sizes;
}


export function Price({
  price,
  discount = 0,
  qty,
  size = 'md',
}: Props) {
  return (
    <p className="flex flex-col items-end gap-1">
      <span className={cn('font-bold tracking-tight text-gray-900', classes.sizes[size].base)}>
        {getPrice({ price, qty })}
      </span>

      {discount > 0 && (
        <>
          <span className={cn('font-sans text-gray-800/70 text-nowrap', classes.sizes[size].precent)}>
            - {discount} %
          </span>

          <span className={cn('line-through font-sans text-gray-500/70 text-nowrap', classes.sizes[size].withoutDiscount)}>
            {getPrice({ price, discount, qty })}
          </span>
        </>
      )}
    </p>
  );
}
