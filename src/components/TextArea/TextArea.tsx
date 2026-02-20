import React from "react";
import { TextArea as RadixTextArea } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixTextAreaProps = React.ComponentProps<typeof RadixTextArea>;
type BaseRootProps = Omit<RadixTextAreaProps, "color"> & {
  className?: string;
};

export type TextAreaRootProps = BaseRootProps & (SemanticProps | ColorProps);

const Root = React.forwardRef<HTMLTextAreaElement, TextAreaRootProps>(({
  semantic,
  color,
  className,
  ...props
}, ref) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  return (
    <RadixTextArea
      ref={ref}
      color={color}
      className={className}
      {...props}
    />
  );
});
Root.displayName = "TextArea.Root";

export const TextArea = {
  Root,
};
