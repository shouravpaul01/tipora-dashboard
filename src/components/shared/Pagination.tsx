"use client";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      // If total pages are 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);

    } else if (currentPage <= 3) {
      // If user is near the beginning
      pages.push(1, 2, 3, 4, "ellipsis", totalPages);

    } else if (currentPage >= totalPages - 2) {
      // If user is near the end
      pages.push(
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );

    } else {
      // If user is somewhere in the middle
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "cursor-pointer hover:bg-primary/80! hover:text-white"
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                className={
                  currentPage === page
                    ? "cursor-pointer bg-primary text-white  hover:bg-primary/80! hover:text-white"
                    : "cursor-pointer hover:bg-primary/80! hover:text-white"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "cursor-pointer hover:bg-primary/80! hover:text-white"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}