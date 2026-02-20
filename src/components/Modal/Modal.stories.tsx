import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AlertTriangle, Info, Trash2 } from "lucide-react";
import { Button } from "../Button";
import { Modal } from "./Modal";
import { ConfirmModal } from "./ConfirmModal";
import { DeleteModal } from "./DeleteModal";
import { AlertModal } from "./AlertModal";

const meta: Meta = {
  title: "Components/Modal",
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="action" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Header
            title="Basic Modal"
            description="This is a basic modal with header, body, and footer."
            closeButton
          />
          <Modal.Body>
            <p>Modal content goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="soft" semantic="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button semantic="action" onClick={() => setOpen(false)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Root>
      </>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="action" onClick={() => setOpen(true)}>
          Open with Icon
        </Button>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Header
            title="Information"
            description="This modal has an icon in the header."
            icon={<Info size={20} />}
            closeButton
          />
          <Modal.Body>
            <p>Some informational content here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button semantic="action" onClick={() => setOpen(false)}>
              Got it
            </Button>
          </Modal.Footer>
        </Modal.Root>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<"1" | "2" | "3" | "4" | null>(null);
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {(["1", "2", "3", "4"] as const).map((size) => (
          <div key={size}>
            <Button semantic="neutral" variant="soft" onClick={() => setOpenSize(size)}>
              Size {size}
            </Button>
            <Modal.Root open={openSize === size} onOpenChange={(o) => !o && setOpenSize(null)} size={size}>
              <Modal.Header title={`Size ${size}`} closeButton />
              <Modal.Body>
                <p>This modal uses size="{size}".</p>
              </Modal.Body>
              <Modal.Footer>
                <Button semantic="action" onClick={() => setOpenSize(null)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Root>
          </div>
        ))}
      </div>
    );
  },
};

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="action" onClick={() => setOpen(true)}>
          Confirm Action
        </Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Confirm Changes"
          description="Are you sure you want to save these changes?"
          onConfirm={() => console.log("Confirmed")}
          onCancel={() => console.log("Cancelled")}
        />
      </>
    );
  },
};

export const ConfirmWithBody: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="action" onClick={() => setOpen(true)}>
          Publish Article
        </Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Publish Article"
          description="This action will make the article visible to all users."
          confirmText="Publish"
          onConfirm={() => console.log("Published")}
        >
          <p>The article will be published immediately and cannot be unpublished without admin access.</p>
        </ConfirmModal>
      </>
    );
  },
};

export const Delete: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="destructive" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <DeleteModal
          open={open}
          onOpenChange={setOpen}
          title="Delete Item"
          description="This action cannot be undone."
          onConfirm={() => console.log("Deleted")}
        >
          <p>Are you sure you want to permanently delete this item?</p>
        </DeleteModal>
      </>
    );
  },
};

export const Alert: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="neutral" variant="soft" onClick={() => setOpen(true)}>
          Show Alert
        </Button>
        <AlertModal
          open={open}
          onOpenChange={setOpen}
          title="Session Expired"
          onOk={() => console.log("OK")}
        >
          <p>Your session has expired. Please log in again.</p>
        </AlertModal>
      </>
    );
  },
};

export const ConfirmWithWarningIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button semantic="warning" onClick={() => setOpen(true)}>
          Dangerous Operation
        </Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Warning"
          description="This operation may cause data loss."
          icon={<AlertTriangle size={20} />}
          confirmText="Proceed"
          confirmSemantic="warning"
          onConfirm={() => console.log("Proceeded")}
        />
      </>
    );
  },
};
