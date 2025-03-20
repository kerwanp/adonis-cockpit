import { Link } from "@inertiajs/react";
import { forwardRef } from "react";
import { useResource } from "../../../providers/resource.jsx";
import { Button, ButtonProps } from "../../ui/button.jsx";
import { useRecord } from "../../../providers/record.jsx";

export const EditButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { resource } = useResource();
    const { record } = useRecord();

    // TODO: Use url builder
    const url = `/admin/resources/${resource.name}/${record[resource.idKey]}/edit`;

    return (
      <Button asChild {...props} ref={ref}>
        <Link href={url}>{children ?? "Edit"}</Link>
      </Button>
    );
  },
);
