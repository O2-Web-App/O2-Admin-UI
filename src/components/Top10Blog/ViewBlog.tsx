"use client"
import { BlogType } from "@/types/blog";
import React, { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { IoIosCloseCircle, IoMdMore } from "react-icons/io";
import { getYouTubeThumbnail } from "@/lib/utils";
import { FaPlay } from "react-icons/fa";

export default function ViewBlog({row}: {row: any}) {
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
      <AlertDialogContent className="max-w-[600px]">
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
                  className="text-red-500 h-5 w-5 cursor-pointer"
                />
                <IoMdMore className=" h-5 w-5 cursor-pointer" />
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
          </div>
          {blogDetail?.published_at && (
            <p className="text-font_description my-3 text-description">
              Public At :{" "}
              {blogDetail?.published_at?.match(/^\d{4}-\d{2}-\d{2}/)?.[0]}
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
          <p className="text-font_description my-5">{blogDetail?.content}</p>
          {/* youtube video */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {blogDetail?.youtube_videos?.map((url: string, index: number) => {
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
            })}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
