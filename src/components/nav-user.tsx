"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useGetCurrentUserQuery } from "@/redux/service/user";

export function NavUser() {
  type User = {
    username: string;
    avatar: string;
    role: string;
    email: string;
  };

  const { data } = useGetCurrentUserQuery({});
  const user = data?.data;
  const imageBaseUrl =
    process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder.jpg";
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-between space-x-3">
            <div>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={imageBaseUrl + user?.avatar}
                  alt={user?.name}
                  className="object-cover"
                />
              </Avatar>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <p className="truncate font-semibold">{user?.name}</p>
              <p className="truncate text-xs">{user?.email}</p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>testing</AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
