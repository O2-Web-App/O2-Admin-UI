"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useUpdateProfileUserMutation } from "@/redux/service/mediaUpload";
import { useGetCurrentUserQuery } from "@/redux/service/user";
import { Field, Form, Formik } from "formik";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
export function NavUser() {
  const { data } = useGetCurrentUserQuery({});
  const user = data?.data;
  const imageBaseUrl =
    process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder.jpg";
  // state for hold user
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedFilePath] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [updateProfile] = useUpdateProfileUserMutation();

  // formik
  type FormValues = {
    name: string;
    address: string;
    phone_number: string;
    bio: string;
    date_of_birth: string;
  };

  const initialValues: FormValues = {
    name: user?.name || "",
    address: user?.address || "",
    phone_number: user?.phone_number || "",
    bio: user?.bio || "",
    date_of_birth: user?.date_of_birth || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string(),
    address: Yup.string(),
    phone_number: Yup.string(),
    bio: Yup.string(),
    date_of_birth: Yup.string(),
  });

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-between space-x-3">
            <div>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={imageBaseUrl + user?.avatar}
                  alt={user?.name}
                  className="object-cover"
                />
              </Avatar>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <p className="truncate font-semibold">{user?.name}</p>
              <p className="truncate text-xs">{user?.email}</p>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle className="w-full items-center flex flex-col  justify-center">
              <p className="text-title mb-5 ">Admin Information</p>
              <div className="relative w-[110px] h-[110px] cursor-pointer border-4 shadow-lg border-secondary/30 rounded-full flex items-center justify-center">
                {preview || data?.data?.avatar ? (
                  <Image
                    src={
                      preview === null
                        ? "/place-holder.png"
                        : preview ||
                          `${process.env.NEXT_PUBLIC_O2_API_URL}${
                            uploadedFilePath || data?.data?.avatar
                          }`
                    }
                    alt="Profile"
                    width={1000}
                    height={1000}
                    className="w-[90px] h-[90px] rounded-full border border-gray-300 object-cover"
                  />
                ) : (
                  <p className="text-center text-gray-500">Click to upload</p>
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-white/80 rounded-full p-1 shadow cursor-pointer"
                >
                  <Camera className="w-5 h-5 text-secondary" />
                </label>
              </div>
              {/* form to update information */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-2 ">
                    <div>
                      <label className="text-font_description text-description">
                        Name
                      </label>
                      <Field
                        values={user?.name}
                        placeholder={user?.name || "Name"}
                        name="name"
                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-font_description text-description">
                        Address
                      </label>
                      <Field
                        values={user?.address}
                        placeholder={user?.address || "Address"}
                        name="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
                      />
                      {errors.address && touched.address && (
                        <div className="text-red-500 text-sm">
                          {errors.address}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-font_description text-description">
                        Phone Number
                      </label>
                      <Field
                        values={user?.phone_number}
                        placeholder={user?.phone_number || "Phone Number"}
                        name="phone_number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
                      />
                      {errors.phone_number && touched.phone_number && (
                        <div className="text-red-500 text-sm">
                          {errors.phone_number}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-font_description text-description">
                        Bio
                      </label>
                      <Field
                        as="textarea"
                        values={user?.bio}
                        placeholder={user?.bio || "Write something about you"}
                        name="bio"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
                      />
                      {errors.bio && touched.bio && (
                        <div className="text-red-500 text-sm">{errors.bio}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-font_description text-description">
                        Dob
                      </label>
                      <Field
                        placeholder={user?.date_of_birth || "yyyy-mm-dd"}
                        name="date_of_birth"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
                      />
                      {errors.date_of_birth && touched.date_of_birth && (
                        <div className="text-red-500 text-sm">
                          {errors.date_of_birth}
                        </div>
                      )}
                    </div>
                    {/* button */}
                    <div className="flex w-full justify-end items-end space-x-5 py-3">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Change Password
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
