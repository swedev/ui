import React from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import type { ButtonProps as RadixButtonProps } from "@radix-ui/themes";
import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type BaseButtonProps = Omit<RadixButtonProps, "color"> & {
  icon?: LucideIcon;
  loading?: boolean;
};

export type ButtonProps = BaseButtonProps & (SemanticProps | ColorProps);

export const Button: React.FC<ButtonProps> = ({
  semantic,
  color,
  icon: Icon,
  loading = false,
  disabled,
  children,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return (
    <RadixButton
      color={finalColor}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
    </RadixButton>
  );
};
