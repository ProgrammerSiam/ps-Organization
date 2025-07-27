"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Member>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-0.5"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-0.5"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-[#2B2B2B] text-[14px] leading-[20px] font-normal tracking-[-0.014em] ">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-[#2B2B2B] text-[14px] leading-[20px] font-normal tracking-[-0.014em]">
        {row.getValue("email")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <div className="capitalize text-[#2B2B2B] text-[14px] leading-[20px] font-normal tracking-[-0.014em]">
        {row.getValue("role")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center">
          <Badge
            variant="secondary"
            className={cn(
              "flex items-center gap-[4px] rounded-[6px] border border-[#E9EAEB] bg-white px-[6px] py-[4px]",
              status === "Joined"
                ? "text-[#2B2B2B] text-[12px] leading-[18px] font-medium "
                : "text-[#2B2B2B] text-[12px] leading-[18px] font-medium"
            )}
          >
            {status === "Joined" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <g clip-path="url(#clip0_2048_6868)">
                  <path
                    d="M8.01516 5.01516C8.16161 4.86872 8.16161 4.63128 8.01516 4.48483C7.86872 4.33839 7.63128 4.33839 7.48483 4.48483L5.25 6.71967L4.51517 5.98483C4.36872 5.83839 4.13128 5.83839 3.98483 5.98483C3.83839 6.13128 3.83839 6.36872 3.98483 6.51517L4.98483 7.51517C5.13128 7.66161 5.36872 7.66161 5.51517 7.51517L8.01516 5.01516Z"
                    fill="#1A1A1A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 0.625C3.03147 0.625 0.625 3.03147 0.625 6C0.625 8.96853 3.03147 11.375 6 11.375C8.96853 11.375 11.375 8.96853 11.375 6C11.375 3.03147 8.96853 0.625 6 0.625ZM1.375 6C1.375 3.44568 3.44568 1.375 6 1.375C8.55432 1.375 10.625 3.44568 10.625 6C10.625 8.55432 8.55432 10.625 6 10.625C3.44568 10.625 1.375 8.55432 1.375 6Z"
                    fill="#1A1A1A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2048_6868">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.96878 0.625H6.0312C7.03806 0.624992 7.83269 0.624986 8.41147 0.701297C8.98035 0.776302 9.49149 0.941593 9.73424 1.41293C9.76922 1.48084 9.79874 1.5514 9.82252 1.62398C9.98815 2.12946 9.74304 2.60693 9.39393 3.05884C9.0389 3.51842 8.47679 4.07505 7.76513 4.77978L6.53293 6L7.76513 7.22022C8.47679 7.92495 9.0389 8.48158 9.39393 8.94116C9.74304 9.39307 9.98815 9.87054 9.82252 10.376C9.79874 10.4486 9.76922 10.5192 9.73424 10.5871C9.49149 11.0584 8.98035 11.2237 8.41147 11.2987C7.83269 11.375 7.03806 11.375 6.03119 11.375H5.96879C4.96192 11.375 4.16729 11.375 3.5885 11.2987C3.01962 11.2237 2.50848 11.0584 2.26573 10.5871C2.23076 10.5192 2.20124 10.4486 2.17746 10.376C2.01182 9.87054 2.25693 9.39307 2.60604 8.94116C2.96107 8.48158 3.52318 7.92495 4.23484 7.22022L5.46705 6L4.23485 4.77979C3.52318 4.07506 2.96107 3.51842 2.60604 3.05884C2.25693 2.60693 2.01182 2.12946 2.17746 1.62398C2.20123 1.55141 2.23075 1.48084 2.26573 1.41293C2.50848 0.941593 3.01962 0.776302 3.5885 0.701297C4.16728 0.624986 4.96191 0.624992 5.96878 0.625ZM5.99999 5.47224L7.21497 4.26908C7.95393 3.5373 8.47967 3.01552 8.80041 2.60034C9.13078 2.17267 9.14871 1.97626 9.1098 1.85751C9.09842 1.82277 9.08427 1.78893 9.06748 1.75633C9.00913 1.64304 8.85309 1.51601 8.31343 1.44486C7.78965 1.3758 7.04483 1.375 5.99999 1.375C4.95514 1.375 4.21032 1.3758 3.68654 1.44486C3.14689 1.51601 2.99084 1.64304 2.93249 1.75633C2.9157 1.78893 2.90155 1.82277 2.89017 1.85751C2.85126 1.97626 2.86919 2.17267 3.19957 2.60034C3.52031 3.01552 4.04604 3.5373 4.785 4.26908L5.99999 5.47224ZM5.99999 6.52776L4.785 7.73092C4.04604 8.4627 3.5203 8.98448 3.19957 9.39966C2.86919 9.82733 2.85126 10.0237 2.89017 10.1425C2.90155 10.1772 2.9157 10.2111 2.93249 10.2437C2.99084 10.357 3.14689 10.484 3.68654 10.5551C4.21032 10.6242 4.95514 10.625 5.99999 10.625C7.04483 10.625 7.78965 10.6242 8.31343 10.5551C8.85309 10.484 9.00913 10.357 9.06748 10.2437C9.08427 10.2111 9.09842 10.1772 9.1098 10.1425C9.14871 10.0237 9.13078 9.82733 8.80041 9.39966C8.47967 8.98448 7.95393 8.4627 7.21497 7.73092L5.99999 6.52776Z"
                  fill="#1A1A1A"
                />
              </svg>
            )}
            {status}
          </Badge>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date (Joined / Invited)" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return (
        <div className="text-[#2B2B2B] text-[14px] leading-[20px] font-normal tracking-[-0.014em]">
          {formattedDate}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
