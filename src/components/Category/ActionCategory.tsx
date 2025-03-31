"use client";
import { useDeleteCategoryMutation } from "@/redux/service/category";
import React from "react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";

export default function ActionCategory({ row }: { row: any }) {
  // state hold user input

  // delete category by uuid
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteSubCategory = async () => {
    try {
      const response = await deleteCategory(row.original.uuid);
      if (response.data) {
        toast.success("SubCategory Delete Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Delete SubCategory ", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* delete sub category */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 text-white px-3 py-1 rounded transition hover:bg-red-500">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete this subCategory?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              subCategory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteSubCategory()}
              className="text-white"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
