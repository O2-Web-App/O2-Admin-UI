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
import { formatDateToUtcMidnight } from "@/lib/utils";
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
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { Pagination } from "../Pagination";
import { columnsCoupon } from "./ColumnCoupon";
import * as Yup from "yup";
import { usePostImageMutation } from "@/redux/service/mediaUpload";
import { ErrorMessage, Field, Form, Formik } from "formik";
export function DataTableCouponComponent() {
  // redux create Coupon
  const [createCoupon] = useCreateCouponMutation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // get all discount
  const { data: coupon, isLoading } = useGetAllCouponQuery({
    page: currentPage,
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

  const [isOpen, setIsOpen] = useState(false);

  // rtk upload file
  const [uploadImage] = usePostImageMutation();

  // formik for creat discount
  const initValue: CouponType = {
    code: "",
    max_usage: 0,
    discount_percentage: 0,
    user_limit: 0,
    start_date: "",
    end_date: "",
    image: "",
  };

  const FILE_SIZE = 1024 * 1024 * 2;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Name is required"),
    discount_percentage: Yup.number()
      .min(0, "Discount percentage must be positive")
      .required("Discount percentage is required"),
    max_usage: Yup.number()
      .min(0, "max_usage must be positive")
      .required("max_usage is required"),
    user_limit: Yup.number()
      .min(0, "user_limit must be positive")
      .required("user_limit is required"),
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
  const handleCreatCoupon = async (value: CouponType) => {
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

        const res = await createCoupon({
          code: value.code,
          max_usage: value.max_usage,
          discount_percentage: value.discount_percentage,
          start_date: value.start_date,
          end_date: value.end_date,
          user_limit: value.user_limit,
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
          COUPON MANAGEMENT
        </h1>

        <div className="space-x-5 mr-10">
          {/* create Category */}
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button className="rounded-[6px] bg-primary text-white px-4 w-auto">
                Create Coupon
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="h-[90%] overflow-y-auto scrollbar-hide">
              <AlertDialogHeader>
                <AlertDialogTitle>Create Coupon</AlertDialogTitle>
              </AlertDialogHeader>

              {/* 🧾 Input form */}
              <Formik
                initialValues={initValue}
                validationSchema={validationSchema}
                onSubmit={handleCreatCoupon}
              >
                {({ setFieldValue, errors, touched }) => (
                  <Form className="space-y-5 ">
                    {/* code */}
                    <div>
                      <label
                        htmlFor="code"
                        className="block text-gray-700 font-semibold"
                      >
                        Code
                      </label>
                      <Field
                        id="code"
                        name="code"
                        placeholder="Coupon Code"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.code && touched.code
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="code"
                        component="div"
                        className="text-red-500 mt-1 text-sm"
                      />
                    </div>

                    {/* max_usage */}
                    <div>
                      <label
                        htmlFor="max_usage"
                        className="block text-gray-700 font-semibold"
                      >
                        Max Usage
                      </label>
                      <Field
                        type="number"
                        id="max_usage"
                        name="max_usage"
                        placeholder="max_usage"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.max_usage && touched.max_usage
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="max_usage"
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
                    {/* user_limit */}
                    <div>
                      <label
                        htmlFor="user_limit"
                        className="block text-gray-700 font-semibold"
                      >
                        User Limit
                      </label>
                      <Field
                        type="number"
                        id="user_limit"
                        name="user_limit"
                        placeholder="User Limit"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.discount_percentage &&
                          touched.discount_percentage
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="user_limit"
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
