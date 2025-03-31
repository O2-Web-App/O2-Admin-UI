"use client";
import {
  useUpdateDiscountNameMutation,
  useDeleteDiscountMutation,
} from "@/redux/service/discount";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoMdMore } from "react-icons/io";
import { toast } from "sonner";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";
import { Input } from "../ui/input";

export default function ActionDiscount({ row }: { row: any }) {
  const [discountName, setDiscountName] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // redux update discount name
  const [updateDiscountName] = useUpdateDiscountNameMutation();

  // redux delete discount
  const [deleteDiscount] = useDeleteDiscountMutation();

  // update discount name
  const handleUpdateDiscountName = async (uuid: string) => {
    try {
      const response = await updateDiscountName({
        name: discountName,
        uuid: uuid,
      });
      if (response.data) {
        toast.success("Discount Name Updated Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
        setDiscountName("");
      } else {
        toast.error("Failed To Update Discount Name", {
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

  // delete discount
  const handleDeleteDiscount = async (uuid: string) => {
    try {
      const response = await deleteDiscount({ uuid: uuid });
      if (response.data) {
        toast.success("Discount Deleted Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Delete Discount", {
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <IoMdMore className="w-5 h-5 text-gray-500 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-4 w-[100px] p-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-white bg-primary rounded-[6px] py-1 px-4 w-auto">
              Update
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Discount Name</AlertDialogTitle>
            </AlertDialogHeader>

            {/* 🧾 Input form */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="discount" className="text-sm font-medium">
                Discount Name
              </label>
              <Input
                id="discount"
                placeholder="Enter new discount name to update"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
                className="h-[45px]"
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDiscountName("")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-white bg-primary"
                onClick={() =>
                  handleUpdateDiscountName(row.original.uuid ?? "")
                }
              >
                confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* delete disocunt */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="bg-red-500 cursor-pointer text-white px-3 py-2 rounded transition hover:bg-red-500">
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure want to delete {row.original.name} discount?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteDiscount(row.original.uuid ?? "")}
                className="text-white"
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
}
