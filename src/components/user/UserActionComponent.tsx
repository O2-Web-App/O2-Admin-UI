"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserByUuidQuery } from "@/redux/service/user";
import Image from "next/image";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";

type ActionUserComponentProps = {
  uuid: string;
};

export function ActionUserComponent({ uuid }: ActionUserComponentProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;
  const { data } = useGetUserByUuidQuery({ uuid: uuid });
  const user = data?.data;

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-2" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          <IoMdMore className="w-5 h-5 text-gray-500 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col p-2 w-full">
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="text-sm text-gray-600 text-start hover:bg-gray-100 rounded-md flex cursor-pointer items-center p-2">
                <MdOutlinePreview className="mr-2" size={16} />
                <p className="w-[100px] px-1">View Profile</p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full mx-auto items-center">
              <AlertDialogTitle>
              <div className="w-full flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                      src={user?.avatar ? imageBaseUrl + user.avatar : "/place-holder.jpg"}
                      width={100}
                      height={100}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-semibold mt-3">{user?.name || "N/A"}</p>
                </div>
              </AlertDialogTitle>
              <Tabs defaultValue="info">
                <TabsContent value="info" className="p-4">
                  <div className="space-y-2">
                    <div><p className="text-gray-600">Email: </p> <p>{user?.email || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                    <div><p className="text-gray-600">Phone:</p> <p>{user?.phone_number || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                    <div><p className="text-gray-600">Address:</p> <p>{user?.address || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                    <div><p className="text-gray-600">Bio:</p> <p>{user?.bio || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                    <div><p className="text-gray-600">Gender:</p> <p>{user?.gender || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                    <div><p className="text-gray-600">Date of Birth:</p> <p>{user?.date_of_birth || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                    <div><p className="text-gray-600">Country:</p> <p>{user?.country || "N/A"}</p><hr className="my-2 border-gray-100" /></div>
                  </div>
                </TabsContent>
              </Tabs>
              <AlertDialogCancel className="w-full bg-accent text-white">Close</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
