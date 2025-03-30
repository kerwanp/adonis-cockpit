import { Row, Table } from "@tanstack/react-table";
import { ComponentProps, RefObject, useEffect, useRef } from "react";

export type UseTableNavigationOptions = {
  table: Table<any>;
  tableRef: RefObject<HTMLTableElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  onKeyDown(e: KeyboardEvent, row: Row<any>): void;
};

export function useTableNavigation({
  table,
  tableRef,
  inputRef,
  onKeyDown,
}: UseTableNavigationOptions) {
  const selected = useRef<string | null>(null);
  const navigate = (index: number) => {
    const id = table._getRowId({}, index);
    const el = tableRef.current?.querySelector<HTMLTableRowElement>(
      `[data-row='${id}']`,
    );

    if (el === undefined || el === null) return false;

    selected.current = id;

    el.focus();
    return true;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const el = document.activeElement as HTMLElement;
    if (!el) return;

    if (e.key === "f" && e.ctrlKey) {
      inputRef.current?.focus();
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // When trying to navigate and no row is focused we focus the first row
    if (
      ["j", "ArrowDown", "k", "ArrowUp"].includes(e.key) &&
      !tableRef.current?.contains(el) &&
      el === document.body
    ) {
      return navigate(0);
    }

    const id = el.getAttribute("data-row");
    if (!id) return;
    const row = table.getRow(id);

    function handle() {
      if (["j", "ArrowDown"].includes(e.key)) return navigate(row.index + 1);
      if (["k", "ArrowUp"].includes(e.key)) return navigate(row.index - 1);
      // if (e.key === "Escape") el.blur();

      if (e.key === "Tab") {
        if (e.shiftKey) return navigate(row.index - 1);
        else return navigate(row.index + 1);
      }

      return false;
    }

    // If we navigated in table we stop event
    if (handle()) {
      e.preventDefault();
      e.stopPropagation();
    }

    onKeyDown(e, row);
  };

  const getRowProps = (
    id: string,
  ): ComponentProps<"tr"> & Record<string, any> => {
    return {
      onMouseMove: () => {
        if (selected.current === id) return;
        const row = table.getRow(id);
        navigate(row.index);
      },
      "data-row": id,
    };
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { ref: tableRef, getRowProps };
}
