import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.js";
import { useState } from "react";
import { Button, ButtonProps } from "../../ui/button.js";
import { useResourceDelete } from "../../../hooks/resources.js";
import { useRecord } from "../../../providers/record.js";
import { useResource } from "../../../providers/resource.js";

export const DeleteButton = ({ children, ...props }: ButtonProps) => {
  const [open, setOpen] = useState(false);
  const { record } = useRecord();
  const { resource } = useResource();
  const { mutate } = useResourceDelete();

  async function handleDelete() {
    setOpen(false);
    await mutate({ id: record[resource.idKey] });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...props}>{children ?? "Delete"}</Button>
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
};
