"use client";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteCategoryMutation } from "@/redux/service/category";
import { Subcategory } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ActionCategory from "./ActionCategory";
export const ColumnCategory: ColumnDef<Subcategory>[] = [
  {
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUBCATEGORIES" />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.name ?? "N/A"}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED AT" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.created_at?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UPDATED AT" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.updated_at?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTION" />
    ),
    cell: ({ row }) => <ActionCategory row={row} />,
  },
];
