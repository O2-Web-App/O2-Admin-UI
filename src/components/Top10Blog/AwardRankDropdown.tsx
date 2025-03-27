import React from "react";
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
import { setAwardRank } from "@/redux/features/awardRank";
import getRankLabel from "./getRankLabel";
export default function AwardRankDropdown({ row }: { row: any }) {
  const dispatch = useAppDispatch();
  const [award, setAward] = useState<string | null>(null);

  useEffect(() => {
    if (award !== null) {
      dispatch(setAwardRank(award));
    }
  }, [award]);
  return (
    <DropdownMenu>
      {row.original.is_awarded === true ? (
        <div className=" text-center rounded-md py-2 ">
          {getRankLabel(row.original.award_rank)}
        </div>
      ) : (
        <DropdownMenuTrigger className="bg-accent px-2 rounded-md h-[40px] text-white">
          {award === null ? "Select Award Rank" : award}
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent>
        <DropdownMenuLabel className="text-accent">
          Award Rank
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`cursor-pointer ${
            row.original.award_rank === "1"
              ? "bg-accent text-white"
              : "bg-white"
          }`}
          onClick={() => setAward("1")}
        >
          1
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-pointer ${
            row.original.award_rank === "2"
              ? "bg-accent text-white"
              : "bg-white"
          }`}
          onClick={() => setAward("2")}
        >
          2
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-pointer ${
            row.original.award_rank === "3"
              ? "bg-accent text-white"
              : "bg-white"
          }`}
          onClick={() => setAward("3")}
        >
          3
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
