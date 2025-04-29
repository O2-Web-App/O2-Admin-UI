"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { useUpdateCouponStatusMutation } from "@/redux/service/coupon";
import { CouponType } from "@/types/coupon";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ActionCoupon from "./ActionCoupon";
import CouponStatus from "./CouponStatus";
const imageBaseUrl =
  process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder-product.jpg";

export const columnsCoupon: ColumnDef<CouponType>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Code " />
    ),

    cell: ({ row }) => (
      <div className="flex items-center w-[150px] h-[100px]">
        <img
          className="object-cover w-full h-full"
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
          {row.original?.code ?? "N/A"}
        </p>
      </div>
    ),
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
    accessorKey: "is_active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Active" />
    ),
    cell: ({ row }) => (
      <CouponStatus row={row} /> // Update status coupon
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <ActionCoupon row={row} />,
  },
];
