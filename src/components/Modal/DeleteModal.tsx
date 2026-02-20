import React from "react";
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";
import type { ConfirmModalProps } from "./ConfirmModal";

type DeleteModalProps = Omit<ConfirmModalProps, "confirmText" | "confirmSemantic" | "icon"> &
  Partial<Pick<ConfirmModalProps, "confirmText" | "confirmSemantic" | "icon">>;

export const DeleteModal: React.FC<DeleteModalProps> = ({
  confirmText = "Delete",
  confirmSemantic = "destructive",
  icon = <Trash2 size={20} />,
  ...rest
}) => (
  <ConfirmModal
    confirmText={confirmText}
    confirmSemantic={confirmSemantic}
    icon={icon}
    {...rest}
  />
);
