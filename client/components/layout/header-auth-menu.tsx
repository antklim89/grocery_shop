'use client';
import { useAuth } from '@/components/feature/auth-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { pb } from '@/lib/pocketbase/client';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';


export default function HeaderAuthMenu() {
  const isAuth = useAuth();

  const handleLogout = () => {
    pb.authStore.clear();
    document.cookie = `pb_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    location.reload();
  };

  if (isAuth) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="secondary">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button className="w-full" variant="ghost" onClick={handleLogout}>Log-out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button asChild variant="outline">
      <Link href="/auth">Log-in</Link>
    </Button>
  );
}
