import React from "react";
import { Checkbox as RadixCheckbox, Text, Flex } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixCheckboxProps = ComponentProps<typeof RadixCheckbox>;

type BaseCheckboxProps = Omit<RadixCheckboxProps, "color"> & {
  label?: string;
};

export type CheckboxProps = BaseCheckboxProps & (SemanticProps | ColorProps);

export const Checkbox: React.FC<CheckboxProps> = ({
  semantic,
  color,
  label,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  const checkbox = <RadixCheckbox color={finalColor} {...rest} />;

  if (!label) return checkbox;

  return (
    <Text as="label" size="2">
      <Flex gap="2" align="center">
        {checkbox}
        {label}
      </Flex>
    </Text>
  );
};
