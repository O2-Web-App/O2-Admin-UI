"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdMore } from "react-icons/io";
import { Edit, Trash2, Power } from "lucide-react";
import { MdOutlinePreview } from "react-icons/md";
type ActionUserComponentProps = {
  uuid: string;
  status: number;
};

export function ActionUserComponent({
  uuid,
  status,
}: ActionUserComponentProps) {
  const [sta, setSta] = useState(status);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleStatusChange = () => {
    if (sta === 1) {
      setSta(0);
    } else {
      setSta(1);
    }
  };

  const actionText = sta === 1 ? "Disable" : "Enable";
  const actionIcon = <Power className="mr-2" size={16} />;

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
      <PopoverContent className="w-auto">
        <div className="flex flex-col p-2 w-full">
          <div className="text-sm text-gray-600 text-start hover:bg-gray-100 rounded-[6px] flex cursor-pointer items-center p-1">
            <MdOutlinePreview className="mr-2" size={16} />
            <p className="w-[100px] px-1">View</p>
          </div>
          <div
            className={`text-sm text-start hover:bg-gray-100 rounded-[6px] flex cursor-pointer items-center p-1`}
            onClick={handleStatusChange}
          >
            {actionIcon}
            <p className="w-[100px] px-1">{actionText}</p>
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(uuid);
              setIsPopoverOpen(false);
            }}
            className="text-sm text-red-500 text-start hover:bg-gray-100 rounded-[6px] flex cursor-pointer items-center p-1"
          >
            <Trash2 className="mr-2" size={16} />
            <p className="w-[100px] px-1">Delete</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
