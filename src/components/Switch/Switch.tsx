import React from "react";
import { Switch as RadixSwitch, Text, Flex } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixSwitchProps = ComponentProps<typeof RadixSwitch>;

type BaseSwitchProps = Omit<RadixSwitchProps, "color"> & {
  label?: string;
};

export type SwitchProps = BaseSwitchProps & (SemanticProps | ColorProps);

export const Switch: React.FC<SwitchProps> = ({
  semantic,
  color,
  label,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  const switchEl = <RadixSwitch color={finalColor} {...rest} />;

  if (!label) return switchEl;

  return (
    <Text as="label" size="2">
      <Flex gap="2" align="center">
        {switchEl}
        {label}
      </Flex>
    </Text>
  );
};
