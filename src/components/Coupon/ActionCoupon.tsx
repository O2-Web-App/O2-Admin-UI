"use client";
import {
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/service/coupon";
import { CouponType } from "@/types/coupon";
import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { IoMdMore } from "react-icons/io";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";
import { Button } from "../ui/button";
export default function ActionCoupon({ row }: { row: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // update coupon information
  const [updateCoupon] = useUpdateCouponMutation();

  const initialValues: CouponType = {
    code: row.original.code || "",
    discount_percentage: row.original.discount_percentage || 0,
    max_usage: row.original.max_usage || 0,
    user_limit: row.original.user_limit || 0,
    start_date: row.original.start_date || "",
    end_date: row.original.end_date || "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    discount_percentage: Yup.number()
      .required("Discount Percentage is required")
      .min(0, "Discount Percentage cannot be negative"),

    max_usage: Yup.number()
      .required("Max Usage is required")
      .min(0, "Max Usage cannot be negative"),
    user_limit: Yup.number()
      .required("User Limit is required")
      .min(0, "User Limit cannot be negative"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.string().required("End Date is required"),
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // redux delete coupon
  const [deleteCoupon] = useDeleteCouponMutation();

  // delete discount
  const handleDeleteCoupon = async (uuid: string) => {
    try {
      const response = await deleteCoupon({ uuid: uuid });
      if (response.data) {
        toast.success("Coupon Deleted Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Delete Coupon", {
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

  const handleSubmit = async (values: CouponType) => {
    const formatDateToISO = (dateStr: string) => {
      return new Date(dateStr).toISOString();
    };

    const payload = {
      ...values,
      start_date: formatDateToISO(values.start_date),
      end_date: formatDateToISO(values.end_date),
    };

    // Now send `payload` to your API
    try {
      const response = await updateCoupon({
        uuid: row.original.uuid || "",
        code: payload.code,
        discount_percentage: payload.discount_percentage,
        max_usage: payload.max_usage,
        user_limit: payload.user_limit,
        start_date: payload.start_date,
        end_date: payload.end_date,
      });
      if (response.data) {
        setIsOpen(false);
        toast.success("Coupon  Updated Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        setIsOpen(false);
        toast.error("Failed To Update Coupon ", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      setIsOpen(false);
      toast.success("Something Went Wrong", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-2 bg-transparent hover:bg-gray-100 rounded"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <IoMdMore className="w-5 h-5 text-gray-500 cursor-pointer" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-4 w-[100px] p-3">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button className="text-white bg-primary rounded-[6px] py-1 px-4 w-auto">
              Update
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-accent">
                Update Coupon{" "}
              </AlertDialogTitle>
            </AlertDialogHeader>

            {/* 🧾 Input form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Code */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="code"
                        className="mb-1 font-medium text-gray-700"
                      >
                        Code Name
                      </label>
                      <Field
                        id="code"
                        name="code"
                        placeholder="Code name"
                        className={`p-3 rounded border ${
                          errors.code && touched.code
                            ? "border-red-500"
                            : "border-primary"
                        }`}
                      />
                      <ErrorMessage
                        name="code"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Discount Percentage */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="discount_percentage"
                        className="mb-1 font-medium text-gray-700"
                      >
                        Discount Percentage
                      </label>
                      <Field
                        type="number"
                        id="discount_percentage"
                        name="discount_percentage"
                        placeholder="Discount percentage"
                        className={`p-3 rounded border ${
                          errors.discount_percentage &&
                          touched.discount_percentage
                            ? "border-red-500"
                            : "border-primary"
                        }`}
                      />
                      <ErrorMessage
                        name="discount_percentage"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Max Usage */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="max_usage"
                        className="mb-1 font-medium text-gray-700"
                      >
                        Max Usage
                      </label>
                      <Field
                        type="number"
                        id="max_usage"
                        name="max_usage"
                        placeholder="Max usage"
                        className={`p-3 rounded border ${
                          errors.max_usage && touched.max_usage
                            ? "border-red-500"
                            : "border-primary"
                        }`}
                      />
                      <ErrorMessage
                        name="max_usage"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* User Limit */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="user_limit"
                        className="mb-1 font-medium text-gray-700"
                      >
                        User Limit
                      </label>
                      <Field
                        type="number"
                        id="user_limit"
                        name="user_limit"
                        placeholder="User limit"
                        className={`p-3 rounded border ${
                          errors.user_limit && touched.user_limit
                            ? "border-red-500"
                            : "border-primary"
                        }`}
                      />
                      <ErrorMessage
                        name="user_limit"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

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
        {/* delete disocunt */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="bg-red-500 cursor-pointer rounded-[6px] text-white px-3 py-2  transition hover:bg-red-500">
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure want to delete {row.original.code} discount?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteCoupon(row.original.uuid ?? "")}
                className="text-white"
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
}
