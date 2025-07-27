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
    <div className="flex flex-wrap items-center justify-between relative ">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search titles..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[180px] "
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {/* {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )} */}
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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.66665 1.16663C4.94279 1.16663 5.16665 1.39048 5.16665 1.66663V2.17511C5.608 2.16662 6.09425 2.16662 6.62903 2.16663L9.37092 2.16663C9.90571 2.16662 10.392 2.16662 10.8333 2.17511V1.66663C10.8333 1.39048 11.0572 1.16663 11.3333 1.16663C11.6095 1.16663 11.8333 1.39048 11.8333 1.66663V2.21802C12.0066 2.23123 12.1707 2.24784 12.326 2.26872C13.1076 2.3738 13.7402 2.59521 14.2392 3.09412C14.7381 3.59303 14.9595 4.22566 15.0646 5.00728C15.0981 5.25707 15.1207 5.52968 15.1358 5.82667C15.1557 5.88067 15.1666 5.93904 15.1666 5.99996C15.1666 6.04617 15.1604 6.09092 15.1486 6.1334C15.1667 6.66805 15.1667 7.27513 15.1666 7.96235V9.33329C15.1666 9.60944 14.9428 9.83329 14.6666 9.83329C14.3905 9.83329 14.1666 9.60944 14.1666 9.33329V7.99996C14.1666 7.43062 14.1664 6.93511 14.1579 6.49996L1.84204 6.49996C1.83353 6.93511 1.83331 7.43062 1.83331 7.99996V9.33329C1.83331 10.6045 1.83438 11.5076 1.92649 12.1927C2.01666 12.8635 2.18578 13.2499 2.46792 13.532C2.75006 13.8142 3.13649 13.9833 3.80721 14.0735C4.49232 14.1656 5.39543 14.1666 6.66665 14.1666H9.33331C9.60946 14.1666 9.83331 14.3905 9.83331 14.6666C9.83331 14.9428 9.60946 15.1666 9.33331 15.1666H6.62904C5.40386 15.1666 4.43344 15.1666 3.67396 15.0645C2.89235 14.9595 2.25972 14.738 1.76081 14.2391C1.2619 13.7402 1.04049 13.1076 0.935403 12.326C0.833294 11.5665 0.833303 10.5961 0.833313 9.3709V7.96235C0.833307 7.27513 0.833302 6.66805 0.851319 6.13341C0.839583 6.09092 0.833313 6.04617 0.833313 5.99996C0.833313 5.93904 0.844209 5.88066 0.864159 5.82667C0.879282 5.52968 0.901819 5.25707 0.935403 5.00728C1.04049 4.22566 1.2619 3.59303 1.76081 3.09412C2.25972 2.59521 2.89235 2.3738 3.67396 2.26872C3.82925 2.24784 3.99335 2.23123 4.16665 2.21802V1.66663C4.16665 1.39048 4.3905 1.16663 4.66665 1.16663ZM1.88777 5.49996L14.1122 5.49996C14.1015 5.3737 14.0887 5.25412 14.0735 5.14052C13.9833 4.4698 13.8142 4.08337 13.532 3.80123C13.2499 3.51909 12.8635 3.34998 12.1927 3.2598C11.5076 3.16769 10.6045 3.16663 9.33331 3.16663H6.66665C5.39543 3.16663 4.49232 3.16769 3.80721 3.2598C3.13649 3.34998 2.75006 3.51909 2.46792 3.80123C2.18578 4.08337 2.01666 4.4698 1.92649 5.14052C1.91121 5.25412 1.89845 5.3737 1.88777 5.49996ZM12 10.5C11.1716 10.5 10.5 11.1715 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1715 12.8284 10.5 12 10.5ZM9.49998 12C9.49998 10.6192 10.6193 9.49996 12 9.49996C13.3807 9.49996 14.5 10.6192 14.5 12C14.5 12.5095 14.3475 12.9834 14.0858 13.3787L15.0202 14.3131C15.2155 14.5083 15.2155 14.8249 15.0202 15.0202C14.8249 15.2154 14.5084 15.2154 14.3131 15.0202L13.3787 14.0858C12.9835 14.3475 12.5095 14.5 12 14.5C10.6193 14.5 9.49998 13.3807 9.49998 12Z"
                fill="#2B2B2B"
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
          {/* <ArrowUpDown className="mr-2 h-4 w-4" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.13196 2.20896C9.31346 2.12912 9.52499 2.16407 9.67116 2.29806L13.6712 5.96473C13.8747 6.15132 13.8885 6.46761 13.7019 6.67116C13.5153 6.87472 13.199 6.88848 12.9954 6.70188L9.8333 3.80325L9.8333 13.3333C9.8333 13.6094 9.60944 13.8333 9.3333 13.8333C9.05716 13.8333 8.8333 13.6094 8.8333 13.3333L8.8333 2.66664C8.8333 2.46835 8.95047 2.2888 9.13196 2.20896ZM6.66663 2.16664C6.94277 2.16664 7.16663 2.39049 7.16663 2.66664L7.16663 13.3333C7.16663 13.5316 7.04946 13.7111 6.86796 13.791C6.68646 13.8708 6.47493 13.8359 6.32877 13.7019L2.32877 10.0352C2.12521 9.84862 2.11146 9.53233 2.29805 9.32877C2.48465 9.12521 2.80093 9.11146 3.00449 9.29806L6.16663 12.1967L6.16663 2.66664C6.16663 2.39049 6.39049 2.16664 6.66663 2.16664Z"
              fill="#2B2B2B"
            />
          </svg>
          Sort
        </Button>
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        {/* <DataTableViewOptions table={table} /> */}
      </div>
    </div>
  );
}
