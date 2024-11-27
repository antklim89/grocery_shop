'use client';
import { Input } from '@/components/ui/input';
import { useSearchParamsState } from '@/hooks/use-searchparams-state';


export default function ProductFilter() {
  const [name, setName] = useSearchParamsState('name');
  const [country, setCountry] = useSearchParamsState('country');
  const [category, setCategory] = useSearchParamsState('category');

  return (
    <aside>
      <label>
        Name:
        <Input
          required
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label>
        Country:
        <Input
          required
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
      </label>

      <label>
        Category:
        <Input
          required
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </label>
    </aside>
  );
}
