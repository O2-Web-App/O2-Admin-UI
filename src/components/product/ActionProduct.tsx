"use client";
import React, { useState } from "react";
import { useDeleteProductMutation } from "@/redux/service/product";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { IoMdMore } from "react-icons/io";
import UpdateProduct from "./UpdateProduct";
import ProductView from "./viewProduct";
export default function ActionProduct({ row }: { row: any }) {
  const [deleteProduct] = useDeleteProductMutation();

  // delete discount
  const handleDeleteProduct = async (uuid: string) => {
    try {
      const response = await deleteProduct({ uuid: uuid });
      if (response.data) {
        toast.success("Product Deleted Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Delete Product", {
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

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <IoMdMore className="w-5 h-5 text-gray-500 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto p-2 space-y-3">
        {/* for view */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-white bg-accent hover:bg-accent rounded-[6px] py-1 px-4 w-auto">
              View
            </Button>
          </AlertDialogTrigger>
          <ProductView productUuid={row?.original?.uuid || ""} />
        </AlertDialog>
        <div className="w-full h-full">
          <UpdateProduct uuid={row.original.uuid || ""} />
        </div>
        {/* delete disocunt */}
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="cursor-pointer bg-red-500 rounded-[6px] text-white px-3 py-2  transition hover:bg-red-500">
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>
              Are you sure want to delete product {row.original.name} ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteProduct(row.original.uuid || "")}
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
