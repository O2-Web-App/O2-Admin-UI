"use client";
import { useDisableBlogMutation } from "@/redux/service/blog";
import React from "react";
import { toast } from "sonner";

export default function BlogStatus({ row }: { row: any }) {
  const [disableBlog] = useDisableBlogMutation();

  const handleDisableBlog = async (uuid: string) => {
    try {
      const response = await disableBlog({
        uuid: uuid,
      });
      if (response.data) {
        toast.success("Blog Disable successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed to Disable Blog", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="text-start">
      <button
        onClick={() => handleDisableBlog(row.original.uuid)}
        className={`text-white px-3 py-2 rounded-md ${
          row.original.is_deleted ? "bg-primary" : "bg-red-500"
        }`}
      >
        {row.original.is_deleted ? "Enable" : "Disable"}
      </button>
    </div>
  );
}
