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


const initFilter = {
  name: '',
  country: '',
  category: '',
  minPrice: '',
  maxPrice: '',
};

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
  const [filter, setFilter] = useSearchParamsState(initFilter, {
    onChange: searchParams => searchParams.delete('page'),
  });

  return (
    <form {...props}>
      <label>
        Name:
        <Input
          placeholder="Potato"
          value={filter.name}
          onChange={e => setFilter({ name: e.target.value })}
        />
      </label>

      <label>
        Country:
        <Input
          placeholder="Peru"
          value={filter.country}
          onChange={e => setFilter({ country: e.target.value })}
        />
      </label>

      <label>
        Category:
        <Input
          placeholder="Vegetables"
          value={filter.category}
          onChange={e => setFilter({ category: e.target.value })}
        />
      </label>

      <label>
        Price:
        <div className="flex items-center gap-2">
          <Input
            max={100}
            placeholder="0"
            type="number"
            value={filter.minPrice}
            onChange={e => setFilter({ minPrice: e.target.value })}
          />
          <span>-</span>
          <Input
            placeholder="10000"
            type="number"
            value={filter.maxPrice}
            onChange={e => setFilter({ maxPrice: e.target.value })}
          />
        </div>
      </label>
      <Button
        type="button"
        onClick={() => setFilter(initFilter)}
      >
        Clear
      </Button>
    </form>
  );
}
