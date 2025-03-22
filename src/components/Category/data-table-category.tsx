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
import { useEffect, useMemo, useState } from "react";
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
import { useGetAllCategoriesQuery } from "@/redux/service/category";
import { CategoryType, Subcategory } from "@/types/category";
import HeaderTable from "../HeaderTable";
import { Pagination } from "../Pagination";
import { Button } from "../ui/button";
import TabCategory from "./TabCategory";
import { useCreateCategoryMutation } from "@/redux/service/category";
import { toast } from "sonner";
export function DataTableCategoryComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [categoryData, setCategoryData] = useState<Subcategory[]>([]);
  const [categoryName, setCategoryName] = useState("");

  // create category
  const [createCategory] = useCreateCategoryMutation();

  // get all categories
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const result = data?.data || [];

  useEffect(() => {
    if (result?.length > 0) {
      const allSubcategories = result.flatMap(
        (item: CategoryType) => item?.subcategories || []
      );
      setCategoryData(allSubcategories);
    }
  }, [result]);

  const table = useReactTable({
    data: categoryData,
    columns: ColumnCategory,

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
  const paginatedData = useMemo(
    () =>
      categoryData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [currentPage, itemsPerPage]
  );

  const handleCreateCategory = async () => {
    if (categoryName.trim() === "")
      toast.error("Category is Require", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });

    try {
      const response = await createCategory({ name: categoryName });
      if (response.data) {
        toast.success("Category create successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed to create category", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong ", {
        style: {
          background: "#bb2124",
        },
      });
    }

    setCategoryName(""); // Clear input after action
  };

  return (
    <section className="w-full flex flex-col">
      <HeaderTable data={[]} title="CATEGORY" />

      <div className="mt-5 ml-6">
        <TabCategory result={result} />
      </div>
      <section className="w-full bg-white p-10 rounded-[6px] dark:backdrop-blur dark:bg-opacity-5 space-y-4">
        <section className="w-full flex flex-col items-center gap-2 lg:flex-row">
          <Input
            placeholder="Search by Subcategory name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full border-[1px] h-[50px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text"
          />
          {/* create Category */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="text-white bg-primary rounded-[6px] h-[50px] px-4 w-auto">
                Create Category
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create Product Category</AlertDialogTitle>
              </AlertDialogHeader>

              {/* 🧾 Input form */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category Name
                </label>
                <Input
                  id="category"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="h-[45px]"
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="text-white bg-primary"
                  onClick={handleCreateCategory}
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
          totalItems={categoryData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </section>
    </section>
  );
}
