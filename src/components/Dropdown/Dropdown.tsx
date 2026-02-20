import React from "react";
import { DropdownMenu } from "@radix-ui/themes";
import type { LucideIcon } from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, RadixColor, SemanticProps } from "../../theme/types";
import s from "./Dropdown.module.css";

// --- Trigger with semantic ---

type TriggerProps = React.ComponentProps<typeof DropdownMenu.Trigger> & {
  children: React.ReactNode;
};

const Trigger: React.FC<TriggerProps> = ({ children, ...rest }) => (
  <DropdownMenu.Trigger {...rest}>{children}</DropdownMenu.Trigger>
);

// --- Item with semantic + icon ---

type BaseItemProps = Omit<React.ComponentProps<typeof DropdownMenu.Item>, "color"> & {
  icon?: LucideIcon;
};

type ItemProps = BaseItemProps & (SemanticProps | ColorProps);

const Item: React.FC<ItemProps> = ({
  semantic,
  color,
  icon: Icon,
  children,
  ...rest
}) => {
  let finalColor: RadixColor | undefined = color;
  if (semantic) {
    finalColor = getRadixColorForSemantic(semantic);
  }

  return (
    <DropdownMenu.Item color={finalColor} {...rest}>
      {Icon && <Icon size={14} />}
      {children}
    </DropdownMenu.Item>
  );
};

// --- ActionDropdown (items-based, from Wingframe) ---

export interface ActionDropdownItem {
  key: string;
  text: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface ActionDropdownProps {
  items: ActionDropdownItem[];
  onSelect?: (key: string, item: ActionDropdownItem) => void;
  contentProps?: React.ComponentProps<typeof DropdownMenu.Content>;
  children: React.ReactElement;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  items,
  onSelect,
  contentProps,
  children,
}) => {
  const {
    children: contentChildren,
    variant = "soft",
    ...restContentProps
  } = contentProps || {};

  if (!React.isValidElement(children)) {
    return null;
  }

  return (
    <DropdownMenu.Root modal={false}>
      {/* @ts-ignore - asChild works at runtime but missing from Radix types */}
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content variant={variant} {...restContentProps}>
        {items.map((item) => {
          const { key, text, icon: Icon, disabled } = item;

          return (
            <DropdownMenu.Item
              key={key}
              disabled={disabled}
              onSelect={(event) => {
                if (disabled) {
                  event.preventDefault();
                  return;
                }
                onSelect?.(key, item);
              }}
              className={s.ActionItem}
            >
              {Icon && <Icon size={14} />}
              {text && <span>{text}</span>}
            </DropdownMenu.Item>
          );
        })}
        {contentChildren}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

// --- Export compound component ---

export const Dropdown = {
  Root: DropdownMenu.Root,
  Trigger,
  Content: DropdownMenu.Content,
  Item,
  Separator: DropdownMenu.Separator,
  Label: DropdownMenu.Label,
  Group: DropdownMenu.Group,
  Sub: DropdownMenu.Sub,
  SubTrigger: DropdownMenu.SubTrigger,
  SubContent: DropdownMenu.SubContent,
  ActionDropdown,
};
