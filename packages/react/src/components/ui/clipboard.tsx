import { ComponentProps } from "react";
import { CopyToClipboard as CopyToClipboardBase } from "react-copy-to-clipboard";
import { toast } from "sonner";

export const CopyToClipboard = ({
  ...props
}: ComponentProps<typeof CopyToClipboardBase>) => {
  return (
    <CopyToClipboardBase
      onCopy={() => {
        toast.success("Copied to Clipboard");
      }}
      {...props}
    />
  );
};
