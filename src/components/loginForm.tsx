"use client";
import styles from "@/app/(auth)/login/login.module.css";
import { setAccessToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

export default function LoginForm() {
  const dispatch = useAppDispatch();

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
        `/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (result.user) {
        const access_token = result?.accessToken;
        router.push("/");
        // Store tokens in Redux
        dispatch(setAccessToken(access_token));
      } else {
        setIsLoading(false);
        toast.success("Incorret Email or Password", {
          style: {
            background: "#bb2124",
            color: "white",
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.success("Login Fail", {
        style: {
          background: "#bb2124",
          color: "white",
        },
      });
      console.error("❌ Login Error:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div
        className={styles.backgroundPattern}
        style={{
          backgroundImage: "url('/placeholder.svg?height=200&width=200')",
        }}
      ></div>

      <div className={styles.cardWrapper}>
        {/* Glassmorphic card */}
        <div className={styles.glassmorphicCard}>
          {/* Decorative elements */}
          <div className={styles.greenBlob}></div>
          <div className={styles.blueBlob}></div>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>CamO2 Login</h1>
              <Image
                src={"/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="rounded-full object-cover mx-auto mt-5"
              />
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <div className={styles.inputWrapper}>
                      <div className={styles.iconLeft}>
                        <Mail className="h-5 w-5" />
                      </div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="user@example.com"
                        className={`${styles.input} ${
                          errors.email && touched.email ? styles.inputError : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.formHeader}>
                      <label htmlFor="password" className={styles.label}>
                        Password
                      </label>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.iconLeft}>
                        <Lock className="h-5 w-5" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`${styles.input} ${
                          errors.password && touched.password
                            ? styles.inputError
                            : ""
                        }`}
                      />
                      <div
                        className={styles.iconRight}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full border-t-2 border-text_color_light border-t-transparent"></div>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
