import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.jsx";
import { forwardRef, useState } from "react";
import { useResource } from "../../../providers/resource.jsx";
import { useRecord } from "../../../providers/record.jsx";
import { Button, ButtonProps } from "../../ui/button.jsx";

export const DeleteButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { resource } = useResource();
    const { record } = useRecord();

    const [open, setOpen] = useState(false);

    async function handleDelete() {
      setOpen(false);
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button {...props} ref={ref}>
            {children ?? "Delete"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              record and remove it from the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDelete()}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
