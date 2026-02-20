import type { ReactNode } from "react";
import React from "react";
import { Dialog } from "@radix-ui/themes";
import { Button } from "../Button";
import type { Semantic } from "../../theme/types";
import { Modal } from "./Modal";
import s from "./Modal.module.css";

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmSemantic?: Semantic;
  size?: "1" | "2" | "3" | "4";
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  icon,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmSemantic = "action",
  size = "2",
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange} size={size} className={s.ConfirmContent}>
      <Modal.Header
        title={title}
        description={description}
        icon={icon}
        closeButton
        onClose={handleCancel}
        className={s.ConfirmHeader}
      />
      {children && <Modal.Body className={s.ConfirmBody}>{children}</Modal.Body>}
      <Modal.Footer>
        <Dialog.Close>
          <Button variant="soft" semantic="neutral" onClick={handleCancel} tabIndex={-1}>
            {cancelText}
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button semantic={confirmSemantic} onClick={onConfirm}>
            {confirmText}
          </Button>
        </Dialog.Close>
      </Modal.Footer>
    </Modal.Root>
  );
};
