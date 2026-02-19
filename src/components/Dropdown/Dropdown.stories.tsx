import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, Edit, Trash2, Share, Download } from "lucide-react";
import { Button } from "../Button";
import { Dropdown } from "./Dropdown";

const meta: Meta = {
  title: "Components/Dropdown",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button semantic="action" variant="soft">
          Actions
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item icon={Edit}>Edit</Dropdown.Item>
        <Dropdown.Item icon={Copy}>Duplicate</Dropdown.Item>
        <Dropdown.Item icon={Share}>Share</Dropdown.Item>
        <Dropdown.Item icon={Download}>Export</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item icon={Trash2} semantic="destructive">
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button semantic="neutral" variant="outline">
          Options
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Label>Document</Dropdown.Label>
        <Dropdown.Item icon={Edit}>Edit</Dropdown.Item>
        <Dropdown.Item icon={Copy}>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Label>Danger zone</Dropdown.Label>
        <Dropdown.Item icon={Trash2} semantic="destructive">
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};
