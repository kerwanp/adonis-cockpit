import { Link } from "@inertiajs/react";
import { useResource } from "../../../providers/resource.js";
import { Button, ButtonProps } from "../../ui/button.js";
import { useRecord } from "../../../providers/record.js";

export const EditButton = ({ children, ...props }: ButtonProps) => {
  const { resource } = useResource();
  const { record } = useRecord();

  const url = `${resource.route}/${record[resource.idKey]}/edit`;

  return (
    <Button asChild {...props}>
      <Link href={url}>{children ?? "Edit"}</Link>
    </Button>
  );
};
