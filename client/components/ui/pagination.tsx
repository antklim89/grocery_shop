import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { type ComponentProps, forwardRef } from 'react';


function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      role="navigation"
      {...props}
    />
  );
}
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<
  HTMLUListElement,
  ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    className={cn('flex flex-row items-center gap-1', className)}
    ref={ref}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<
  HTMLLIElement,
  ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li className={cn('', className)} ref={ref} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
}
& Pick<ButtonProps, 'size'>
& ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  disabled,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled || isActive}
      className={cn(
        buttonVariants({
          variant: 'outline',
          size,
        }),
        'border border-gray-800',
        { 'pointer-events-none border-gray-200 text-gray-300': disabled },
        { 'pointer-events-none border-green-800 text-green-800': isActive },
        className,
      )}
      tabIndex={(disabled || isActive) ? -1 : 0}
      {...props}
    />
  );
}
PaginationLink.displayName = 'PaginationLink';

function PaginationPrevious({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1 pl-2.5', className)}
      size="default"
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
}
PaginationPrevious.displayName = 'PaginationPrevious';

function PaginationNext({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 pr-2.5', className)}
      size="default"
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}
PaginationNext.displayName = 'PaginationNext';

function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
