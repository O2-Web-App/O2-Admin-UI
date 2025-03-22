import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { ActionUserComponent } from "@/components/user/UserActionComponent";
import { ProductType } from "@/types/products";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder.jpg";
export const ColumnProducts: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PRODUCT NAME" />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          className="rounded-[6px] h-auto w-[40px]"
          width={70}
          height={10}
          src={
            row.original?.single_image
              ? imageBaseUrl + row.original.single_image
              : "/place-holder.jpg"
          }
          alt="image"
        />
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.name ?? "N/A"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PRICE" />
    ),
    cell: ({ row }) => <div>{row.original?.price ?? "N/A"}</div>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STOCK" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row.original?.stock ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "discount_percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DISCOUNT PERCENTAGE" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.discount_percentage ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "discounted_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DISCOUNT PRICE" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.discounted_price ?? "N/A"}
      </div>
    ),
  },

  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTION" />
    ),
    cell: ({ row }) => <ActionUserComponent uuid={row.original.uuid} />,
  },
];
