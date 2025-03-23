"use client";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
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
import { useDeleteCategoryMutation } from "@/redux/service/category";
import { Subcategory } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "../ui/button";
export const ColumnCategory: ColumnDef<Subcategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUBCATEGORIES" />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.name ?? "N/A"}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED AT" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.created_at?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UPDATED AT" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.updated_at?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTION" />
    ),
    cell: ({ row }) => {
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
    },
  },
];
