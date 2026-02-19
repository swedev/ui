import React, { useState } from "react";
import { Callout as RadixCallout } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import { getDefaultIconForSemantic } from "../../theme/icons";
import type { ColorProps, RadixColor, SemanticProps } from "../../theme/types";

type RadixCalloutRootProps = ComponentProps<typeof RadixCallout.Root>;

type BaseCalloutProps = Omit<RadixCalloutRootProps, "color"> & {
  icon?: LucideIcon | null;
  title?: React.ReactNode;
  message?: React.ReactNode;
  layout?: "horizontal" | "vertical";
  dismissible?: boolean;
  onDismiss?: () => void;
};

export type CalloutProps = BaseCalloutProps & (SemanticProps | ColorProps);

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
  ...rest
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  let finalColor: RadixColor = color ?? "gray";
  if (semantic) {
    finalColor = getRadixColorForSemantic(semantic);
  }

  const DefaultIcon = semantic ? getDefaultIconForSemantic(semantic) : null;
  const ResolvedIcon = icon === null ? null : icon ?? DefaultIcon;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <RadixCallout.Root
      variant={variant}
      color={finalColor}
      className={className}
      {...rest}
    >
      {ResolvedIcon && (
        <RadixCallout.Icon>
          <ResolvedIcon size={layout === "vertical" ? 24 : 18} />
        </RadixCallout.Icon>
      )}

      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: 600 }}>{title}</div>}
        {(children || message) && <div>{children || message}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleDismiss}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            opacity: 0.6,
          }}
        >
          <X size={16} />
        </button>
      )}
    </RadixCallout.Root>
  );
};
