import { Input } from '@/components/ui/input';


export default function ProductFilter() {
  return (
    <aside>
      <label>
        Name:

        <Input
          required
          placeholder="Quantity"
          type="number"
        />
      </label>
    </aside>
  );
}
