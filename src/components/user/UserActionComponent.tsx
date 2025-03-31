// "use client";

// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useGetUserByUuidQuery } from "@/redux/service/user";
// import Image from "next/image";
// import { useState } from "react";
// import { IoMdMore } from "react-icons/io";
// import { MdOutlinePreview } from "react-icons/md";
// type ActionUserComponentProps = {
//   uuid: string;
//   status?: number;
// };

// export function ActionUserComponent({ uuid }: ActionUserComponentProps) {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

//   const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

//   const { data } = useGetUserByUuidQuery({ uuid: uuid });
//   const userResponse = data?.data;
//   return (
//     <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="ghost"
//           className="p-2"
//           onClick={() => setIsPopoverOpen(!isPopoverOpen)}
//         >
//           <IoMdMore className="w-5 h-5 text-gray-500 cursor-pointer" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <div className="flex flex-col p-2 w-full">
//           <AlertDialog>
//             <AlertDialogTrigger>
//               <div className="text-sm text-gray-600 text-start hover:bg-gray-100 rounded-[6px] flex cursor-pointer items-center p-1">
//                 <MdOutlinePreview className="mr-2" size={16} />
//                 <p className="w-[100px] px-1">View</p>
//               </div>
//             </AlertDialogTrigger>
//             <AlertDialogContent className="w-full mx-auto items-center">
//               <AlertDialogTitle>
//                 <div className="w-full flex flex-col items-center justify-center">
//                   <Image
//                     src={
//                       userResponse?.avatar
//                         ? imageBaseUrl + userResponse.avatar
//                         : "/place-holder.jpg"
//                     }
//                     width={100}
//                     alt="avatar"
//                     height={100}
//                     className="border-2 border-accent rounded-full "
//                   />
//                   <p className=" text-title mt-3">{userResponse?.name}</p>
//                 </div>
//               </AlertDialogTitle>
//               <Tabs defaultValue="Information">
//                 <TabsList>
//                   <TabsTrigger
//                     className=" data-[state=active]:shadow-none  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-primary"
//                     value="Information"
//                   >
//                     Information
//                   </TabsTrigger>
//                   <TabsTrigger
//                     className=" data-[state=active]:shadow-none  data-[state=active]:rounded-none data-[state=active]:border-b-2  data-[state=active]:border-primary"
//                     value="PersonalInformation"
//                   >
//                     Personal Information
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="Information">
//                   <div className="flex flex-col ">
//                     {/* email */}
//                     <div>
//                       <p className="text-body text-description">Email</p>
//                       <p>{userResponse?.email}</p>
//                     </div>
//                     {/* is_verified */}
//                     <div className="my-2">
//                       <p className="text-body text-description">is_verified</p>
//                       <p>
//                         {userResponse?.is_verified === 1 ? "True" : "False"}
//                       </p>
//                     </div>
//                     {/* is_delete */}
//                     <div>
//                       <p className="text-body text-description">is_blocked</p>
//                       <p>
//                         {userResponse?.is_blocked === 1 ? "True" : "False"}{" "}
//                       </p>
//                     </div>
//                   </div>
//                 </TabsContent>
//                 <TabsContent value="PersonalInformation">
//                   <div className="flex justify-evenly ">
//                     <div>
//                       {/* phone_number */}
//                       <div>
//                         <p className="text-body text-description">
//                           Phone Number
//                         </p>
//                         <p>{userResponse?.phone_number || "N/A"}</p>
//                       </div>
//                       {/* address */}
//                       <div className="my-2">
//                         <p className="text-body text-description">Address</p>
//                         <p>{userResponse?.address || "N/A"}</p>
//                       </div>
//                       {/* bio */}
//                       <div className="mb-2">
//                         <p className="text-body text-description">Bio</p>
//                         <p>{userResponse?.bio || "N/A"} </p>
//                       </div>
//                     </div>
                    
//                    <div >
//                      {/* gender */}
//                      <div className="mb-2">
//                       <p className="text-body text-description">Gender</p>
//                       <p>{userResponse?.gender || "N/A"} </p>
//                     </div>
//                     {/* date_of_birth */}
//                     <div className="mb-2">
//                       <p className="text-body text-description">Dob</p>
//                       <p>{userResponse?.date_of_birth || "N/A"}</p>
//                     </div>
//                     {/* country */}
//                     <div className="mb-2">
//                       <p className="text-body text-description">Country</p>
//                       <p>{userResponse?.country || "N/A"}</p>
//                     </div>
//                    </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>

//               <AlertDialogCancel className="w-full bg-accent text-white">
//                 Close
//               </AlertDialogCancel>
//             </AlertDialogContent>
//           </AlertDialog>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }


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
                {/* <TabsList className="flex justify-center border-b">
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                </TabsList> */}
                <TabsContent value="info" className="p-4">
                  <div className="space-y-2">
                    <div><p className="text-gray-600">Email:</p> <p>{user?.email || "N/A"}</p></div>
                    <div><p className="text-gray-600">Phone:</p> <p>{user?.phone_number || "N/A"}</p></div>
                    <div><p className="text-gray-600">Address:</p> <p>{user?.address || "N/A"}</p></div>
                    <div><p className="text-gray-600">Bio:</p> <p>{user?.bio || "N/A"}</p></div>
                    <div><p className="text-gray-600">Gender:</p> <p>{user?.gender || "N/A"}</p></div>
                    <div><p className="text-gray-600">Date of Birth:</p> <p>{user?.date_of_birth || "N/A"}</p></div>
                    <div><p className="text-gray-600">Country:</p> <p>{user?.country || "N/A"}</p></div>
                  </div>
                </TabsContent>
                <TabsContent value="personal" className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    
                  </div>
                </TabsContent>
              </Tabs>
              <AlertDialogCancel className="w-full bg-gray-200 text-black mt-4 py-2">Close</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
