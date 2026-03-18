import React, { useEffect, useRef, useState } from "react";
import { TextArea as RadixTextArea } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixTextAreaProps = React.ComponentProps<typeof RadixTextArea>;
type BaseRootProps = Omit<RadixTextAreaProps, "color" | "value" | "onChange"> & {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export type TextAreaRootProps = BaseRootProps & (SemanticProps | ColorProps);

/**
 * TextArea wrapper that prevents cursor jumping with controlled values.
 * Uses internal state and syncs with external value prop.
 */
const Root = React.forwardRef<HTMLTextAreaElement, TextAreaRootProps>(({
  semantic,
  color,
  value: externalValue = "",
  onChange,
  className,
  ...props
}, forwardedRef) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(externalValue);
  const isUserInput = useRef(false);

  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  useEffect(() => {
    if (!isUserInput.current && externalValue !== internalValue) {
      setInternalValue(externalValue);
    }
    isUserInput.current = false;
  }, [externalValue]);

  const setRefs = (el: HTMLTextAreaElement | null) => {
    (internalRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    if (typeof forwardedRef === "function") {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    isUserInput.current = true;
    setInternalValue(event.target.value);
    onChange?.(event);
  };

  return (
    <RadixTextArea
      ref={setRefs}
      color={color}
      value={internalValue}
      onChange={handleChange}
      className={className}
      {...props}
    />
  );
});
Root.displayName = "TextArea.Root";

export const TextArea = {
  Root,
};
