import { ComponentProps } from "react";
import { cn } from "../../utils/cn.js";

export const Icon = ({
  icon,
  className,
  ...props
}: ComponentProps<"i"> & { icon: string }) => {
  return <i className={cn(icon, className)} {...props} />;
};
