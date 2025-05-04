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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useCreateDiscountMutation,
  useGetAllDiscountQuery,
} from "@/redux/service/discount";
import { usePostImageMutation } from "@/redux/service/mediaUpload";
import { DiscountType } from "@/types/discount";
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
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import * as Yup from "yup";
import { Pagination } from "../Pagination";
import { ColumnsDiscount } from "./ColumnDiscount";
export function DataTableDiscountComponent() {
  // redux create discount
  const [createDiscount] = useCreateDiscountMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // rtk upload file
  const [uploadImage] = usePostImageMutation();

  // get all discount
  const { data: disocunt, isLoading } = useGetAllDiscountQuery({
    pages: currentPage,
    per_page: itemsPerPage,
  });

  // Use static data instead of API call
  const discountData: DiscountType[] = disocunt?.data?.data;

  const pagination = disocunt?.data.metadata;

  const table = useReactTable({
    data: discountData,
    columns: ColumnsDiscount,
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
    const ws = XLSX.utils.json_to_sheet(discountData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "discountData");
    XLSX.writeFile(wb, "discountData.xlsx");
  };

  // formik for creat discount
  const initValue: DiscountType = {
    name: "",
    description: "",
    discount_percentage: 0,
    start_date: "",
    end_date: "",
    image: "",
  };

  const FILE_SIZE = 1024 * 1024 * 2;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    discount_percentage: Yup.number()
      .min(0, "discount_percentage must be positive")
      .required("discount_percentage is required"),
    start_date: Yup.string().required("Start Date is required"),
    end_date: Yup.string().required("End Date is required"),
    image: Yup.mixed()
      .test("fileSize", "File too large (max 2MB)", (value: any) => {
        if (!value || typeof value === "string") return true; // Allow empty values (Formik might set as an empty string)
        return value.size <= FILE_SIZE;
      })
      .test(
        "fileFormat",
        "Unsupported Format (JPEG, PNG, GIF only)",
        (value: any) => {
          if (!value || typeof value === "string") return true;
          return SUPPORTED_FORMATS.includes(value.type);
        }
      )
      .required("Image is required"),
  });

  // function create discount
  const handleCreateDiscount = async (value: DiscountType) => {
    const image =
      typeof value.image === "object" &&
      value.image !== null &&
      "name" in value.image
        ? (value.image as File)
        : null;

    try {
      if (image) {
        const response = await uploadImage({ image: image }).unwrap().then();
        const imageUrl = response?.data?.file_path;

        const res = await createDiscount({
          name: value.name,
          description: value.description,
          discount_percentage: value.discount_percentage,
          start_date: value.start_date,
          end_date: value.end_date,
          image: imageUrl,
        });

        if (res.data) {
          setIsOpen(false);
          toast.success("Discount Created Successfully", {
            style: {
              background: "#10B981",
              color: "#fff",
            },
          });
        } else {
          toast.error("Fail to create discount", {
            style: {
              background: "#bb2124",
              color: "#fff",
            },
          });
        }
      } else {
        toast.error("Fail to upload image", {
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
          {/* create Discount */}
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button className="rounded-[6px] bg-primary text-white px-4 w-auto">
                Create Discount
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="h-[90%] overflow-y-auto scrollbar-hide">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-title">
                  Create Discount
                </AlertDialogTitle>
              </AlertDialogHeader>

              <Formik
                initialValues={initValue}
                validationSchema={validationSchema}
                onSubmit={handleCreateDiscount}
              >
                {({ setFieldValue, errors, touched }) => (
                  <Form className="space-y-5 ">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold"
                      >
                        Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        placeholder="Discount name"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-semibold"
                      >
                        Description
                      </label>
                      <Field
                        id="description"
                        name="description"
                        placeholder="Description"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.description && touched.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* Discount Percentage */}
                    <div>
                      <label
                        htmlFor="discount_percentage"
                        className="block text-gray-700 font-semibold"
                      >
                        Discount Percentage
                      </label>
                      <Field
                        type="number"
                        id="discount_percentage"
                        name="discount_percentage"
                        placeholder="Discount percentage"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.discount_percentage &&
                          touched.discount_percentage
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="discount_percentage"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label
                        htmlFor="start_date"
                        className="block text-gray-700 font-semibold"
                      >
                        Start Date
                      </label>
                      <Field
                        type="date"
                        id="start_date"
                        name="start_date"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.start_date && touched.start_date
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="start_date"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label
                        htmlFor="end_date"
                        className="block text-gray-700 font-semibold"
                      >
                        End Date
                      </label>
                      <Field
                        type="date"
                        id="end_date"
                        name="end_date"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.end_date && touched.end_date
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="end_date"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-gray-700 font-semibold"
                      >
                        Upload Image
                      </label>
                      <Field
                        type="file"
                        id="image"
                        name="image"
                        setFieldValue={setFieldValue}
                        component={CustomInput}
                        className={`w-full py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition duration-300 ${
                          errors.image && touched.image
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-5">
                      <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Submit
                      </Button>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </div>
                  </Form>
                )}
              </Formik>
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
            placeholder="Search by discount name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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

const CustomInput = ({ field, form, setFieldValue, ...props }: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // this function is used handle the file selection
  const handleChange = (event: any) => {
    event.preventDefault();
    const file = event.currentTarget.files[0];
    // call setFieldValue and pass the field name and file object to it
    setFieldValue(field.name, file);
    // URL.createObjectURL() converts the selected file into a URL which can be used to display preview of the selected file
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          handleChange(event);
        }}
        {...props}
      />
      {imagePreview && <img src={imagePreview} alt="preview" />}
    </>
  );
};
