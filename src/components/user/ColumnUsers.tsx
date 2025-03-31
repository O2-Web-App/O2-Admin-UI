import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Image from "next/image";
import { UserType } from "@/types/users";
import { ActionUserComponent } from "@/components/user/UserActionComponent";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { useCreateBlockUserByUuidMutation } from "@/redux/service/user";
import { toast } from "sonner";
import HanldeBlockUser from "./HanldeBlockUser";
const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder.jpg";

export const columnsUser: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USER NAME" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <img
            className="rounded-[6px] h-auto w-[40px]"
            width={70}
            height={10}
            src={
              row.original?.avatar
                ? imageBaseUrl + row?.original?.avatar
                : "/place-holder.jpg"
            }
            alt="image"
          />
          <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
            {row.original?.name ?? "N/A"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EMAIL" />
    ),
    cell: ({ row }) => <div>{row.original?.email ?? "N/A"}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PHONE NUMBER" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row.original?.phone_number ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => <HanldeBlockUser row={row} />,
  },
  // {
  //   accessorKey: "action",
  //   header: () => <div></div>,
  //   cell: ({ row }) => (
  //     <ActionUserComponent
  //       uuid={row.original.uuid}
  //       status={row.original.is_blocked}
  //     />
  //   ),
  // },
  {
    accessorKey: "action",
    header: () => <div></div>,
    cell: ({ row }) => <ActionUserComponent uuid={row.original.uuid} />,
},

];
