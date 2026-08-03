import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
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
        <Select.Item value="ordforande">Ordförande</Select.Item>
        <Select.Item value="kassor">Kassör</Select.Item>
        <Select.Item value="sekreterare">Sekreterare</Select.Item>
        <Select.Item value="ledamot">Ledamot</Select.Item>
        <Select.Item value="suppleant">Suppleant</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
};

export const WithSemantic: Story = {
  render: () => (
    <Select.Root semantic="action">
      <Select.Trigger placeholder="Select a role..." />
      <Select.Content>
        <Select.Item value="ordforande">Ordförande</Select.Item>
        <Select.Item value="kassor">Kassör</Select.Item>
        <Select.Item value="sekreterare">Sekreterare</Select.Item>
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
          <Select.Label>Tillgångar</Select.Label>
          <Select.Item value="1910">1910 - Kassa</Select.Item>
          <Select.Item value="1920">1920 - PlusGiro</Select.Item>
          <Select.Item value="1930">1930 - Företagskonto</Select.Item>
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

/**
 * Controlled select where `""` means "nothing selected". `value=""` passes
 * straight through to Radix, so the trigger's placeholder is shown — clearing a
 * controlled select is done with `""`, never `undefined` (which would turn the
 * select uncontrolled).
 */
export const ControlledWithPlaceholder: Story = {
  render: () => {
    const ControlledDemo = () => {
      const [value, setValue] = useState("");
      return (
        <div className="flex flex-col items-start gap-2">
          <Select.Root value={value} onValueChange={setValue}>
            <Select.Trigger placeholder="Select a role..." />
            <Select.Content>
              <Select.Item value="ordforande">Ordförande</Select.Item>
              <Select.Item value="kassor">Kassör</Select.Item>
              <Select.Item value="sekreterare">Sekreterare</Select.Item>
            </Select.Content>
          </Select.Root>
          <span className="text-sm text-[var(--gray-11)]">
            Value: {value === "" ? '"" (placeholder shown)' : value}
          </span>
          <Button variant="soft" semantic="neutral" onClick={() => setValue("")}>
            Reset
          </Button>
        </div>
      );
    };
    return <ControlledDemo />;
  },
};

/**
 * An explicit "None" option is a consumer-side concern: `Select.Item value=""`
 * is invalid (Radix throws), so pick a sentinel value and map it to/from `""`
 * in **both** directions — the `value` prop and the `onValueChange` callback.
 * Mapping only one direction would make "Ingen" snap back to the placeholder as
 * soon as it is picked. The sentinel must not collide with a real domain value.
 */
export const NoneOption: Story = {
  render: () => {
    const NONE_VALUE = "none";
    const NoneOptionDemo = () => {
      const [value, setValue] = useState("");
      return (
        <div className="flex flex-col items-start gap-2">
          <Select.Root
            value={value === "" ? NONE_VALUE : value}
            onValueChange={(next) => setValue(next === NONE_VALUE ? "" : next)}
          >
            <Select.Trigger placeholder="Select a role..." />
            <Select.Content>
              <Select.Item value={NONE_VALUE}>Ingen</Select.Item>
              <Select.Separator />
              <Select.Item value="ordforande">Ordförande</Select.Item>
              <Select.Item value="kassor">Kassör</Select.Item>
              <Select.Item value="sekreterare">Sekreterare</Select.Item>
            </Select.Content>
          </Select.Root>
          <span className="text-sm text-[var(--gray-11)]">
            Domain value: {value === "" ? '"" (none)' : value}
          </span>
        </div>
      );
    };
    return <NoneOptionDemo />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
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
