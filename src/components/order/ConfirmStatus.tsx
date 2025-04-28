"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { useUpdateOrderStatusMutation } from "@/redux/service/order";
export default function ConfirmStatus({ row }: { row: any }) {

  // rtk update
  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleConfirmOrder = async () => {
    try {
      const response = await updateStatus({ uuid: row.original.uuid });
      if (response.data) {
        toast.success("Order Update Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Update Order", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.success("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className=" bg-accent text-center items-center  flex justify-center  w-[90px] text-white rounded-md px-2 h-[40px]">
          <p>Confirm</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to confirm this order {row.original.order_code} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently confrim the
            order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleConfirmOrder()}
            className="text-white"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
