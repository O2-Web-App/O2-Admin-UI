"use client";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { getYouTubeThumbnail } from "@/lib/utils";
import { BlogType } from "@/types/blog";
import { TopBlogType } from "@/types/topBlog";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosCloseCircle, IoMdMore } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import AwardRankDropdown from "./AwardRankDropdown";
import AwardTypeDropdown from "./AwardTypeDropdown";
import ViewBlog from "./ViewBlog";
export const ColumnsTopBlog: ColumnDef<TopBlogType>[] = [
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
      <DataTableColumnHeader column={column} title=" Total View" />
    ),
    cell: ({ row }) => <div>{row.original?.views ?? "N/A"}</div>,
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Likes" />
    ),
    cell: ({ row }) => (
      <div className="text-start">{row.original?.likes ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View Detail" />
    ),
    cell: ({ row }) => <ViewBlog row={row} />,
  },
  // award type
  {
    accessorKey: "award_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Award Type" />
    ),
    cell: ({ row }) => <AwardTypeDropdown row={row} />,
  },
  // award rank
  {
    accessorKey: "award_rank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Award Rank" />
    ),
    cell: ({ row }) => <AwardRankDropdown row={row} />,
  },
];
