import type { ReactNode } from "react";
import React from "react";
import { Dialog } from "@radix-ui/themes";
import { X } from "lucide-react";
import { cn } from "../../utils";
import s from "./Modal.module.css";

// --- Root ---

type RootProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: "1" | "2" | "3" | "4";
  className?: string;
  children: ReactNode;
};

const Root: React.FC<RootProps> = ({ open, onOpenChange, size, className, children }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Content
      size={size}
      className={cn(s.Content, className)}
    >
      {children}
    </Dialog.Content>
  </Dialog.Root>
);

// --- Header ---

type HeaderProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  icon,
  closeButton,
  onClose,
  className,
}) => (
  <div className={cn(s.Header, className)}>
    {(title || icon) && (
      <Dialog.Title mb="0" className={s.Title}>
        {icon && <span className={s.HeaderIcon}>{icon}</span>}
        {title && <span>{title}</span>}
      </Dialog.Title>
    )}
    {description && (
      <Dialog.Description mb="0" className={s.Description}>
        {description}
      </Dialog.Description>
    )}
    {closeButton && (
      <Dialog.Close>
        <button
          type="button"
          className={s.CloseButton}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </Dialog.Close>
    )}
  </div>
);

// --- Body ---

type BodyProps = {
  children: ReactNode;
  className?: string;
};

const Body: React.FC<BodyProps> = ({ children, className }) => (
  <div className={cn(s.Body, className)}>{children}</div>
);

// --- Footer ---

type FooterProps = {
  children: ReactNode;
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ children, className }) => (
  <div className={cn(s.Footer, className)}>{children}</div>
);

// --- Export compound component ---

export const Modal = { Root, Header, Body, Footer };
