import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils";
import s from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  href?: string;
  text: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface BreadcrumbsProps extends React.ComponentPropsWithRef<"div"> {
  items?: BreadcrumbItem[];
  onItemClick?: (e: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onItemClick,
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cn(s.Breadcrumbs, className)} {...rest}>
      <ul>
        {children}
        {items?.map(({ href, text, icon: Icon, disabled }, i) => (
          <li key={i}>
            {href && !disabled ? (
              <a href={href} onClick={onItemClick} className="flex items-center gap-1.5">
                {Icon && <Icon size={14} />}
                {text}
              </a>
            ) : (
              <span className="flex items-center gap-1.5">
                {Icon && <Icon size={14} />}
                {text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
