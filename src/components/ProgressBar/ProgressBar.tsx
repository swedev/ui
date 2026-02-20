import React from "react";
import { Progress } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import s from "./ProgressBar.module.css";

type BaseProgressBarProps = {
  value: number;
  max?: number;
  showText?: boolean;
  text?: string;
  className?: string;
  size?: "1" | "2" | "3";
  variant?: "classic" | "surface" | "soft";
};

export type ProgressBarProps = BaseProgressBarProps & (SemanticProps | ColorProps);

export const ProgressBar: React.FC<ProgressBarProps> = ({
  semantic,
  color,
  value,
  max = 100,
  text,
  showText = false,
  className,
  size = "2",
  variant = "classic",
}) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  const displayText = text || `${value}%`;

  return (
    <div className={cn(s.ProgressBar, className)}>
      <Progress
        value={value}
        max={max}
        color={color}
        size={size}
        variant={variant}
      />

      {showText && (
        <div className={s.Overlay}>
          <span className={s.Text}>{displayText}</span>
        </div>
      )}
    </div>
  );
};
