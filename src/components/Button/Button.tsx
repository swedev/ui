import type { ReactNode } from "react";
import React from "react";
import type { ButtonProps as RadixButtonProps } from "@radix-ui/themes";
import { Button as RadixButton, Spinner } from "@radix-ui/themes";
import type { LucideIcon } from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import st from "./Button.module.css";

export type BaseButtonProps = Omit<RadixButtonProps, "onClick" | "color"> & {
  text?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  icon?: ReactNode | LucideIcon;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  className?: string;
};

export type ButtonProps = BaseButtonProps & (SemanticProps | ColorProps);

export const Button: React.FC<ButtonProps> = ({
  semantic,
  color,
  text,
  href,
  children,
  onClick,
  className,
  icon,
  iconPosition = "left",
  loading,
  ...restProps
}) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  const renderIcon = () => {
    if (!icon) return null;

    // If icon is a Lucide component (forwardRef object or function), render it
    // Otherwise treat it as a ReactNode
    const isComponent = typeof icon === "function" || (typeof icon === "object" && icon !== null && "$$typeof" in icon && "render" in icon);
    const iconElement = isComponent
      ? React.createElement(icon as LucideIcon, { size: 16 })
      : icon;

    if (loading) {
      return (
        <Spinner key="spinner" loading>
          {iconElement}
        </Spinner>
      );
    }

    return <span key="icon">{iconElement}</span>;
  };

  const renderContent = () => {
    const contentElements: React.ReactNode[] = [];

    if (icon && iconPosition === "left") {
      if (text) {
        contentElements.push(<span key="icon-left">{renderIcon()}</span>);
      } else {
        contentElements.push(renderIcon());
      }
    }

    if (children) {
      contentElements.push(children);
    }

    if (text) {
      contentElements.push(<span key="text">{text}</span>);
    }

    if (icon && iconPosition === "right") {
      contentElements.push(<span key="icon-right">{renderIcon()}</span>);
    }

    return contentElements;
  };

  if (href) {
    return (
      <RadixButton asChild color={color} {...restProps}>
        <a href={href} className={cn(st.Button, className)} onClick={onClick}>
          {renderContent()}
        </a>
      </RadixButton>
    );
  }

  return (
    <RadixButton asChild color={color} {...restProps}>
      <button className={cn(st.Button, className)} onClick={onClick}>
        {renderContent()}
      </button>
    </RadixButton>
  );
};
