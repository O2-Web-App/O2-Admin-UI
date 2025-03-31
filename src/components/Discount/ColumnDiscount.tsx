"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DiscountType } from "@/types/discount";
import Image from "next/image";
import ActionDiscount from "./ActionDiscount";
const imageBaseUrl =
  process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder-product.jpg";

export const ColumnsDiscount: ColumnDef<DiscountType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Name " />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          width={100}
          height={100}
          alt="image discount"
          src={
            row.original?.image === null
              ? "/place-holder-product.jpg"
              : imageBaseUrl + row?.original?.image
          }
        />
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.name ?? "N/A"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.original?.description ?? "N/A"}</div>,
  },
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Percentage" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.discount_percentage ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.start_date.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.end_date.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => (
      <ActionDiscount row={row} /> // <ActionDiscount row={row} /> // <ActionDiscount row={row} />
    ),
  },
];
