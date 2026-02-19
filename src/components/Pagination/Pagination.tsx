import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: "1" | "2" | "3";
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  size = "2",
  showPageNumbers = true,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | "...")[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Flex gap="1" align="center">
      <Button
        variant="soft"
        color="gray"
        size={size}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={14} />
      </Button>

      {showPageNumbers &&
        getVisiblePages().map((p, i) =>
          p === "..." ? (
            <Text key={`ellipsis-${i}`} size={size} color="gray" style={{ padding: "0 4px" }}>
              ...
            </Text>
          ) : (
            <Button
              key={p}
              variant={p === page ? "solid" : "soft"}
              color={p === page ? "blue" : "gray"}
              size={size}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          ),
        )}

      <Button
        variant="soft"
        color="gray"
        size={size}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={14} />
      </Button>
    </Flex>
  );
};
