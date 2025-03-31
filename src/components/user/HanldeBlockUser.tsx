import React from "react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useCreateBlockUserByUuidMutation } from "@/redux/service/user";

export default function HanldeBlockUser({ row }: { row: any }) {
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
      className={`rounded-[6px] cursor-pointer text-[10px] md:text-base justify-center font-normal w-[100px] ${
        // Fixing width
        row.original.is_blocked === 1
          ? "bg-red-500 text-white hover:bg-red-600" // Blocked (Red)
          : "bg-green-500 text-white hover:bg-green-600" // Unblocked (Green)
      }`}
    >
      {row.original.is_blocked ? "Disable" : "Enable"}
    </Badge>
  );
}
