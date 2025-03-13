import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Image from "next/image";
import { UserType } from "@/types/users";
import { ActionUserComponent} from "@/components/user/UserActionComponent";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columnsUser: ColumnDef<UserType>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div>{row.original?.id ?? "N/A"}</div>,
        enableSorting: false,
        enableHiding: false,
    },
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
                    {row.original?.username ?? "N/A"}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GENDER" />
        ),
        cell: ({ row }) => <div>{row.original?.gender ?? "N/A"}</div>,
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
        cell: ({ row }) => <div className="text-start">{row.original?.phoneNumber ?? "N/A"}</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="STATUS" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as number;
            const isStatusEnabled = status === 1;
            return (
                <Badge
                    className={`rounded-[6px] text[10px] md:text-base justify-center font-normal ${
                        isStatusEnabled
                            ? "bg-label-free text-label-text-primary hover:bg-label-free/90"
                            : "bg-label-paid text-label-text-primary hover:bg-label-paid/90"
                    }`}
                >
                    {isStatusEnabled ? "Enable" : "Disable"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "action",
        header: () => <div></div>,
        cell: ({ row }) => (
            <ActionUserComponent uuid={row.original.uuid} status={row.original.status} />
        ),
    },
];