"use client";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { useGetAllUserQuery } from "@/redux/service/user";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/features/auth/authSlice";
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const {data} = useGetAllUserQuery({});

  console.log(data);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  type FormValues = {
    email: string;
    password: string;
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required(" Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_O2_API_URL}api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();
      console.log("Login API Response:", result);

      if (response.ok && result?.data?.access_token) {
        const { access_token, refresh_token } = result.data;

        console.log("✅ Extracted Access Token:", access_token);

        // Store tokens in Redux
        dispatch(setAccessToken(access_token));

        // Store refresh token in cookies
        document.cookie = `refresh_token=${refresh_token}; path=/; Secure; HttpOnly; SameSite=Strict`;

        // Save in localStorage for persistence
        localStorage.setItem("access_token", access_token);

        // toast({
        //   title: "Login Successful 🎉",
        //   description: "Redirecting to dashboard...",
        //   variant: "success",
        //   duration: 2000,
        // });
      } else {
      }
    } catch (error) {
      // toast({
      //   title: "Login Failed",

      //   variant: "error",
      //   duration: 3000,
      // });
      console.error("❌ Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            {/* email */}
            <label
              htmlFor="email"
              className="text-[14px] text-text_color_light block"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="username@gmail.com"
              className="mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color"
            />
          </div>

          {/* password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-[14px] text-text_color_light block"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1 w-full rounded-md border bg-text_color_dark dark:text-text_color_light px-3 py-3 focus:outline-none focus:right-2 focus:border-primary_color"
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 bg-primary_color text-text_color_light font-semibold flex justify-center rounded-[10px]"
          >
            {isLoading ? (
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
            ) : (
              "Login"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
