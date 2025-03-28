"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetOrderByWeeklyQuery } from "@/redux/service/order";
import { OrderType } from "@/types/order";
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
import { columnsOrder } from "./ColumnOrder";

import { Pagination } from "../Pagination";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
export function DataTableOrderComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserProfiles");
    XLSX.writeFile(wb, "user_profiles.xlsx");
  };

  const [filterData, setFilterData] = useState<any>();

  const [isOpen, setIsOpen] = useState(false);

  // data from api
  const { data, isLoading } = useGetOrderByWeeklyQuery({
    page: currentPage,
    per_page: itemsPerPage,
    started_date: filterData?.start_date ?? "2025-03-01",
    end_date: filterData?.end_date ?? "2025-03-28",
  });

  const pagination = data?.data?.metadata;

  const orderData: OrderType[] = data?.data?.data;

  type FormValues = {
    start_date: string;
    end_date: string;
  };

  const initialValues = {
    start_date: "2025-03-01",
    end_date: "2025-03-28",
  };

  const validationSchema = Yup.object().shape({
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
  });
  const table = useReactTable({
    data: orderData,
    columns: columnsOrder,
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

  const handleSubmit = (values: FormValues) => {
    setIsOpen(false);
    setFilterData(values);
  };

  return (
    <section className="w-full flex flex-col">
      <section className="w-full bg-white p-10 rounded-[6px] dark:backdrop-blur dark:bg-opacity-5 space-y-4">
        <div className="flex justify-between items-start sm:items-center gap-4 pr-5">
          <div>
            <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold dark:text-secondary-color-text mb-1 md:mb-2">
              ORDER BY WEEKLY MANAGEMENT
            </h1>
          </div>
          <div className="flex space-x-5">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger>
                <div className="text-center flex justify-center items-center rounded-[6px] h-[40px] bg-primary hover:bg-primary text-white px-4 w-auto">
                  Filter
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle className="w-full items-center text-center">
                  Filter Data By stated_date and end_date
                </AlertDialogTitle>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-6">
                      <div className="space-y-5">
                        {/* Start Date */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="start_date"
                            className="mb-1 font-medium text-gray-700"
                          >
                            Start Date
                          </label>
                          <Field
                            type="date"
                            id="start_date"
                            name="start_date"
                            className={`p-3 rounded border ${
                              errors.start_date && touched.start_date
                                ? "border-red-500"
                                : "border-primary"
                            }`}
                          />
                          <ErrorMessage
                            name="start_date"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="end_date"
                            className="mb-1 font-medium text-gray-700"
                          >
                            End Date
                          </label>
                          <Field
                            type="date"
                            id="end_date"
                            name="end_date"
                            className={`p-3 rounded border ${
                              errors.end_date && touched.end_date
                                ? "border-red-500"
                                : "border-primary"
                            }`}
                          />
                          <ErrorMessage
                            name="end_date"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="w-full flex justify-end items-center">
                        <div className="pt-4 ">
                          <Button
                            type="submit"
                            className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition-all"
                          >
                            Submit
                          </Button>
                        </div>
                        <div className="pt-4 ml-4">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              onClick={exportToExcel}
              className=" rounded-[6px] bg-accent hover:bg-accent text-white px-4 w-auto"
            >
              Export Excel
            </Button>
          </div>
        </div>
        <section className="w-full flex flex-col items-center gap-2 lg:flex-row">
          <Input
            placeholder="Search by order by code"
            value={
              (table.getColumn("order_code")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("order_code")?.setFilterValue(event.target.value)
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
                      colSpan={orderData.length}
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
