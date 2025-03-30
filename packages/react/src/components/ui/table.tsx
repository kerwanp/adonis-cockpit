import * as React from "react";
import { cn } from "../../utils/cn.js";

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<"thead">) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody = ({
  ref,
  className,
  ...props
}: React.ComponentProps<"tbody">) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";

const TableFooter = ({
  className,
  ...props
}: React.ComponentProps<"tfoot">) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr
    tabIndex={0}
    className={cn(
      "border-b transition-colors data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td
    className={cn(
      "py-2 px-4 align-middle [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);
TableCell.displayName = "TableCell";

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => (
  <caption
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
