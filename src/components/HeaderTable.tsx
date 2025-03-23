"use client";
import React from "react";
import { Button } from "./ui/button";
import * as XLSX from "xlsx";
export default function HeaderTable({
  data,
  title,
}: {
  data: any[];
  title: string;
}) {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserProfiles");
    XLSX.writeFile(wb, "user_profiles.xlsx");
  };
  return (
    <section>
      <div className="flex justify-between items-start sm:items-center gap-4 pr-5">
        <div className="ml-10">
          <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold dark:text-secondary-color-text mb-1 md:mb-2">
            {title} MANAGEMENT
          </h1>
        </div>
        <Button
          onClick={exportToExcel}
          className=" rounded-[6px] bg-accent hover:bg-accent text-white px-4 w-auto"
        >
          Export Excel
        </Button>
      </div>
    </section>
  );
}
