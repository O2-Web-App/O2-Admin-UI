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
import { columnsUser } from "@/components/user/ColumnUsers";

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
import { cn, formatDateToUtcMidnight } from "@/lib/utils";
import {
  useCreateCouponMutation,
  useGetAllCouponQuery,
} from "@/redux/service/coupon";
import { CouponType } from "@/types/coupon";
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
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { Pagination } from "../Pagination";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { columnsCoupon } from "./ColumnCoupon";
export function DataTableCouponComponent() {
  // redux create Coupon
  const [createCoupon] = useCreateCouponMutation();

  // state for Coupon input form
  const [CouponName, setCouponName] = useState("");
  const [couponPercentage, setCouponPercentage] = useState<number>(0);
  const [maxUsage, setMaxUsage] = useState<number>(0);
  const [userLimit, setUserLimit] = useState<number>(0);
  // select data
  const [startedDate, setStartedDate] = useState<Date>();

  // end_date
  const [endDate, setEndDate] = useState<Date>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // get all discount
  const { data: coupon, isLoading } = useGetAllCouponQuery({
    pages: currentPage,
    per_page: itemsPerPage,
  });

  // Use static data instead of API call
  const couponData: CouponType[] = coupon?.data?.data;

  const pagination = coupon?.data.metadata;

  const table = useReactTable({
    data: couponData,
    columns: columnsCoupon,
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
    const ws = XLSX.utils.json_to_sheet(couponData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "coupon");
    XLSX.writeFile(wb, "coupon.xlsx");
  };

  // function create discount
  const handleCreatDiscount = async () => {
    try {
      const response = await createCoupon({
        code: CouponName,
        max_usage: maxUsage,
        user_limit: userLimit,
        discount_percentage: couponPercentage,
        start_date: formatDateToUtcMidnight(startedDate ?? new Date()) || "",
        end_date: formatDateToUtcMidnight(endDate ?? new Date()) || "",
      });
      if (response.data) {
        toast.success("Coupon Create Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Create Coupon ", {
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
          COUPON MANAGEMENT
        </h1>

        <div className="space-x-5 mr-10">
          {/* create Category */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-[6px] bg-primary text-white px-4 w-auto">
                Create Coupon
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create Coupon</AlertDialogTitle>
              </AlertDialogHeader>

              {/* 🧾 Input form */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="CouponCode" className="text-sm font-medium">
                  Coupon Code
                </label>
                <Input
                  id="CouponCode"
                  placeholder="Enter Coupon Code"
                  value={CouponName}
                  onChange={(e) => setCouponName(e.target.value)}
                  className="h-[45px]"
                />
              </div>
              {/* discount description */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="CouponDisPer" className="text-sm font-medium">
                  Coupon Discount Percentage
                </label>
                <Input
                  id="CouponDisPer"
                  placeholder="Enter Discount Coupon"
                  value={couponPercentage}
                  onChange={(e) => setCouponPercentage(Number(e.target.value))}
                  className="h-[45px]"
                />
              </div>
              {/* coupon maxUsage  */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="CouponMaxUsage" className="text-sm font-medium">
                  Coupon MaxUsage
                </label>
                <Input
                  id="CouponMaxUsage"
                  placeholder="Enter Coupon Max Usage"
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(Number(e.target.value))}
                  className="h-[45px]"
                />
              </div>
              {/* coupon user_limit  */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="CouponUserLimit"
                  className="text-sm font-medium"
                >
                  Coupon User Limit
                </label>
                <Input
                  id="CouponUserLimit"
                  placeholder="Enter Coupon User Limit"
                  value={userLimit}
                  onChange={(e) => setUserLimit(Number(e.target.value))}
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
            placeholder="Search by coupon code"
            value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("code")?.setFilterValue(event.target.value)
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
