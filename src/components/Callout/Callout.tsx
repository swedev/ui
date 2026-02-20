import type { ReactNode } from "react";
import React, { useState } from "react";
import { Callout as RadixCallout } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { Color, ColorProps, RadixColor, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import s from "./Callout.module.css";

type RadixCalloutRootProps = ComponentProps<typeof RadixCallout.Root>;

type BaseCalloutProps = Omit<RadixCalloutRootProps, "color"> & {
  icon?: ReactNode;
  title?: ReactNode;
  message?: ReactNode;
  layout?: "horizontal" | "vertical";
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: ReactNode;
};

export type CalloutProps = BaseCalloutProps & (SemanticProps | ColorProps);

const defaultIcons: Partial<Record<Color, ReactNode>> = {
  gray: <Info size={18} />,
  blue: <Info size={18} />,
  purple: <Info size={18} />,
  sky: <Info size={18} />,
  jade: <CheckCircle size={18} />,
  amber: <AlertTriangle size={18} />,
  red: <XCircle size={18} />,
};

const defaultIconsVertical: Partial<Record<Color, ReactNode>> = {
  gray: <Info size={24} />,
  blue: <Info size={24} />,
  purple: <Info size={24} />,
  sky: <Info size={24} />,
  jade: <CheckCircle size={24} />,
  amber: <AlertTriangle size={24} />,
  red: <XCircle size={24} />,
};

export const Callout: React.FC<CalloutProps> = ({
  semantic,
  color,
  variant = "surface",
  layout = "horizontal",
  className,
  icon,
  title,
  message,
  children,
  dismissible = false,
  onDismiss,
  actions,
  ...rest
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  let finalColor: RadixColor = color || getRadixColorForSemantic("neutral");
  if (semantic) {
    finalColor = getRadixColorForSemantic(semantic);
  }

  const isVertical = layout === "vertical";
  const iconMap = isVertical ? defaultIconsVertical : defaultIcons;
  const defaultIcon = iconMap[finalColor] || iconMap.blue;
  const resolvedIcon = icon === null ? null : icon ?? defaultIcon;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <RadixCallout.Root
      variant={variant}
      color={finalColor}
      className={cn(s.Callout, isVertical && s.vertical, className)}
      {...rest}
    >
      {resolvedIcon !== null && (
        <RadixCallout.Icon className={s.Icon}>
          {resolvedIcon}
        </RadixCallout.Icon>
      )}

      <div className={cn(s.Content, isVertical && s.vertical)}>
        {title && <h5 className={s.Title}>{title}</h5>}
        {(children || message) && <div>{children || message}</div>}
      </div>

      {actions && <div>{actions}</div>}

      {dismissible && (
        <div
          role="button"
          aria-label="Close"
          onClick={handleDismiss}
          className={s.Dismiss}
        >
          <XCircle size={18} />
        </div>
      )}
    </RadixCallout.Root>
  );
};
