"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { getYouTubeThumbnail } from "@/lib/utils";
import {
  useDisableBlogMutation,
  usePublicBlogMutation,
} from "@/redux/service/blog";
import { BlogType } from "@/types/blog";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import ViewBlog from "./ViewBlog";
import BlogStatus from "./BlogStatus";

export const ColumnsBlog: ColumnDef<BlogType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blog Title " />
    ),

    cell: ({ row }) => (
      <div className="flex items-center">
        <p className="px-2 text-description-color justify-center text-[10px] md:text-sm xl:text-base dark:text-dark-description-color">
          {row.original?.title ?? "N/A"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total View" />
    ),
    cell: ({ row }) => <div>{row.original?.views ?? "N/A"}</div>,
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Total Likes" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row.original?.likes ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "published_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published At" />
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original?.created_at.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <BlogStatus row={row} /> // <BlogStatus row={row} /> // <BlogStatus row={row} />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View Detail" />
    ),
    cell: ({ row }) => <ViewBlog row={row} />,
  },
];
