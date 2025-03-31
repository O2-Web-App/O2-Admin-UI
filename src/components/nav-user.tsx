"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  usePostImageMutation,
  useUpdateProfileUserMutation,
} from "@/redux/service/mediaUpload";
import { useGetCurrentUserQuery } from "@/redux/service/user";
import { Field, Form, Formik } from "formik";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
export function NavUser() {
  const [isOpen, setIsOpen] = useState(false);

  // get current user rtk
  const { data } = useGetCurrentUserQuery({});
  const user = data?.data;

  const imageBaseUrl =
    process.env.NEXT_PUBLIC_O2_API_URL || "/place-holder.jpg";

  // formik
  type FormValues = {
    name: string;
    email: string;
    bio: string;
  };

  const initialValues: FormValues = {
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string(),
    email: Yup.string(),
    bio: Yup.string(),
  });

  // update user rtk
  const [updateProfile] = useUpdateProfileUserMutation();

  // upload image rtk
  const [uploadImage] = usePostImageMutation();

  // state for hold user
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedFilePath] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (image) {
        const uploadImageRes = await uploadImage({ image }).unwrap().then();
        const filePath = uploadImageRes?.data?.file_path;

        if (filePath) {
          const updateProfileRes = await updateProfile({
            name: values.name,
            bio: values.bio,
            avatar: filePath,
          });
          if (updateProfileRes.data) {
            setIsOpen(false);
            toast.success("Profile updated successfully", {
              style: {
                background: "#4caf50",
                color: "#fff",
              },
            });
          } else {
            setIsOpen(false);
            toast.success("Fail to update profile", {
              style: {
                background: "#bb2124",
                color: "#fff",
              },
            });
          }
        }
      } else {
        toast.success("Fail to upload image", {
          style: {
            background: "#bb2124",
            color: "#fff",
          },
        });
      }
    } catch (e) {
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
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
          <AlertDialogContent className="w-[400px]">
            <AlertDialogTitle className="w-full items-center flex flex-col  justify-center">
              <p className="text-title mb-5 ">Admin Information</p>
            </AlertDialogTitle>
            {/* form to update information */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched }) => (
                <Form className="space-y-2 items-center flex flex-col justify-center">
                  {/* profile */}
                  <div className="relative w-[110px] h-[110px] cursor-pointer border-4 shadow-lg border-secondary/30 rounded-full flex items-center justify-center">
                    {preview || imageBaseUrl + user?.avatar ? (
                      <Image
                        src={
                          preview
                            ? preview
                            : user?.avatar
                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${user.avatar}`
                            : "/place-holder.png"
                        }
                        alt="Profile"
                        width={1000}
                        height={1000}
                        className="w-[90px] h-[90px] rounded-full border border-gray-300 object-cover"
                      />
                    ) : (
                      <p className="text-center text-gray-500">
                        Click to upload
                      </p>
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

                  {/* name */}
                  <div className="w-full">
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
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                  </div>

                  {/* email */}
                  <div className="w-full">
                    <label className="text-font_description text-description">
                      Email
                    </label>
                    <Field
                      disabled
                      values={user?.email}
                      placeholder={user?.email || "Email"}
                      name="email"
                      className=" w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>

                  {/* bio */}
                  <div className="w-full">
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

                  <div className="w-full items-end flex justify-end space-x-3">
                    <Button
                      type="submit"
                      className="bg-accent hover:bg-accent text-white px-4 py-2 rounded-lg"
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
