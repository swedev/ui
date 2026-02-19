import React from "react";
import { Badge as RadixBadge } from "@radix-ui/themes";
import type { BadgeProps as RadixBadgeProps } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type BaseBadgeProps = Omit<RadixBadgeProps, "color"> & {
  children?: React.ReactNode;
};

export type BadgeProps = BaseBadgeProps & (SemanticProps | ColorProps);

export const Badge: React.FC<BadgeProps> = ({
  semantic,
  color,
  children,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return (
    <RadixBadge color={finalColor} {...rest}>
      {children}
    </RadixBadge>
  );
};
