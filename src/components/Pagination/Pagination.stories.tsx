import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationDemo = ({
  totalPages = 10,
  initialPage = 1,
  ...rest
}: {
  totalPages?: number;
  initialPage?: number;
  size?: "1" | "2" | "3";
  showPageNumbers?: boolean;
}) => {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      {...rest}
    />
  );
};

export const Default: Story = {
  render: () => <PaginationDemo />,
};

export const FewPages: Story = {
  render: () => <PaginationDemo totalPages={3} />,
};

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={50} initialPage={25} />,
};

export const WithoutPageNumbers: Story = {
  render: () => <PaginationDemo showPageNumbers={false} />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PaginationDemo size="1" totalPages={5} />
      <PaginationDemo size="2" totalPages={5} />
      <PaginationDemo size="3" totalPages={5} />
    </div>
  ),
};
