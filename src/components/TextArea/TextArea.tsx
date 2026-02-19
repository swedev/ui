import React from "react";
import { TextArea as RadixTextArea } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixTextAreaProps = ComponentProps<typeof RadixTextArea>;

type BaseTextAreaProps = Omit<RadixTextAreaProps, "color">;

export type TextAreaProps = BaseTextAreaProps & (SemanticProps | ColorProps);

export const TextArea: React.FC<TextAreaProps> = ({
  semantic,
  color,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return <RadixTextArea color={finalColor} {...rest} />;
};
