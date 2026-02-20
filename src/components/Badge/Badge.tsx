import React from "react";
import { Badge as RadixBadge } from "@radix-ui/themes";
import type { BadgeProps as RadixBadgeProps } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import s from "./Badge.module.css";

type BaseBadgeProps = Omit<RadixBadgeProps, "color"> & {
  children?: React.ReactNode;
};

export type BadgeProps = BaseBadgeProps & (SemanticProps | ColorProps);

export const Badge: React.FC<BadgeProps> = ({
  semantic,
  color,
  className,
  children,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return (
    <RadixBadge color={finalColor} className={cn(s.Badge, className)} {...rest}>
      {children}
    </RadixBadge>
  );
};
