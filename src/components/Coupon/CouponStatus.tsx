"use client";
import { useUpdateCouponStatusMutation } from "@/redux/service/coupon";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function CouponStatus({ row }: { row: any }) {
  // update status coupon
  const [updateStateCoupon] = useUpdateCouponStatusMutation();

  const handleUpdateStatusCoupon = async (uuid: string) => {
    try {
      const response = await updateStateCoupon({ uuid: uuid });
      if (response.data) {
        toast.success("Coupon Status Updated Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Update Coupon Status", {
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
    <div className="text-start">
      <Button
        onClick={() => handleUpdateStatusCoupon(row.original.uuid ?? "")}
        className={` px-3 py-2 rounded-md text-white ${
          row.original.is_active === 1 ? "bg-secondary" : "bg-red-500"
        }`}
      >
        {row.original?.is_active === 1 ? "Active" : "Inactive"}
      </Button>
    </div>
  );
}
