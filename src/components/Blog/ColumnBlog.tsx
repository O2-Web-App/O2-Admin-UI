"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { getYouTubeThumbnail } from "@/lib/utils";
import {
  useConfirmBlogAwardMutation,
  useDisableBlogMutation,
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const columnsBlog: ColumnDef<BlogType>[] = [
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
    cell: ({ row }) => {
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
    },
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View Detail" />
    ),
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const imageBaseUrl =
        process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder.jpg";

      const [blogDetail, setBlogDetail] = useState<BlogType | null>(null);

      const handleGetBlogDetailt = async (uuid: string) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_O2_API_URL}/api/blogs/${uuid}`
        );
        const data = await response.json();
        setBlogDetail(data?.data);
      };

      // state for award
      const [awardType, setAwardType] = useState<string>("");
      const [awardRank, setAwardRank] = useState<string>("");
      const [isDropDownOpen, setIsDropDownOpen] = useState(false);

      console.log("awardType", awardType);
      console.log("awardRank", awardRank);

      const [awardBlog] = useConfirmBlogAwardMutation();

      const handleBlogAward = async (uuid: string) => {
        try {
          const response = await awardBlog({
            uuid: uuid,
            award_type: awardType,
            award_rank: awardRank,
          });
          if (response.data) {
            toast.success("Blog Award add successfully", {
              style: {
                background: "#22bb33",
                color: "#fff",
              },
            });
          } else {
            toast.error("Failed to Award Blog", {
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
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger>
            <div
              onClick={() => handleGetBlogDetailt(row.original.uuid)}
              className="text-start px-4 py-2 bg-primary text-white rounded-md"
            >
              View
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[600px]  overflow-y-auto scrollbar-hide ">
            {/* auther detail */}
            <AlertDialogTitle>
              <div className="w-full flex ">
                {/* avatar user */}
                <img
                  src={
                    blogDetail?.user.avatar === null
                      ? "/place-holder.jpg"
                      : imageBaseUrl + blogDetail?.user?.avatar
                  }
                  alt="user avatar"
                  className="object-cover w-[50px] h-[50px] rounded-full border-[1px] border-primary"
                />
                {/* data user */}
                <div className="w-full flex justify-between">
                  {/* user */}
                  <div className="ml-5  ">
                    <p className="text-body">{blogDetail?.user?.name}</p>
                    <p className="text-font_description text-description">
                      {blogDetail?.user?.email}
                    </p>
                  </div>
                  {/* action */}
                  <div className="flex flex-col justify-between">
                    <IoIosCloseCircle
                      onClick={() => setIsOpen(false)}
                      className="text-red-500 h-6 w-6 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </AlertDialogTitle>
            <hr />
            {/* blog detail */}
            <div>
              {/* title */}
              <div className="w-full flex justify-between">
                {/* title blog */}
                <p className="text-title  font-medium">{blogDetail?.title}</p>
                {/* award button */}
                <DropdownMenu
                  open={isDropDownOpen}
                  onOpenChange={setIsDropDownOpen}
                >
                  <DropdownMenuTrigger className="bg-primary px-3 rounded-md h-[40px] text-white">
                    Award
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="flex"></div>
                    <DropdownMenuLabel className="text-accent">
                      Award Type
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setAwardType("best_content");
                      }}
                      className={` cursor-pointer ${
                        awardType === "best_content"
                          ? "bg-accent text-white"
                          : "bg-white"
                      }`}
                    >
                      best_content
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={` cursor-pointer ${
                        awardType === "most_viewed"
                          ? "bg-accent text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setAwardType("most_viewed")}
                    >
                      most_viewed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={` cursor-pointer ${
                        awardType === "most_liked"
                          ? "bg-accent text-white"
                          : "bg-white"
                      }`}
                      onClick={() => setAwardType("most_liked")}
                    >
                      most_liked
                    </DropdownMenuItem>

                    <DropdownMenuLabel className="text-accent">
                      Award Rank
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={`cursor-pointer ${
                        awardRank === "1" ? "bg-accent text-white" : "bg-white"
                      }`}
                      onClick={() => setAwardRank("1")}
                    >
                      1
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`cursor-pointer ${
                        awardRank === "2" ? "bg-accent text-white" : "bg-white"
                      }`}
                      onClick={() => setAwardRank("2")}
                    >
                      2
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`cursor-pointer ${
                        awardRank === "3" ? "bg-accent text-white" : "bg-white"
                      }`}
                      onClick={() => setAwardRank("3")}
                    >
                      3
                    </DropdownMenuItem>
                    <button
                      onClick={() => {
                        handleBlogAward(row.original.uuid);
                        setIsDropDownOpen(false);
                      }}
                      className="w-full px-3 py-1 bg-primary text-white rounded-md my-2"
                    >
                      Submit
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* publisted at  */}
              {blogDetail?.published_at && (
                <p className="text-font_description my-3 text-description">
                  Published At {" : "}
                  {blogDetail.published_at.match(/^\d{4}-\d{2}-\d{2}/)?.[0]}
                </p>
              )}
              {/* image content */}
              {blogDetail?.image && (
                <img
                  src={imageBaseUrl + blogDetail.image}
                  alt="blog image"
                  className="object-cover my-3 w-full h-[200px]"
                />
              )}

              {/* content */}
              <p className="text-font_description my-5">
                {blogDetail?.content}
              </p>
              {/* youtube video */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {blogDetail?.youtube_videos?.map(
                  (url: string, index: number) => {
                    const thumbnail = getYouTubeThumbnail(url, "hq");
                    return thumbnail ? (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition relative"
                      >
                        <img
                          src={thumbnail}
                          alt={`YouTube thumbnail ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md shadow"
                        />
                        <FaPlay className="absolute top-1/2 right-1/2 text-white " />
                      </a>
                    ) : null;
                  }
                )}
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
