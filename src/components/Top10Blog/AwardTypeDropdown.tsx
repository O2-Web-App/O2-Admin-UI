import { setAwardType } from "@/redux/features/awardType";
import { setAwardUuid } from "@/redux/features/awardUuid";
import { useAppDispatch } from "@/redux/hooks";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AwardTypeDropdown = ({ row }: { row: any }) => {
  const [award, setAward] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (award !== null) {
      dispatch(setAwardType(award));
      dispatch(setAwardUuid(row.original.uuid));
    }
  }, [award]);

  if (row.original.is_awarded)
    return (
      <div className="bg-secondary w-[100px] text-center rounded-md py-2 text-white">
        {row.original.award_type}
      </div>
    );

  return (
    <DropdownMenu>
      {row.original.is_awarded === true ? (
        <div className="bg-secondary w-[100px] text-center rounded-md py-2 text-white">
          {row.original.award_type}
        </div>
      ) : (
        <DropdownMenuTrigger className="bg-accent px-2 rounded-md h-[40px] text-white">
          {award === null ? "Select Award Type" : award}
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent>
        <div className="flex"></div>
        <DropdownMenuLabel className="text-accent">
          Select Award Type
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setAward("best_content");
          }}
          className={` cursor-pointer ${
            award === "best_content" ? "bg-accent text-white" : "bg-white"
          }`}
        >
          best_content
        </DropdownMenuItem>
        <DropdownMenuItem
          className={` cursor-pointer ${
            award === "most_viewed" ? "bg-accent text-white" : "bg-white"
          }`}
          onClick={() => setAward("most_viewed")}
        >
          most_viewed
        </DropdownMenuItem>
        <DropdownMenuItem
          className={` cursor-pointer ${
            award === "most_liked" ? "bg-accent text-white" : "bg-white"
          }`}
          onClick={() => setAward("most_liked")}
        >
          most_liked
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AwardTypeDropdown;
