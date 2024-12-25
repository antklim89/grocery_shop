'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useLogoutQuery, useUserQuery } from '@/hooks/use-auth';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';


export default function HeaderAuthMenu() {
  const { data: user, isLoading } = useUserQuery();
  const { trigger: logout } = useLogoutQuery();

  if (isLoading) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  if (user != null) {
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
            <Button className="w-full" variant="ghost" onClick={async () => logout()}>Log-out</Button>
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
