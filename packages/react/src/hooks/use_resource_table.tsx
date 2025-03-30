import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useResource } from "../providers/resource.js";
import { FieldRenderer } from "../components/fields/renderer.js";
import { useResourceList } from "./resources.js";
import { useState } from "react";
import { EditButton } from "../components/resources/buttons/edit.js";
import { ArrowDown, ArrowUp, ArrowUpDown, Pen, Trash } from "lucide-react";
import { DeleteButton } from "../components/resources/buttons/delete.js";
import { Button } from "../components/ui/button.js";
import { InferSerializable } from "adonis-cockpit/types";
import { BaseField } from "adonis-cockpit/fields";
import { flattenFields } from "../utils/form.js";
import { Filter } from "@adonis-cockpit/lucid-filter/types";

function normalizeSorting(state: SortingState) {
  return state.map((item) => ({
    property: item.id,
    direction: item.desc === true ? ("desc" as const) : ("asc" as const),
  }));
}

function getColumn(
  field: InferSerializable<BaseField>,
): ColumnDef<any> | undefined {
  return {
    id: field.name,
    accessorKey: field.name,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const toggleSorting = column.getToggleSortingHandler();
      return (
        <Button variant="ghost" onClick={toggleSorting}>
          {field.label}
          {sortDirection === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : sortDirection === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    ...(field.kind
      ? {
          cell: (t) => {
            return (
              <FieldRenderer
                type="index"
                name={field.kind}
                field={field}
                context={t}
              />
            );
          },
        }
      : {}),
  };
}

function getColumns(fields: InferSerializable<BaseField>[]): ColumnDef<any>[] {
  return fields
    .map((field) => getColumn(field))
    .filter(Boolean) as ColumnDef<any>[];
}

export function useResourceTable({ baseFilters }: { baseFilters?: Filter }) {
  const { resource } = useResource();

  const [sorting, setSorting] = useState<SortingState>([
    { id: resource.idKey, desc: false },
  ]);

  const [query, setQuery] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const { data } = useResourceList(resource.name, {
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    sort: normalizeSorting(sorting),
    filter: baseFilters,
    query,
  });

  const columns: ColumnDef<any>[] = [
    ...getColumns(flattenFields(resource.fields)),
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <EditButton size="icon" variant="ghost">
            <Pen />
          </EditButton>
          <DeleteButton size="icon" variant="ghost">
            <Trash />
          </DeleteButton>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: data?.data ?? [],
    getRowId(_, index) {
      return data?.data[index]?.[resource.idKey];
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount: data?.meta.total,
    enableSortingRemoval: false,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      columnFilters,
      sorting,
    },
  });

  return { table, query, setQuery };
}
