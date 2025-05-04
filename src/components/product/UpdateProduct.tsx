"use client";
import styles from "@/app/(auth)/login/login.module.css";
import { ProductType } from "@/types/products";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Button } from "../ui/button";
import {
  useGetAllCategoriesQuery,
  useGetCategoryByUuidQuery,
} from "@/redux/service/category";
import { CategoryType, Subcategory } from "@/types/category";
import { useGetAllDiscountQuery } from "@/redux/service/discount";
import { usePostMultiImageMutation } from "@/redux/service/mediaUpload";
import {
  useCreateProductMutation,
  useGetProductByUuidQuery,
  useUpdateProductMutation,
} from "@/redux/service/product";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
export default function UpdateProduct({ uuid }: { uuid: string }) {
  // state to hold the selected category UUID
  const [categoryUuid, setCategoryUuid] = useState<string>("");

  // state open
  const [isOpen, setIsOpen] = React.useState(false);

  //   state loading
  const [isLoading, setIsLoading] = React.useState(false);

  //   get product by uuid

  const { data: productDetail } = useGetProductByUuidQuery({
    uuid: uuid,
  });

  // upload multiple image rtk
  const [uploadMultiFile] = usePostMultiImageMutation();

  // get all category rtk
  const { data: categoryData } = useGetAllCategoriesQuery({});

  // get sub category by category uuid rtk
  const { data: subcategories } = useGetCategoryByUuidQuery({
    pages: 1,
    per_page: 1000,
    uuid: categoryUuid,
  });

  // get all discount rtk
  const { data: discountData } = useGetAllDiscountQuery({
    pages: 1,
    per_page: 1000,
  });

  //   update product

  const [updateProduct] = useUpdateProductMutation();

  //   fomik section
  const initialValues: ProductType = {
    name: productDetail?.data?.name || "",
    description: productDetail?.data?.description || "",
    category_uuid: productDetail?.data?.category_uuid || "",
    subcategory_uuid: productDetail?.data?.subcategory_uuid || "",
    discount_uuid: productDetail?.data?.discount_uuid || "",
    price: productDetail?.data?.price || 0,
    stock: productDetail?.data?.stock || 0,
    is_preorder: productDetail?.data?.is_preorder || false,
    preorder_duration: productDetail?.data?.preorder_duration || 0,
    expiration_date: productDetail?.data?.expiration_date || "",
    multi_images: productDetail?.data?.multi_images || [],
    is_recommended: productDetail?.data?.is_recommended || false,
  };

  const FILE_SIZE = 1024 * 1024 * 2; // 1MB
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category_uuid: Yup.string().required("Category is required"),
    subcategory_uuid: Yup.string(),
    discount_uuid: Yup.string().required("Discount is required"),
    price: Yup.number()
      .min(0, "Price must be positive")
      .required("Price is required"),
    preorder_duration: Yup.number()
      .min(0, "preorder_duration must be positive")
      .required("preorder_duration is required"),
    stock: Yup.number()
      .min(0, "Stock must be positive")
      .required("Stock is required"),
    expiration_date: Yup.string().required("Expiration date is required"),
    multi_images: Yup.array()
      .min(1, "At least one image is required") // Require at least one image
      .of(
        Yup.mixed()
          .test("fileSize", "File too large (max 2MB)", (file: any) => {
            if (!file) return false; // Prevent empty file validation
            return file.size <= FILE_SIZE;
          })
          .test(
            "fileFormat",
            "Unsupported format (JPEG, PNG, GIF only)",
            (file: any) => {
              if (!file) return false;
              return SUPPORTED_FORMATS.includes(file.type);
            }
          )
      )
      .required("Image is required"),
  });

  //   hanlde update product
  const handleSubmit = async (values: ProductType) => {
    setIsLoading(true);
    // Ensure 'multi_images' is an array of File objects
    const responseUploadFile = await uploadMultiFile({
      images: values.multi_images,
    }).unwrap(); // This will handle the successful response

    // Extract uploaded image details from the response
    const multiImage = responseUploadFile?.data?.images;
    const filePaths = multiImage.map((file: any) => file.file_path);
    // Now submit product data along with the uploaded images
    // Check response for success or failure
    const res = await updateProduct({
      uuid: uuid,
      name: values.name,
      description: values.description,
      category_uuid: values.category_uuid,
      discount_uuid: values.discount_uuid,
      subcategory_uuid: values.subcategory_uuid,
      price: values.price,
      stock: values.stock,
      is_preorder: values.is_preorder,
      preorder_duration: values.preorder_duration || 0,
      expiration_date: values.expiration_date,
      multi_images: filePaths, // Use the uploaded image paths
    });
    if (res?.data) {
      setIsLoading(false);
      setIsOpen(false); // Close modal on success
      toast.success("Product Update Successfully", {
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } else {
      setIsLoading(false);
      setIsOpen(false);
      toast.error("Fail to Update Product", {
        style: {
          background: "#bb2124",
          color: "#fff",
        },
      });
    }
  };

  // function for handle get category uuid
  const handleGetUuid = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryUuid = e.target.value;
    setCategoryUuid(selectedCategoryUuid); // Update state with the selected category UUID
  };

  //   for display image from input and
  const CustomInput = ({ field, form, setFieldValue, ...props }: any) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store selected files
    const imageBaseUrl =
      process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder-product.jpg";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const files = event.target.files;

      if (files && files.length > 0) {
        const fileArray = Array.from(files); // Convert FileList to Array

        // Ensure Formik state value is always an array
        const currentFiles = field.value || [];
        const updatedFiles = [...currentFiles, ...fileArray];

        setFieldValue(field.name, updatedFiles);
        setSelectedFiles(updatedFiles);

        // Generate preview URLs
        const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      }
    };

    const handleRemove = (index: number) => {
      // Remove from Formik state
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setFieldValue(field.name, updatedFiles);
      setSelectedFiles(updatedFiles);

      // Remove from previews
      const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedPreviews);
    };

    return (
      <>
        <input type="file" multiple onChange={handleChange} {...props} />

        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`preview ${index}`}
                  className="w-24 h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-0 text-red-500  w-6 h-6 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {productDetail?.data?.images.map((src: any, index: number) => (
              <div key={index} className="relative">
                <img
                  src={imageBaseUrl + src}
                  alt={`preview ${index}`}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <div className="py-2 rounded-[6px] bg-primary text-white px-4 w-auto">
          Update
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className=" h-[90%] overflow-y-auto !bg-white  scrollbar-hide">
        <AlertDialogTitle>
          <p className="text-[30px]  mb-5 text-accent font-medium">
            Update Product
          </p>
          <hr />
        </AlertDialogTitle>
        {/* create product component */}
        <section>
          {/* Content */}
          <div className={`${styles.content}`}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className={`${styles.form} `}>
                  {/* NAME */}
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Product name"
                      className={`${styles.input} !p-3 ${
                        errors.name && touched.name ? styles.inputError : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className={`${
                        styles.input
                      } !p-3  scrollbar-hide h-[150px] ${
                        errors.description && touched.description
                          ? styles.inputError
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* CATEGORY UUID */}
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="category_uuid"
                      className={`${styles.label} `}
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      id="category_uuid"
                      name="category_uuid"
                      className={`${styles.input} !p-3  `}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue(e.target.name, e.target.value);
                        handleGetUuid(e);
                      }}
                    >
                      {categoryData?.data.map(
                        (category: CategoryType, index: number) => (
                          <option key={index} value={category?.uuid}>
                            {category?.name}
                          </option>
                        )
                      )}
                      {/* Insert your category options here */}
                    </Field>
                    <ErrorMessage
                      name="category_uuid"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* SUBCATEGORY UUID */}
                  <div className={styles.formGroup}>
                    <label htmlFor="subcategory_uuid" className={styles.label}>
                      Subcategory
                    </label>
                    <Field
                      as="select"
                      id="subcategory_uuid"
                      name="subcategory_uuid"
                      className={`${styles.input} !p-3`}
                      disabled={
                        !subcategories?.data?.subcategories?.data.length
                      } // Disable if length is 0
                    >
                      {subcategories?.data?.subcategories?.data.length === 0 ? (
                        <option value="" disabled>
                          No subcategory available
                        </option>
                      ) : (
                        subcategories?.data?.subcategories?.data.map(
                          (item: Subcategory, index: number) => (
                            <option key={item.uuid || index} value={item.uuid}>
                              {item.name}
                            </option>
                          )
                        )
                      )}
                    </Field>
                    <ErrorMessage
                      name="subcategory_uuid"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* DISCOUNT UUID */}
                  <div className={styles.formGroup}>
                    <label htmlFor="discount_uuid" className={styles.label}>
                      Discount
                    </label>
                    <Field
                      as="select"
                      id="discount_uuid"
                      name="discount_uuid"
                      className={`${styles.input} !p-3`}
                    >
                      {discountData?.data?.data?.map(
                        (discount: any, index: number) => (
                          <option key={index} value={discount.uuid}>
                            {discount.name}
                          </option>
                        )
                      )}
                    </Field>
                    <ErrorMessage
                      name="discount_uuid"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* PRICE */}
                  <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>
                      Price
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className={`${styles.input} !p-3`}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* STOCK */}
                  <div className={styles.formGroup}>
                    <label htmlFor="stock" className={styles.label}>
                      Stock
                    </label>
                    <Field
                      type="number"
                      id="stock"
                      name="stock"
                      className={`${styles.input} !p-3`}
                    />
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* IS PREORDER */}
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="is_preorder"
                      name="is_preorder"
                      className={`w-4 h-4`} // Bigger checkbox
                    />
                    <label
                      htmlFor="is_preorder"
                      className={`${styles.label} ml-2`}
                    >
                      Is Preorder
                    </label>
                  </div>

                  {/* PREORDER DURATION */}
                  <div className={styles.formGroup}>
                    <label htmlFor="preorder_duration" className={styles.label}>
                      Preorder Duration (days)
                    </label>
                    <Field
                      type="number"
                      id="preorder_duration"
                      name="preorder_duration"
                      className={`${styles.input} !p-3`}
                    />
                    <ErrorMessage
                      name="preorder_duration"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* IS is_recommended */}
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="is_recommended"
                      name="is_recommended"
                      className={`w-4 h-4`} // Bigger checkbox
                    />
                    <label
                      htmlFor="is_recommended"
                      className={`${styles.label} ml-2`}
                    >
                      Is Recommended
                    </label>
                  </div>

                  {/* EXPIRATION DATE */}
                  <div className={styles.formGroup}>
                    <label htmlFor="expiration_date" className={styles.label}>
                      Expiration Date
                    </label>
                    <Field
                      type="date"
                      id="expiration_date"
                      name="expiration_date"
                      className={`${styles.input} !p-3`}
                    />
                    <ErrorMessage
                      name="expiration_date"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  {/* FILE UPLOAD */}
                  {/* Image Upload */}
                  <div>
                    <label
                      htmlFor="multi_images"
                      className="block text-gray-700 font-semibold"
                    >
                      Upload Images
                    </label>
                    <Field
                      id="multi_images"
                      name="multi_images"
                      component={CustomInput}
                      setFieldValue={setFieldValue}
                      multiple
                      className={`w-full py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition duration-300 ${
                        errors.multi_images && touched.multi_images
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="multi_images"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="submit"
                      className={`${styles.submitButton} flex items-center justify-center`}
                      disabled={isLoading} // Disable when loading
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                    <AlertDialogCancel disabled={isLoading}>
                      Cancel
                    </AlertDialogCancel>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </AlertDialogContent>
    </AlertDialog>
  );
}
