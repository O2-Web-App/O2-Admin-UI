"use client";
import styles from "@/app/(auth)/login/login.module.css";
import { ProductType } from "@/types/products";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { useGetAllCategoriesQuery } from "@/redux/service/category";
import { CategoryType, Subcategory } from "@/types/category";
import { useGetAllDiscountQuery } from "@/redux/service/discount";
export default function CreateProduct() {
  // get all category

  const { data: categoryData } = useGetAllCategoriesQuery({});

  const { data: discountData } = useGetAllDiscountQuery({
    pages: 1,
    per_page: 1000,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const initialValues: ProductType = {
    name: "",
    description: "",
    category_uuid: "",
    subcategory_uuid: "",
    discount_uuid: "",
    price: 0,
    stock: 0,
    is_preorder: false,
    preorder_duration: null,
    expiration_date: "",
    multi_images: [],
  };

  const FILE_SIZE = 1024 * 1024 * 2; // 1MB
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category_uuid: Yup.string().required("Category is required"),
    subcategory_uuid: Yup.string().required("Subcategory is required"),
    discount_uuid: Yup.string().required("Discount is required"),
    price: Yup.number()
      .min(0, "Price must be positive")
      .required("Price is required"),
    stock: Yup.number()
      .min(0, "Stock must be positive")
      .required("Stock is required"),
    expiration_date: Yup.string().required("Expiration date is required"),

    multi_images: Yup.mixed()
      .test("file size", "One or more files are too large", (value: any) => {
        if (!value || value.length === 0) return false;
        return Array.from(value).every((file: any) => file.size <= FILE_SIZE);
      })
      .test("fileFormat", "Unsupported format", (value: any) => {
        if (!value || value.length === 0) return false;
        return Array.from(value).every((file: any) =>
          SUPPORTED_FORMATS.includes(file.type)
        );
      })
      .required("Please upload at least one image"),
  });

  const handleSubmit = (values: ProductType) => {
    // Submit to API
    console.log(values);
  };

  return (
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
                  className={`${styles.input} !p-3 ${
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
                <label htmlFor="category_uuid" className={`${styles.label} `}>
                  Category
                </label>
                <Field
                  as="select"
                  id="category_uuid"
                  name="category_uuid"
                  className={`${styles.input} !p-3  `}
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
                >
                  {categoryData?.data.map((category: CategoryType) =>
                    category.subcategories.map(
                      (subcategory: Subcategory, index: number) => (
                        <option
                          key={subcategory.uuid || index}
                          value={subcategory.uuid}
                        >
                          {subcategory.name}
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
                  className="w-4 h-4" // Bigger checkbox
                />
                <label htmlFor="is_preorder" className={`${styles.label} ml-2`}>
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
              <div className={styles.formGroup}>
                <label htmlFor="multi_images" className={styles.label}>
                  Upload Images
                </label>
                <input
                  type="file"
                  id="multi_images"
                  name="multi_images"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const newFiles = Array.from(e.currentTarget.files || []);
                    setFieldValue(
                      "multi_images",
                      (prevFiles: FileList | File[] = []) => {
                        const merged = [...Array.from(prevFiles), ...newFiles];

                        // Optional: Remove duplicates based on file.name or file.lastModified
                        const unique = Array.from(
                          new Map(
                            merged.map((file) => [file.name + file.size, file])
                          ).values()
                        );

                        return unique;
                      }
                    );

                    console.log(newFiles)
                  }}
                  className={`${styles.input} !p-3`} // ✅ Ensure consistent styles
                />

                <ErrorMessage
                  name="multi_images"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <Button type="submit" className={styles.submitButton}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
