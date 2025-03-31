import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Image from "next/image";
import { UserType } from "@/types/users";
import { ActionUserComponent } from "@/components/user/UserActionComponent";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { useCreateBlockUserByUuidMutation } from "@/redux/service/user";
import { toast } from "sonner";
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
    cell: ({ row }) => {
      const [blockUser] = useCreateBlockUserByUuidMutation();
      const handleBlockUser = async () => {
        try {
          const response = await blockUser({ uuid: row.original.uuid });
          if (response.data) {
            toast.success("Block User Successfully ", {
              style: {
                background: "#22bb33",
                color: "white",
              },
            });
          } else {
            toast.success("Fail To Block User ", {
              style: {
                background: "#bb2124",
                color: "white",
              },
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      };

      return (
        <Badge
          onClick={() => handleBlockUser()}
          className={`rounded-[6px] text-[10px] md:text-base justify-center font-normal w-[100px] ${
            // Fixing width
            row.original.is_blocked === 1
              ? "bg-red-500 text-white hover:bg-red-600" // Blocked (Red)
              : "bg-green-500 text-white hover:bg-green-600" // Unblocked (Green)
          }`}
        >
          {row.original.is_blocked ? "Disable" : "Enable"}
        </Badge>
      );
    },
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
