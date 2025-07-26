"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { statuses, roles } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { TrashIcon, ArrowUpDown } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("date")?.setFilterValue([from, to]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between relative">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search titles..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* Date Invited Button and Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            className="h-8 border-dashed"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Date Invited
          </Button>
          {showDatePicker && (
            <div className="absolute left-0 z-50 mt-2">
              <CalendarDatePicker
                date={dateRange}
                onDateSelect={handleDateSelect}
                className="h-9 w-[250px]"
                variant="outline"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort Button: toggles sorting for the date column */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg"
          onClick={() => {
            const dateCol = table.getColumn("date");
            if (!dateCol) return;
            const currentSort = table
              .getState()
              .sorting.find((s) => s.id === "date");
            if (!currentSort) {
              table.setSorting([{ id: "date", desc: false }]);
            } else if (!currentSort.desc) {
              table.setSorting([{ id: "date", desc: true }]);
            } else {
              table.setSorting([]);
            }
          }}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
