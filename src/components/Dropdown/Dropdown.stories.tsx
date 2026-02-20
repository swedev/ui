import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, Edit, Trash2, Share, Download, MoreHorizontal } from "lucide-react";
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
        <Button semantic="action" variant="soft" text="Actions" />
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

export const ActionDropdown: Story = {
  render: () => (
    <Dropdown.ActionDropdown
      items={[
        { key: "edit", text: "Edit", icon: Edit },
        { key: "copy", text: "Duplicate", icon: Copy },
        { key: "delete", text: "Delete", icon: Trash2 },
      ]}
      onSelect={(key) => console.log("Selected:", key)}
    >
      <Button semantic="action" icon={MoreHorizontal} text="Actions" />
    </Dropdown.ActionDropdown>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button semantic="neutral" variant="outline" text="Options" />
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

export const WithSubmenu: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button semantic="neutral" text="Options" />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Sub>
          <Dropdown.SubTrigger>More</Dropdown.SubTrigger>
          <Dropdown.SubContent>
            <Dropdown.Item icon={Download}>Export</Dropdown.Item>
            <Dropdown.Item>Archive</Dropdown.Item>
          </Dropdown.SubContent>
        </Dropdown.Sub>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};
