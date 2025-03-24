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
import { ColumnCategory } from "./ColumnCategory";

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
  useCreateSubCategoryMutation,
  useGetCategoryByUuidQuery,
} from "@/redux/service/category";
import { toast } from "sonner";
import { Pagination } from "../Pagination";
import { Button } from "../ui/button";
export function DataTableCategoryComponent({ uuid }: { uuid: string }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [subCategoryName, setSubCategoryName] = useState("");

  // get all categories
  const { data, isLoading } = useGetCategoryByUuidQuery({
    uuid: uuid,
    pages: currentPage,
    per_page: itemsPerPage,
  });

  const result = data?.data?.subcategories?.data || [];

  const pagination = data?.data?.subcategories?.metadata;

  const table = useReactTable({
    data: result,
    columns: ColumnCategory,
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

  // redux creat sub category
  const [createSubCategory] = useCreateSubCategoryMutation();

  const handleCreateSubCategory = async () => {
    try {
      const response = await createSubCategory({
        name: subCategoryName,
        parent_uuid: uuid,
      });
      if (response.data) {
        toast.success("SubCategory create successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
        setSubCategoryName("");
      } else {
        toast.error("Failed to create SubCategory", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <section className="w-full flex flex-col">
      <section className="w-full bg-white py-10 pr-10 rounded-[6px] dark:backdrop-blur dark:bg-opacity-5 space-y-4">
        <section className="w-full flex flex-col items-center gap-2 lg:flex-row">
          <Input
            placeholder="Search by subcategory name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full border-[1px] h-[50px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text"
          />

          {/* create sub category  */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="text-white bg-primary rounded-[6px] h-[50px] px-4 w-auto">
                Create SubCategory
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create Product SubCategory</AlertDialogTitle>
              </AlertDialogHeader>

              {/* 🧾 Input form */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  SubCategory Name
                </label>
                <Input
                  id="category"
                  placeholder="Enter category name"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  className="h-[45px]"
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSubCategoryName("")}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="text-white bg-primary"
                  onClick={() => handleCreateSubCategory()}
                >
                  Create
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                      colSpan={ColumnCategory.length}
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
