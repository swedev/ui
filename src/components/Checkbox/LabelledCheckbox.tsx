import type { ComponentProps } from "react";
import React from "react";
import { Text } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import { cn } from "../../utils";
import s from "./LabelledCheckbox.module.css";

export type LabelledCheckboxProps = CheckboxProps & {
  label?: string;
  children?: React.ReactNode;
  labelProps?: ComponentProps<typeof Text>;
};

export const LabelledCheckbox: React.FC<LabelledCheckboxProps> = (props) => {
  const { label, children, labelProps, ...checkboxProps } = props;
  const semantic = "semantic" in props ? props.semantic : undefined;
  const color = semantic ? getRadixColorForSemantic(semantic) : undefined;

  return (
    <Text
      as="label"
      color={color}
      {...labelProps}
      className={cn(s.LabelledCheckbox, semantic && s.semantic, labelProps?.className)}
    >
      <Checkbox {...checkboxProps} />
      {label}
      {children}
    </Text>
  );
};
