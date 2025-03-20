import { Link } from "@inertiajs/react";
import { forwardRef } from "react";
import { useResource } from "../../../providers/resource.jsx";
import { useRecord } from "../../../providers/record.jsx";
import { Button, ButtonProps } from "../../ui/button.jsx";

export const DetailButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { resource } = useResource();
    const { record } = useRecord();

    const url = `/admin/resources/${resource.name}/${record[resource.idKey]}`;

    return (
      <Button asChild {...props} ref={ref}>
        <Link href={url}>{children ?? "View"}</Link>
      </Button>
    );
  },
);
