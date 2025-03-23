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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { format } from "date-fns";
import { cn, formatDateToUtcMidnight } from "@/lib/utils";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import {
  useCreateDiscountMutation,
  useGetAllDiscountQuery,
} from "@/redux/service/discount";
import { DiscountType } from "@/types/discount";
import { columnsDiscount } from "./ColumnDiscount";
export function DataTableDiscountComponent() {
  // redux create discount
  const [createDiscount] = useCreateDiscountMutation();

  // state for discount input form
  const [discountName, setDiscountName] = useState("");
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // select data
  const [startedDate, setStartedDate] = useState<Date>();

  // end_date
  const [endDate, setEndDate] = useState<Date>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserProfiles");
    XLSX.writeFile(wb, "user_profiles.xlsx");
  };

  // get all discount
  const { data: disocunt, isLoading } = useGetAllDiscountQuery({});

  // Use static data instead of API call
  const discountData: DiscountType[] = disocunt?.data;

  const table = useReactTable({
    data: discountData,
    columns: columnsDiscount,
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

  // function create discount
  const handleCreatDiscount = async () => {
    try {
      const response = await createDiscount({
        name: discountName,
        description: discountDescription,
        discount_percentage: discountPercentage,
        start_date: formatDateToUtcMidnight(startedDate ?? new Date()) || "",
        end_date: formatDateToUtcMidnight(endDate ?? new Date()) || "",
      });
      if (response.data) {
        toast.success("Discount Create Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Create Discount ", {
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
          DISCOUNT MANAGEMENT
        </h1>

        <div className="space-x-5 mr-10">
          {/* create Category */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-[6px] bg-primary text-white px-4 w-auto">
                Create Discount
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create Discount</AlertDialogTitle>
              </AlertDialogHeader>

              {/* 🧾 Input form */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="discontName" className="text-sm font-medium">
                  Discount Name
                </label>
                <Input
                  id="discontName"
                  placeholder="Enter discont Name"
                  value={discountName}
                  onChange={(e) => setDiscountName(e.target.value)}
                  className="h-[45px]"
                />
              </div>
              {/* discount description */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="DiscountDesc" className="text-sm font-medium">
                  Discount Description
                </label>
                <Input
                  id="DiscountDesc"
                  placeholder="Enter Discount Description"
                  value={discountDescription}
                  onChange={(e) => setDiscountDescription(e.target.value)}
                  className="h-[45px]"
                />
              </div>
              {/* discount discount_percentage */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="DiscountPer" className="text-sm font-medium">
                  Discount Percentage
                </label>
                <Input
                  id="DiscountPer"
                  placeholder="Enter Discount Percentage"
                  value={discountPercentage}
                  onChange={(e) => {
                    const parsed = Number(e.target.value);
                    // Only update if it's a valid number
                    if (!isNaN(parsed)) {
                      setDiscountPercentage(parsed);
                    }
                  }}
                  className="h-[45px]"
                />
              </div>
              {/* started date*/}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal hover:bg-white",
                      !startedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {startedDate ? (
                      format(startedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startedDate}
                    onSelect={setStartedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* edned date*/}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal hover:bg-white",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleCreatDiscount()}
                  className="text-white bg-primary"
                >
                  Create
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* export pdf */}
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
