"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { OrderType } from "@/types/order";
import ViewOrder from "./ViewOrder";
import { IoIosCloseCircle } from "react-icons/io";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import ConfirmStatus from "./ConfirmStatus";
import { AlertDialogContent } from "../ui/alert-dialog";
export const ColumnsOrder: ColumnDef<OrderType>[] = [
  {
    accessorKey: "order_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Order Code " />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row?.original?.order_code ?? "N/A"}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row?.original?.total_price ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "delivery_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Date" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row?.original?.delivery_date?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ??
          "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row?.original?.created_at?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row?.original?.status;

      const statusStyles = {
        processing: "bg-yellow-500",
        completed: "bg-secondary",
      };

      return (
        <div
          className={`${
            statusStyles[status?.toLowerCase() as keyof typeof statusStyles] ||
            "bg-accent"
          } 
            text-center items-center flex justify-center 
            w-[90px] text-white rounded-md px-2 h-[40px]`}
        >
          <p className="capitalize">{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell: ({ row }) => (
      <AlertDialog>
        <AlertDialogTrigger>
          <div className=" text-center items-center flex justify-center bg-primary w-[90px] text-white rounded-md px-2 h-[40px]">
            <p>View</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="flex items-center text-center justify-between">
              <p className="text-accent text-title font-semibold">
                Order Details
              </p>
              <AlertDialogCancel>
                <IoIosCloseCircle className="text-red-500 w-6 h-6" />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <hr />
          <ViewOrder uuid={row?.original?.uuid || ""} />
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    accessorKey: "confirm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Confirm" />
    ),
    cell: ({ row }) => <ConfirmStatus row={row} />,
  },
];
