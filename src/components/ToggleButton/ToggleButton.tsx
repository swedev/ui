import React from "react";
import { SegmentedControl } from "@radix-ui/themes";
import type { ComponentProps } from "react";

type RadixSegmentedControlRootProps = ComponentProps<
  typeof SegmentedControl.Root
>;

export interface ToggleOption {
  value: string;
  label: string;
}

export interface ToggleButtonProps extends RadixSegmentedControlRootProps {
  options: ToggleOption[];
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  ...rest
}) => {
  return (
    <SegmentedControl.Root {...rest}>
      {options.map((opt) => (
        <SegmentedControl.Item key={opt.value} value={opt.value}>
          {opt.label}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  );
};
