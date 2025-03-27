"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useConfirmBlogAwardMutation,
  useGetTop10BlogQuery,
} from "@/redux/service/blog";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import * as XLSX from "xlsx";
import { columnsTopBlog } from "@/components/Top10Blog/ColumnTopBlog";
import { TopBlogType } from "@/types/topBlog";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
export function DataTableTopBlogComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(15);

  // get all blog
  const { data: topBlog, isLoading } = useGetTop10BlogQuery({});

  // Use static data instead of API call
  const topBlogData: TopBlogType[] = topBlog?.data;

  const table = useReactTable({
    data: topBlogData,
    columns: columnsTopBlog,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(topBlogData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "discountData");
    XLSX.writeFile(wb, "discountData.xlsx");
  };

  const awardType = useAppSelector((state) => state.awardType.value);
  const awardRank = useAppSelector((state) => state.awardRank.value);
  const awardUuid = useAppSelector((state) => state.awardUuid.value);

  const [confirmAward] = useConfirmBlogAwardMutation();

  const handleConfirmAward = async () => {
    try {
      const response = await confirmAward({
        uuid: awardUuid,
        award_rank: awardRank,
        award_type: awardType,
      });
      if (response.data) {
        toast.success("Confrim Award Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Confrim Award ", {
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
    <section className="w-full flex flex-col">
      <div className="w-full flex justify-between ">
        <h1 className="text-title-color ml-10 text-lg md:text-2xl xl:text-4xl font-bold dark:text-secondary-color-text mb-1 md:mb-2">
          TOP 10 BLOG MANAGEMENT
        </h1>

        <div className="space-x-5 mr-10">
          {/* export pdf */}

          <Button
            onClick={() => handleConfirmAward()}
            className=" rounded-[6px] bg-secondary hover:bg-secondary text-white px-4 w-auto"
          >
            Submit Award
          </Button>
          <Button
            onClick={exportToExcel}
            className=" rounded-[6px] bg-accent hover:bg-accent text-white px-4 w-auto"
          >
            Export Excel
          </Button>
        </div>
      </div>
      <section className="w-full bg-white p-10 rounded-[6px] dark:backdrop-blur dark:bg-opacity-5 space-y-4">
        <section className="w-full flex flex-col items-center gap-2 lg:flex-row">
          <Input
            placeholder="Search by blog title"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-full border-[1px] h-[50px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text"
          />
        </section>
        <div className="rounded-md border">
          {isLoading ? (
            <div className="flex justify-center items-center h-20 text-lg md:text-2xl xl:text-4xl">
              {/* Loading component removed since we're using static data */}
              Loading...
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="hover:bg-gray-100 dark:hover:bg-khotixs-background-dark"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="py-2" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columnsTopBlog.length}
                      className="h-20 text-center text-lg md:text-2xl xl:text-4xl"
                    >
                      <div className="flex w-full justify-center items-center">
                        No results
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        {/* <Pagination
          totalItems={pagination?.total_items} // real total from API
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        /> */}
      </section>
    </section>
  );
}
