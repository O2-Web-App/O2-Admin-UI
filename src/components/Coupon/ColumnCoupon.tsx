"use client";
import { ColumnDef } from "@tanstack/react-table";

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
import {
  useDeleteDiscountMutation,
  useUpdateDiscountNameMutation,
} from "@/redux/service/discount";
import { CouponType } from "@/types/coupon";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDeleteCouponMutation } from "@/redux/service/coupon";
export const columnsCoupon: ColumnDef<CouponType>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Code " />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.code ?? "N/A"}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "discountPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Percentage" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.discount_percentage ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.start_date.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.end_date.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      const [discountName, setDiscountName] = useState("");
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);

      // redux update discount name
      const [updateDiscountName] = useUpdateDiscountNameMutation();

      // redux delete discount
      const [deleteCoupon] = useDeleteCouponMutation();

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
          const response = await deleteCoupon({ uuid: uuid });
          if (response.data) {
            toast.success("Coupon Deleted Successfully", {
              style: {
                background: "#22bb33",
                color: "#fff",
              },
            });
          } else {
            toast.error("Failed To Delete Coupon", {
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
                    onClick={() => handleUpdateDiscountName(row.original.uuid)}
                  >
                    confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/* delete disocunt */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="bg-red-500 text-white px-3 py-2 rounded transition hover:bg-red-500">
                  Delete
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure want to delete {row.original.code} discount?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the category.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteDiscount(row.original.uuid)}
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
    },
  },
];
