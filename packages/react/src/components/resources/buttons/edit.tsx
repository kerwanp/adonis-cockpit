import { Link } from "@inertiajs/react";
import { useResource } from "../../../providers/resource.jsx";
import { Button, ButtonProps } from "../../ui/button.jsx";
import { useRecord } from "../../../providers/record.jsx";

export const EditButton = (
  {
    ref,
    children,
    ...props
  }: ButtonProps & {
    ref: React.RefObject<HTMLButtonElement>;
  }
) => {
  const { resource } = useResource();
  const { record } = useRecord();

  // TODO: Use url builder
  const url = `/admin/resources/${resource.name}/${record[resource.idKey]}/edit`;

  return (
    <Button asChild {...props} ref={ref}>
      <Link href={url}>{children ?? "Edit"}</Link>
    </Button>
  );
};
