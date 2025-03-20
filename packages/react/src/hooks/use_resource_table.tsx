import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useResource } from "../providers/resource.jsx";
import { FieldRenderer } from "../components/fields/renderer.jsx";
import { useResourceList } from "./resources.jsx";
import { useState } from "react";
import { EditButton } from "../components/resources/buttons/edit.jsx";
import { Eye, Pen, Trash } from "lucide-react";
import { DetailButton } from "../components/resources/buttons/details.jsx";
import { DeleteButton } from "../components/resources/buttons/delete.jsx";

export function useResourceTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const { resource } = useResource();

  const { data } = useResourceList({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
  });

  const columns: ColumnDef<any>[] = [
    ...resource.fields.map(
      (field) =>
        ({
          accessorKey: field.name,
          header: field.label,
          ...(field.kind
            ? {
                cell: (t) => {
                  return (
                    <FieldRenderer type="index" name={field.kind} context={t} />
                  );
                },
              }
            : {}),
        }) satisfies ColumnDef<any>,
    ),
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <EditButton size="icon" variant="ghost">
            <Pen />
          </EditButton>
          <DetailButton size="icon" variant="ghost">
            <Eye />
          </DetailButton>
          <DeleteButton size="icon" variant="ghost">
            <Trash />
          </DeleteButton>
        </div>
      ),
    },
  ];

  return useReactTable({
    columns,
    data: data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: data?.meta.total,
    onPaginationChange: setPagination,
    state: {
      pagination: pagination,
    },
  });
}
