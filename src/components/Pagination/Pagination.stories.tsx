import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaginationNav } from "./Pagination";

const meta: Meta<typeof PaginationNav> = {
  title: "Components/PaginationNav",
  component: PaginationNav,
};

export default meta;
type Story = StoryObj<typeof PaginationNav>;

const PaginationDemo = ({
  totalPages = 10,
  initialPage = 1,
  ...rest
}: {
  totalPages?: number;
  initialPage?: number;
} & Partial<React.ComponentProps<typeof PaginationNav>>) => {
  const [page, setPage] = useState(initialPage);
  return (
    <PaginationNav
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

export const WithoutNavButtons: Story = {
  render: () => <PaginationDemo showNavButtons={false} />,
};

export const MoreVisiblePages: Story = {
  render: () => <PaginationDemo totalPages={20} visiblePageCount={5} initialPage={10} />,
};
