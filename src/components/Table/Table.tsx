import React, { forwardRef } from "react";
import { Table as RadixTable } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { cn } from "../../utils";
import s from "./Table.module.css";

type RadixTableRootProps = ComponentProps<typeof RadixTable.Root>;

export interface TableRootProps extends RadixTableRootProps {
  striped?: boolean;
  hoverable?: boolean;
}

const Root = forwardRef<HTMLDivElement, TableRootProps>(
  ({ striped, hoverable, className, children, ...rest }, ref) => {
    return (
      <RadixTable.Root
        ref={ref}
        className={cn(s.Table, striped && s.striped, hoverable && s.hoverable, className)}
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
