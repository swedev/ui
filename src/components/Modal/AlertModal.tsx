import type { ReactNode } from "react";
import React from "react";
import { Dialog } from "@radix-ui/themes";
import { Button } from "../Button";
import { Modal } from "./Modal";

export interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: ReactNode;
  okText?: string;
  onOk?: () => void;
  size?: "1" | "2" | "3" | "4";
}

export const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
  okText = "OK",
  onOk,
  size,
}) => {
  const handleOk = () => {
    onOk?.();
    onOpenChange(false);
  };

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange} size={size}>
      <Modal.Header title={title} />
      {children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer>
        <Dialog.Close>
          <Button semantic="action" onClick={handleOk}>
            {okText}
          </Button>
        </Dialog.Close>
      </Modal.Footer>
    </Modal.Root>
  );
};
