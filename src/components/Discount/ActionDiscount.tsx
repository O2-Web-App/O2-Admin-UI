"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteDiscountMutation,
  useUpdateDiscountNameMutation,
} from "@/redux/service/discount";
import { usePostImageMutation } from "@/redux/service/mediaUpload";
import { DiscountType } from "@/types/discount";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { toast } from "sonner";
import * as Yup from "yup";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
export default function ActionDiscount({ row }: { row: any }) {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // redux update discount name
  const [updateDiscountName] = useUpdateDiscountNameMutation();

  // redux delete discount
  const [deleteDiscount] = useDeleteDiscountMutation();

  const [isOpen, setIsOpen] = useState(false);

  // rtk upload file
  const [uploadImage] = usePostImageMutation();

  // delete discount
  const handleDeleteDiscount = async (uuid: string) => {
    try {
      const response = await deleteDiscount({ uuid: uuid });
      if (response.data) {
        toast.success("Discount Deleted Successfully", {
          style: {
            background: "#22bb33",
            color: "#fff",
          },
        });
      } else {
        toast.error("Failed To Delete Discount", {
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
  const handleUpdateDiscount = async (value: DiscountType) => {
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

        const res = await updateDiscountName({
          name: value.name,
          description: value.description,
          discount_percentage: value.discount_percentage,
          start_date: value.start_date,
          end_date: value.end_date,
          image: imageUrl,
          uuid: row.original.uuid,
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <IoMdMore className="w-5 h-5 text-gray-500 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex bg-white flex-col space-y-4 w-[100px] p-3">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button className="text-white bg-primary rounded-[6px] py-1 px-4 w-auto">
              Update
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-auto max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Update Discount Name</AlertDialogTitle>
            </AlertDialogHeader>

            {/* 🧾 Input form */}
            <Formik
              initialValues={initValue}
              validationSchema={validationSchema}
              onSubmit={handleUpdateDiscount}
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
        {/* delete disocunt */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="bg-red-500 cursor-pointer text-white px-3 py-2 rounded transition hover:bg-red-500">
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure want to delete {row.original.name} discount?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteDiscount(row.original.uuid ?? "")}
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
