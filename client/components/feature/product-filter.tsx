'use client';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useSearchParamsState } from '@/hooks/use-searchparams-state';
import { FilterIcon } from 'lucide-react';


export default function ProductFilter() {
  return (
    <>
      <aside className="hidden lg:block">
        <h2 className="text-2xl font-bold mb-8">Filter</h2>
        <ProductFilterForm className="flex flex-col gap-8" />
      </aside>

      <Dialog>
        <div className="flex lg:hidden justify-end">
          <DialogTrigger asChild aria-label="Filter products">
            <Button>
              <span className="text-lg mr-4">Filter</span>
              <FilterIcon />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Filter
            </DialogTitle>
            <DialogDescription>
              Products filter.
            </DialogDescription>
          </DialogHeader>
          <ProductFilterForm className="flex flex-col gap-8" />
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProductFilterForm(props: ComponentProps<'form'>) {
  const [name, setName] = useSearchParamsState('name');
  const [country, setCountry] = useSearchParamsState('country');
  const [category, setCategory] = useSearchParamsState('category');
  const [minPrice, setMinPrice] = useSearchParamsState('minPrice');
  const [maxPrice, setMaxPrice] = useSearchParamsState('maxPrice');

  return (
    <form {...props}>
      <label>
        Name:
        <Input
          required
          placeholder="Potato"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label>
        Country:
        <Input
          required
          placeholder="Peru"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
      </label>

      <label>
        Category:
        <Input
          required
          placeholder="Vegetables"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </label>

      <label>
        Price:
        <div className="flex items-center gap-2">
          <Input
            required
            max={100}
            placeholder="0"
            type="number"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <Input
            required
            placeholder="10000"
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </div>
      </label>
    </form>
  );
}
