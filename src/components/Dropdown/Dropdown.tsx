import React from "react";
import { DropdownMenu } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, RadixColor, SemanticProps } from "../../theme/types";

type TriggerProps = ComponentProps<typeof DropdownMenu.Trigger> & {
  children: React.ReactNode;
};

const Trigger: React.FC<TriggerProps> = ({ children, ...rest }) => (
  <DropdownMenu.Trigger {...rest}>{children}</DropdownMenu.Trigger>
);

type BaseItemProps = Omit<
  ComponentProps<typeof DropdownMenu.Item>,
  "color"
> & {
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
};
