import { flexRender, Table as TSTable } from "@tanstack/react-table";
import { useResourceTable } from "../../hooks/use_resource_table.jsx";
import { columns } from "../ui/data-table.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { RecordProvider } from "../../providers/record.jsx";

export const ResourceTable = () => {
  const table = useResourceTable();
  return (
    <div className="rounded-lg border overflow-hidden grow min-h-0 flex flex-col justify-between">
      <Table>
        <TableHeader className="bg-muted sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <RecordProvider key={row.id} record={row.original}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </RecordProvider>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </div>
  );
};

const TablePagination = ({ table }: { table: TSTable<any> }) => {
  const state = table.getState();

  const sizes = [10, 25, 50, 100, 250, 500];

  const pageCount = table.getPageCount();
  const currentPage = state.pagination.pageIndex;

  const max = pageCount - 3;
  const min = 0 + 2;

  const center = Math.min(Math.max(currentPage, min), max);

  const pages = Array.from({ length: Math.min(pageCount, 5) }).map((_, i) => {
    if (pageCount < 5) return i;
    return i - 2 + center;
  });

  return (
    <div className="flex items-center p-4">
      <Pagination>
        <PaginationContent>
          <PaginationLink
            aria-label="Go to first page"
            size="icon"
            onClick={() => table.setPageIndex(0)}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
          <PaginationItem>
            <PaginationPrevious onClick={() => table.previousPage()} />
          </PaginationItem>
          {pages.map((i) => {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
          <PaginationLink
            aria-label="Go to last page"
            size="icon"
            onClick={() => table.setPageIndex(pageCount - 1)}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationContent>
      </Pagination>
      <div className="shrink-0 flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          {table.getRowCount()} total rows
        </div>
        <Select
          value={state.pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(+value)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
