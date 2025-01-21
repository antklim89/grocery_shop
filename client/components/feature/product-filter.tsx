'use client';
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
import { FilterIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  type Options,
  parseAsString,
  useQueryState,
} from 'nuqs';
import { type ComponentProps, useEffect } from 'react';


const parseOptions: Options = {
  shallow: false,
  throttleMs: 700,
};


export default function ProductFilter() {
  return (
    <>
      <ProductFilterAside />
      <ProductFilterDialog />
    </>
  );
}

function ProductFilterAside() {
  const router = useRouter();

  return (
    <aside className="hidden lg:block">
      <h2 className="text-2xl font-bold mb-8">Filter</h2>
      <ProductFilterForm className="flex flex-col gap-8" />
      <Button className="my-4 w-full" type="button" onClick={() => router.replace('?')}>
        Clear
      </Button>
    </aside>
  );
}

function ProductFilterDialog() {
  const router = useRouter();

  return (
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
        <DialogFooter className="flex justify-end flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => router.replace('?')}>
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProductFilterForm(props: ComponentProps<'form'>) {
  const router = useRouter();
  const [name, setName] = useQueryState('name', parseAsString.withOptions(parseOptions).withDefault(''));
  const [country, setCountry] = useQueryState('country', parseAsString.withOptions(parseOptions).withDefault(''));
  const [category, setCategory] = useQueryState('category', parseAsString.withOptions(parseOptions).withDefault(''));
  const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsString.withOptions(parseOptions).withDefault(''));
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsString.withOptions(parseOptions).withDefault(''));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('page')) return;
    searchParams.delete('page');
    router.replace(`?${searchParams}`, { scroll: false });
  }, [router, name, country, category, minPrice, maxPrice]);


  return (
    <form {...props}>
      <label>
        Name:
        <Input
          placeholder="Potato"
          value={name}
          onChange={async e => setName(e.target.value)}
        />
      </label>

      <label>
        Country:
        <Input
          placeholder="Peru"
          value={country}
          onChange={async e => setCountry(e.target.value)}
        />
      </label>

      <label>
        Category:
        <Input
          placeholder="Vegetables"
          value={category}
          onChange={async e => setCategory(e.target.value)}
        />
      </label>

      <label>
        Price:
        <div className="flex items-center gap-2">
          <Input
            max={100}
            placeholder="0"
            type="number"
            value={minPrice}
            onChange={async e => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <Input
            placeholder="10000"
            type="number"
            value={maxPrice}
            onChange={async e => setMaxPrice(e.target.value)}
          />
        </div>
      </label>
    </form>
  );
}
