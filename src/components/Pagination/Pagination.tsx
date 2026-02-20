import React from "react";
import { ArrowLeft, ArrowLeftToLine, ArrowRight } from "lucide-react";
import type { ButtonProps } from "../Button/Button";
import { Button } from "../Button/Button";
import { cn } from "../../utils";
import s from "./Pagination.module.css";

export interface PaginationNavProps {
  page: number;
  totalPages: number;
  className?: string;
  /** Number of page buttons to show in the middle (default 3) */
  visiblePageCount?: number;
  /** Show first/prev/next nav buttons (default true) */
  showNavButtons?: boolean;
  /** Show nav buttons when disabled, or hide them (default true) */
  showDisabledButtons?: boolean;
  /** Style props for nav buttons (first, prev, next) */
  navButtonProps?: Partial<ButtonProps>;
  /** Style props for page number buttons */
  pageButtonProps?: Partial<ButtonProps>;
  /** Style props for the selected page button */
  selectedPageButtonProps?: Partial<ButtonProps>;
  onPageChange?: (page: number) => void;
}

/**
 * Generate page numbers to display.
 * Shows ellipsis if gap, pages around current, ellipsis if gap, then last page.
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number,
  visibleCount: number,
): (number | "...")[] {
  const delta = Math.floor(visibleCount / 2);
  const pages: (number | "...")[] = [];

  let rangeStart = currentPage - delta;
  let rangeEnd = currentPage + delta;

  if (rangeStart < 1) {
    rangeEnd = Math.min(totalPages, rangeEnd + (1 - rangeStart));
    rangeStart = 1;
  }
  if (rangeEnd > totalPages) {
    rangeStart = Math.max(1, rangeStart - (rangeEnd - totalPages));
    rangeEnd = totalPages;
  }

  if (rangeStart > 1) {
    pages.push("...");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages - 1) {
    pages.push("...");
    pages.push(totalPages);
  } else if (rangeEnd === totalPages - 1) {
    pages.push(totalPages);
  }

  return pages;
}

export const PaginationNav: React.FC<PaginationNavProps> = ({
  page,
  totalPages,
  className,
  visiblePageCount = 3,
  showNavButtons = true,
  showDisabledButtons = true,
  navButtonProps,
  pageButtonProps,
  selectedPageButtonProps,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange?.(newPage);
    }
  };

  const pageNumbers = getPageNumbers(page, totalPages, visiblePageCount);
  const atFirst = page <= 1;
  const atLast = page >= totalPages;
  const showFirstNav = showNavButtons && (showDisabledButtons || !atFirst);
  const showLastNav = showNavButtons && (showDisabledButtons || !atLast);

  return (
    <div className={cn(s.Pagination, className)}>
      {showFirstNav && (
        <Button
          variant="soft"
          {...navButtonProps}
          icon={ArrowLeftToLine}
          disabled={atFirst}
          onClick={() => handlePageClick(1)}
          className={s.NavButton}
        />
      )}
      {showFirstNav && (
        <Button
          variant="soft"
          {...navButtonProps}
          icon={ArrowLeft}
          disabled={atFirst}
          onClick={() => handlePageClick(page - 1)}
          className={s.NavButtonWide}
        />
      )}

      {pageNumbers.map((pageNum, index) =>
        pageNum === "..."
          ? (
              <span key={`ellipsis-${index}`} className={s.Ellipsis}>
                ...
              </span>
            )
          : (
              <Button
                key={pageNum}
                variant={pageNum === page ? "solid" : "soft"}
                {...(pageNum === page ? selectedPageButtonProps : pageButtonProps)}
                text={String(pageNum)}
                onClick={() => handlePageClick(pageNum as number)}
                className={s.PageButton}
              />
            ),
      )}

      {showLastNav && (
        <Button
          variant="soft"
          {...navButtonProps}
          icon={ArrowRight}
          disabled={atLast}
          onClick={() => handlePageClick(page + 1)}
          className={s.NavButtonWide}
        />
      )}
    </div>
  );
};
