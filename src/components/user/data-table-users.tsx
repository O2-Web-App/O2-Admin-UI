"use client";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columnsUser } from "@/components/user/ColumnUsers";
import { useGetAllUserQuery } from "@/redux/service/user";
import { UserType } from "@/types/users";
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
import { useMemo, useState } from "react";
import HeaderTable from "../HeaderTable";

export function DataTableUserComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // get all user data from api
  const { data: users } = useGetAllUserQuery({
    pages: currentPage,
    per_page: itemsPerPage,
  });

  const pagination = users?.data?.metadata;

  // Use static data instead of API call
  const userData: UserType[] = users?.data?.data || [];

  const isLoading = false;

  const filteredData = useMemo(() => {
    return userData?.filter((item) => {
      const matchStatus =
        selectedStatus === "all" ||
        item.is_blocked.toString() === selectedStatus;

      return matchStatus;
    });
  }, [userData, selectedStatus]);

  const table = useReactTable({
    data: filteredData,
    columns: columnsUser,
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

  return (
    <section className="w-full flex flex-col">
      <HeaderTable data={userData} title="USER" />
      <section className="w-full bg-white p-10 rounded-[6px] dark:backdrop-blur dark:bg-opacity-5 space-y-4">
        <section className="w-full flex flex-col items-center gap-2 lg:flex-row">
          <Input
            placeholder="Search by user name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full border-[1px] h-[50px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text"
          />
          <section className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            <Select onValueChange={setSelectedStatus}>
              <SelectTrigger
                className={`w-full lg:max-w-[250px] h-[50px] border-[1px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 ${
                  selectedStatus === "all"
                    ? "text-gray-400 dark:text-gray-400"
                    : "text-black dark:text-black"
                } dark:backdrop-blur dark:bg-opacity-5 dark:text-secondary-color-text`}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="w-full lg:max-w-[300px] border-[1px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">Disbale</SelectItem>
                <SelectItem value="0">Enable</SelectItem>
              </SelectContent>
            </Select>
          </section>
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
                      colSpan={columnsUser.length}
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
        <Pagination
          totalItems={pagination?.total_items} // real total from API
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </section>
    </section>
  );
}
