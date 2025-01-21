'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';


export default function ProductSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(formData: FormData) {
    const searchInput = formData.get('searchInput')?.toString();
    if (searchInput == null || searchInput.toString().length === 0) {
      router.push('?');
    } else {
      router.push(`/search/?s=${searchInput}`);
    }
  }

  return (
    <form action={handleSubmit} className="relative flex items-center gap-2">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        defaultValue={searchParams.get('s')?.toString() ?? ''}
        name="searchInput"
        placeholder="Search products..."
        type="search"
      />
    </form>
  );
}
