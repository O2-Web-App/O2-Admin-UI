import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { ActionUserComponent } from "@/components/user/UserActionComponent";
import { Subcategory } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";

export const ColumnCategory: ColumnDef<Subcategory>[] = [
  {
    accessorKey: "name",
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED AT" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row.original?.created_at ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UPDATED AT" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row.original?.updated_at ?? "N/A"}</div>
    ),
  },
];
