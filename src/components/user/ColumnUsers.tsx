import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Image from "next/image";
import { UserType } from "@/types/users";
import { ActionUserComponent } from "@/components/user/UserActionComponent";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columnsUser: ColumnDef<UserType>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USER NAME" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          className="rounded-[6px] h-auto w-[40px]"
          width={70}
          height={10}
          src={row.original?.avatar ?? "/place-holder.jpg"}
          alt="image"
        />
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.name ?? "N/A"}``
        </p>
      </div>
    ),
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
    cell: ({ row }) => {
      const isBlocked = row?.original?.is_blocked; // Ensure it's a number
      const isBlockedStatus = isBlocked === 1; // Now correctly compares
      console.log(isBlockedStatus);
      console.log(isBlocked);
      return (
        <Badge
          className={`rounded-[6px] text-[10px] md:text-base justify-center font-normal ${
            isBlockedStatus
              ? "bg-red-500 text-white hover:bg-red-600" // Blocked (Red)
              : "bg-green-500 text-white hover:bg-green-600" // Unblocked (Green)
          }`}
        >
          {isBlockedStatus ? "Disable" : "Enable"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div></div>,
    cell: ({ row }) => (
      <ActionUserComponent
        uuid={row.original.uuid}
        status={row.original.is_blocked}
      />
    ),
  },
];
