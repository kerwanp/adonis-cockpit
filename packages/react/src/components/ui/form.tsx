"use client";

import * as React from "react";
import { cn } from "../../utils/cn.js";
import { Label } from "./label.js";
import {
  useFieldContext,
  useFormContext,
} from "../../hooks/use_resource_form.js";
import { X } from "lucide-react";

const FormField = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("space-y-2", className)} {...props} />;
};

const FormLabel = ({
  className,
  children,
  required,
  ...props
}: React.ComponentProps<"div"> & { required?: boolean }) => {
  const form = useFormContext();
  const { state, name } = useFieldContext();

  return (
    <div
      className={cn("flex items-center gap-1.5 relative", className)}
      {...props}
    >
      <Label
        className={cn(
          "inline-block",
          state.meta.errors.length && "text-destructive",
        )}
        htmlFor={name}
      >
        {children} {required && <span className="text-destructive">*</span>}
      </Label>
      {state.meta.isDirty && (
        <X
          className={cn(
            "absolute opacity-30 animate-in fade-in cursor-pointer right-0",
          )}
          size={20}
          onClick={() => form.resetField(name)}
        />
      )}
    </div>
  );
};

const FormDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  const { name } = useFieldContext();

  return (
    <p
      id={name}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) => {
  const { state, name } = useFieldContext();
  // TODO: Error message
  const body = state.meta.errors
    ? String("An error with this field")
    : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={name}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
};

export { FormField, FormLabel, FormDescription, FormMessage };
