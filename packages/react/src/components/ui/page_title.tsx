import { ComponentProps } from "react";

export const PageTitle = ({ children }: ComponentProps<"h2">) => {
  return (
    <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      {children}
    </h2>
  );
};
