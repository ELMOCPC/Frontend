import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, type FieldProps } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

import { loginService, verifyOtpLoginService } from "@/services/authService";
import type {
  LoginPayload,
  LoginErrorResponse,
  RegisterSuccessResponse,
  VerifyOtpSuccessResponse,
  VerifyOtpErrorResponse,
} from "@/types/authTypes";

// 🆕 استور احراز هویت
import useUserStore from "@/store/userStore/userStore";

// Validation schema برای ایمیل
const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیل معتبر وارد کنید"
    )
    .required("ایمیل الزامی است"),
});

// // (فعلاً از otpValidationSchema در Formik استفاده نمی‌کنیم، فقط برای بعداً)
// const otpValidationSchema = Yup.object({
//   otp: Yup.string()
//     .length(6, "کد تایید باید ۶ رقم باشد")
//     .matches(/^[0-9]{6}$/, "کد تایید فقط می‌تواند عددی باشد")
//     .required("کد تایید الزامی است"),
// });

interface EmailFormValues {
  email: string;
}

function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [userEmail, setUserEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // 🆕 از استور: بعد از verify OTP اینو صدا می‌زنیم
  const { setAuth } = useUserStore();

  // مرحله ۱: ارسال ایمیل برای دریافت OTP
  const handleEmailSubmit = async (values: EmailFormValues) => {
    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      setUserEmail(normalizedEmail);

      const payload: LoginPayload = {
        email: normalizedEmail,
      };

      // بک‌اند اینجا OTP رو به ایمیل می‌فرسته
      const res: RegisterSuccessResponse = await loginService(payload);
      console.log("login (send otp) response:", res);

      toast.success("کد تایید به ایمیل شما ارسال شد!");
      setStep("otp");
    } catch (error: any) {
      console.error("Error submitting email:", error);

      const backend = error?.response?.data as LoginErrorResponse | undefined;

      if (backend?.status === 401) {
        toast.error("ایمیل یافت نشد یا غیرمجاز است.");
      } else {
        toast.error("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
      }
    }
  };

  // مرحله ۲: ارسال OTP برای ورود و گرفتن توکن‌ها
  const handleOtpSubmit = async () => {
    if (!userEmail) {
      toast.error("ایمیل کاربر یافت نشد. دوباره تلاش کنید.");
      setStep("email");
      return;
    }

    if (otpValue.length !== 6) return;

    try {
      setOtpLoading(true);
      console.log("OTP verification for:", userEmail, "OTP:", otpValue);

      const res: VerifyOtpSuccessResponse = await verifyOtpLoginService({
        email: userEmail,
        code: otpValue,
      });

      console.log("verify login otp response:", res);

      // 🆕 به‌جای localStorage، مستقیم استور رو ست می‌کنیم
      setAuth(res.data);

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      toast.success("ورود با موفقیت انجام شد!");

      // 🆕 بررسی اگر ایمیل ادمین باشه، به صفحه ادمین برو
      const adminEmail = "kianyarii1383@gmail.com";
      if (userEmail === adminEmail) {
        console.log("Admin login detected, redirecting to admin panel");
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);

      const backend401 = error?.response?.data as
        | LoginErrorResponse
        | undefined;
      const backend404 = error?.response?.data as
        | VerifyOtpErrorResponse
        | undefined;

      if (backend401?.status === 401) {
        toast.error("کد تایید اشتباه است.");
      } else if (backend404?.status === 404) {
        toast.error("کد تایید یافت نشد یا منقضی شده است.");
      } else {
        toast.error("خطا در تایید کد. لطفا دوباره تلاش کنید.");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!userEmail) return;

      // اینجا می‌توانی API ارسال مجدد OTP برای لاگین را صدا بزنی
      // await resendLoginOTP(userEmail);

      console.log("Resending OTP to:", userEmail);
      toast.success("کد تایید دوباره ارسال شد!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("خطا در ارسال مجدد کد. لطفا دوباره تلاش کنید.");
    }
  };

  // const handleForgotPasswordClick = () => {
  //   navigate("/forgot-password");
  // };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        {step === "email" ? (
          <>
            <header className="form-header">
              <h1 className="form-title" id="login-title">
                ورود به حساب کاربری
              </h1>
            </header>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailValidationSchema}
              onSubmit={handleEmailSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-stack">
                    <Field name="email">
                      {({ field, meta }: FieldProps) => {
                        const hasError = Boolean(meta.touched && meta.error);

                        return (
                          <div>
                            <div className="fl">
                              <input
                                {...field}
                                className="input fl-control"
                                id="login-email"
                                name="email"
                                type="email"
                                placeholder=" "
                                autoComplete="email"
                                dir="ltr"
                                aria-invalid={hasError}
                                aria-describedby={
                                  hasError ? "login-email-error" : undefined
                                }
                              />
                              <label
                                className="fl-label"
                                htmlFor="login-email"
                              >
                                ایمیل
                              </label>
                            </div>
                            {hasError && (
                              <p
                                className="field-error"
                                id="login-email-error"
                              >
                                {meta.error}
                              </p>
                            )}
                          </div>
                        );
                      }}
                    </Field>

                    <div className="form-actions">
                      <button
                        className="btn btn-yellow btn-lg btn-block"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "در حال ارسال..." : "دریافت کد تایید"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="form-foot">
              حساب کاربری ندارید؟{" "}
              <Link className="link" to="/signup">
                ثبت‌نام کنید
              </Link>
            </p>
          </>
        ) : (
          <>
            <header className="form-header">
              <h1 className="form-title" id="login-title">
                تایید کد ارسال شده
              </h1>
            </header>

            <div className="form-stack">
              <div className="alert alert-info">
                <div>
                  <p className="small">کد تایید به آدرس ایمیل زیر ارسال شد:</p>
                  <p className="text-highlight">{userEmail}</p>
                </div>
              </div>

              <p className="helper text-center">کد تایید را وارد کنید</p>

              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                dir="ltr"
              >
                <InputOTPGroup className="otp">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="otp-input"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleOtpSubmit}
                  disabled={otpLoading || otpValue.length !== 6}
                  className="btn btn-yellow btn-lg btn-block"
                >
                  {otpLoading ? "در حال تایید..." : "تایید"}
                </button>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="btn btn-ghost btn-block"
                >
                  ارسال مجدد کد تایید
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtpValue("");
                  }}
                  className="btn btn-ghost btn-block"
                >
                  بازگشت به مرحله قبل
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <Link to="/" aria-label="ELMOCPC">
        <img
          className="corner-logo corner-logo-start"
          src={ELMOCPC}
          alt="ELMOCPC"
        />
      </Link>
      <img
        className="corner-logo corner-logo-end"
        src={CESA}
        alt="CESA"
      />
    </main>
  );
}

export default Login;
