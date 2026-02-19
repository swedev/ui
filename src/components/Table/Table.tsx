import React, { forwardRef } from "react";
import { Table as RadixTable } from "@radix-ui/themes";
import type { ComponentProps } from "react";

type RadixTableRootProps = ComponentProps<typeof RadixTable.Root>;

export interface TableRootProps extends RadixTableRootProps {
  striped?: boolean;
  hoverable?: boolean;
}

const Root = forwardRef<HTMLDivElement, TableRootProps>(
  ({ striped, hoverable, className, children, style, ...rest }, ref) => {
    return (
      <RadixTable.Root
        ref={ref}
        className={className}
        style={{
          ...style,
          ...(striped && {
            "--table-row-background-striped": "var(--gray-a2)",
          } as React.CSSProperties),
        }}
        {...rest}
      >
        {children}
      </RadixTable.Root>
    );
  },
);
Root.displayName = "Table.Root";

export const Table = {
  Root,
  Header: RadixTable.Header,
  Body: RadixTable.Body,
  Row: RadixTable.Row,
  Cell: RadixTable.Cell,
  ColumnHeaderCell: RadixTable.ColumnHeaderCell,
  RowHeaderCell: RadixTable.RowHeaderCell,
};
