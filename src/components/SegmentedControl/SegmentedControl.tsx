import React from "react";
import { SegmentedControl as RadixSegmentedControl } from "@radix-ui/themes";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils";
import s from "./SegmentedControl.module.css";

export interface SegmentedControlItem {
  /** Value emitted by `onValueChange` and matched against `value`. */
  value: string;
  label: React.ReactNode;
  /** Leading icon — a component reference, per the library icon convention. */
  icon?: LucideIcon;
  /** Trailing count chip (e.g. a filter tab "Aktiva · 10"). */
  count?: number;
}

type RadixRootProps = React.ComponentProps<typeof RadixSegmentedControl.Root>;

/**
 * Single-select tab switcher wrapping Radix `SegmentedControl`.
 *
 * Radix `SegmentedControl` has no `color` prop and its active pill is neutral
 * by design (a raised panel chip) — so, like Table/Modal/Breadcrumbs, this
 * takes no `semantic`/`color`. The look themes per-deployment through the Radix
 * gray/panel vars.
 */
export type SegmentedControlProps = Omit<RadixRootProps, "children"> & {
  items: SegmentedControlItem[];
  className?: string;
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  items,
  className,
  ...rest
}) => (
  <RadixSegmentedControl.Root className={cn(s.SegmentedControl, className)} {...rest}>
    {items.map(({ value, label, icon: Icon, count }) => (
      <RadixSegmentedControl.Item key={value} value={value}>
        <span className={s.Item}>
          {Icon ? <Icon size={15} strokeWidth={2} aria-hidden /> : null}
          <span>{label}</span>
          {count !== undefined ? <span className={s.Count}>{count}</span> : null}
        </span>
      </RadixSegmentedControl.Item>
    ))}
  </RadixSegmentedControl.Root>
);
