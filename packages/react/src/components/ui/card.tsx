import * as React from "react";
import { cn } from "../../utils/cn.js";

const Card = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

const CardDescription = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("text-sm text-muted-foreground", className)} {...props} />
);

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
