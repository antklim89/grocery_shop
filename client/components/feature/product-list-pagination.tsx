'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getSearchParams } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';


interface Props {
  page: number;
  totalPages: number;
}

export function ProductListPagination({ page = 1, totalPages }: Props) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  return (
    <Pagination className="my-4 md:my-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={page <= 1}
            href={getSearchParams(searchParams, 'page', Math.max(1, page - 1))}
          />
        </PaginationItem>

        {[page - 3, page - 2, page, page + 2, page + 3]
          .filter(i => i > 0 && i <= totalPages)
          .map(i => (
            <PaginationItem key={i}>
              <PaginationLink
                href={getSearchParams(searchParams, 'page', i)}
                isActive={i === page}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            disabled={page >= totalPages}
            href={getSearchParams(searchParams, 'page', Math.min(totalPages, page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

