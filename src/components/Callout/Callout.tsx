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

const defaultIconForColor: Partial<Record<Color, React.FC<{ size: number }>>> = {
  gray: Info,
  blue: Info,
  purple: Info,
  sky: Info,
  jade: CheckCircle,
  amber: AlertTriangle,
  red: XCircle,
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
  const iconSize = isVertical ? 24 : 18;
  const DefaultIcon = defaultIconForColor[finalColor] || Info;
  const resolvedIcon = icon === null ? null : icon ?? <DefaultIcon size={iconSize} />;

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
        {message && <div className={s.Message}>{message}</div>}
        {children}
        {actions && <div className={s.Actions}>{actions}</div>}
      </div>

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
