import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta: Meta = {
  title: "Components/Select",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger placeholder="Select a role..." />
      <Select.Content>
        <Select.Item value="ordforande">Ordforande</Select.Item>
        <Select.Item value="kassor">Kassor</Select.Item>
        <Select.Item value="sekreterare">Sekreterare</Select.Item>
        <Select.Item value="ledamot">Ledamot</Select.Item>
        <Select.Item value="suppleant">Suppleant</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger placeholder="Select account..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Tillgangar</Select.Label>
          <Select.Item value="1910">1910 - Kassa</Select.Item>
          <Select.Item value="1920">1920 - PlusGiro</Select.Item>
          <Select.Item value="1930">1930 - Foretgskonto</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Kostnader</Select.Label>
          <Select.Item value="5010">5010 - Lokalhyra</Select.Item>
          <Select.Item value="6110">6110 - Kontorsmaterial</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Select.Root size="1">
        <Select.Trigger placeholder="Small" />
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Content>
      </Select.Root>
      <Select.Root size="2">
        <Select.Trigger placeholder="Medium" />
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Content>
      </Select.Root>
      <Select.Root size="3">
        <Select.Trigger placeholder="Large" />
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};
