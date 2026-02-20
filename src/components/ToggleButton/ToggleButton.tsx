import React from "react";
import type { ButtonProps } from "../Button/Button";
import { Button } from "../Button/Button";
import { cn } from "../../utils";
import s from "./ToggleButton.module.css";

export type ToggleButtonProps = ButtonProps & {
  active?: boolean;
  activeProps?: Partial<ButtonProps>;
};

const defaultActiveProps: Partial<ButtonProps> = { variant: "solid" };

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  active = false,
  activeProps,
  className,
  variant = "surface",
  ...restProps
}) => {
  const mergedActiveProps = { ...defaultActiveProps, ...activeProps };

  const mergedProps = (active
    ? { variant, ...restProps, ...mergedActiveProps }
    : { variant, ...restProps }) as ButtonProps;

  const mergedClassName = cn(
    s.ToggleButton,
    className,
    active && activeProps?.className,
    active && s.active,
  ) || undefined;

  return (
    <Button
      {...mergedProps}
      className={mergedClassName}
    />
  );
};
