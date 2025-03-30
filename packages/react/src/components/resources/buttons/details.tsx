import { Link } from "@inertiajs/react";
import { useResource } from "../../../providers/resource.js";
import { useRecord } from "../../../providers/record.js";
import { Button, ButtonProps } from "../../ui/button.js";

export const DetailButton = ({ children, ...props }: ButtonProps) => {
  const { resource } = useResource();
  const { record } = useRecord();

  const url = `${resource.route}/${record[resource.idKey]}`;

  return (
    <Button asChild {...props}>
      <Link href={url}>{children ?? "View"}</Link>
    </Button>
  );
};
