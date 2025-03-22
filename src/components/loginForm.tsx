"use client";
import styles from "@/app/(auth)/login/login.module.css";
import { setAccessToken } from "@/redux/features/auth/authSlice";
import { setUser } from "@/redux/features/user";
import { useAppDispatch } from "@/redux/hooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
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
        `${process.env.NEXT_PUBLIC_O2_API_URL}api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();
      dispatch(setUser(result?.data?.user));
      console.log("Login API Response:", result?.data?.user);

      if (response.ok && result?.data?.access_token) {
        const { access_token, refresh_token } = result.data;


        // Store tokens in Redux
        dispatch(setAccessToken(access_token));

        // Store refresh token in cookies
        document.cookie = `refresh_token=${refresh_token}; path=/; Secure; HttpOnly; SameSite=Strict`;

        // Save in localStorage for persistence
        localStorage.setItem("access_token", access_token);
        router.push(`/`);
        toast.success("Login Successfully ", {
          style: {
            background: "#22bb33",
            color: "white",
          },
        });
      } else {
        toast.success("Incorret Email or Password", {
          style: {
            background: "#bb2124",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast.success("Login Fail", {
        style: {
          background: "#bb2124",
          color: "white",
        },
      });
      console.error("❌ Login Error:", error);
    } finally {
      setIsLoading(false);
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
              <h1 className={styles.title}>Admin Login</h1>
              <p className={styles.subtitle}>Sign in to your admin dashboard</p>
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
                        placeholder="admin@example.com"
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
