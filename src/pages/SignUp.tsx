import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  type FieldProps,
  type FormikHelpers,
} from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { registerService, verifyOtpSignupService } from "@/services/authService";
import type {
  RegisterPayload,
  RegisterErrorResponse,
  RegisterSuccessResponse,
  VerifyOtpSuccessResponse,
  VerifyOtpErrorResponse,
} from "@/types/authTypes";
import { toast } from "sonner";
import useUserStore from "../store/userStore/userStore";

// Validation schema برای فرم ثبت نام
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "نام باید حداقل ۲ حرف باشد")
    .max(50, "نام نباید بیشتر از ۵۰ حرف باشد")
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط می‌تواند شامل حروف باشد")
    .required("نام الزامی است"),

  familyName: Yup.string()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
    .max(50, "نام خانوادگی نباید بیشتر از ۵۰ حرف باشد")
    .matches(
      /^[\u0600-\u06FFa-zA-Z\s]+$/,
      "نام خانوادگی فقط می‌تواند شامل حروف باشد"
    )
    .required("نام خانوادگی الزامی است"),

  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیل معتبر وارد کنید"
    )
    .required("ایمیل الزامی است"),

  phone: Yup.string()
    .matches(/^09[0-9]{9}$/, "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد")
    .required("شماره موبایل الزامی است"),

  national_code: Yup.string()
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),

  tshirt_size: Yup.string()
    .oneOf(["M", "L", "XL", "XXL"], "سایز معتبر نیست")
    .required("سایز تیشرت الزامی است"),

  university: Yup.string()
    .min(2, "نام دانشگاه باید حداقل ۲ حرف باشد")
    .required("نام دانشگاه الزامی است"),
});

interface SignUpFormValues {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  national_code: string;
  tshirt_size: string;
  university: string;
}

interface UserData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  national_code: string;
  tshirt_size: string;
  university: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const { setAuth } = useUserStore();

  // مرحله ۱: ارسال فرم و درخواست OTP
  const handleSubmit = async (
    values: SignUpFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      const normalizedData: UserData = {
        name: values.name.trim(),
        familyName: values.familyName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        national_code: values.national_code.trim(),
        tshirt_size: values.tshirt_size.trim(),
        university: values.university.trim(),
      };

      const payload: RegisterPayload = {
        first_name: normalizedData.name,
        last_name: normalizedData.familyName,
        email: normalizedData.email,
        phone: normalizedData.phone,
        national_code: normalizedData.national_code,
        tshirt_size: normalizedData.tshirt_size,
        university: normalizedData.university,
      };

      const res: RegisterSuccessResponse = await registerService(payload);
      console.log("register response:", res);

      setUserData(normalizedData);
      toast.success("کد تایید به ایمیل شما ارسال شد!");
      setStep("otp");
    } catch (error: any) {
      console.error("Register error:", error);

      const backend = error?.response?.data as RegisterErrorResponse | undefined;

      if (backend?.status === 409 && backend.messages) {
        if (backend.messages.phone) {
          setFieldError("phone", "شماره موبایل قبلاً ثبت شده است.");
          toast.error("شماره موبایل قبلاً ثبت شده است.");
        }
        if (backend.messages.email) {
          setFieldError("email", "ایمیل قبلاً ثبت شده است.");
          toast.error("ایمیل قبلاً ثبت شده است.");
        }
        if (backend.messages.national_code) {
          setFieldError("national_code", "کد ملی قبلاً ثبت شده است.");
          toast.error("کد ملی قبلاً ثبت شده است.");
        }
        return;
      }

      toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  // مرحله ۲: تایید OTP و گرفتن توکن‌ها
  const handleOtpSubmit = async () => {
    if (!userData) {
      toast.error("اطلاعات کاربر یافت نشد. دوباره تلاش کنید.");
      setStep("form");
      return;
    }

    if (otpValue.length !== 6) return;

    try {
      setOtpLoading(true);

      const res: VerifyOtpSuccessResponse = await verifyOtpSignupService({
        email: userData.email,
        code: otpValue,
      });

      console.log("verify otp response:", res);

      // 🆕 به‌جای localStorage، همه‌چیز رو به استور بده
      // res.data از نوع AuthUserWithTokens هست
      setAuth(res.data);

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      toast.success("حساب کاربری شما با موفقیت ساخته شد!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      const backend = error?.response?.data as VerifyOtpErrorResponse | undefined;

      if (backend?.status === 404) {
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
      if (!userData) return;
      // اینجا می‌تونی API ارسال مجدد OTP رو صدا بزنی
      console.log("Resending OTP to:", userData.email);
      toast.success("کد تایید دوباره به ایمیل شما ارسال شد.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("خطا در ارسال مجدد کد. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="signup-title">
        {step === "form" ? (
          <>
            <header className="form-header">
              <h1 className="form-title" id="signup-title">
                لطفا اطلاعات خود را وارد کنید
              </h1>
            </header>

            <Formik<SignUpFormValues>
              initialValues={{
                name: "",
                familyName: "",
                email: "",
                phone: "",
                national_code: "",
                tshirt_size: "",
                university: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                <Form>
                  <div className="form-stack">
                    <div className="grid">
                      <Field name="name">
                        {({ field, meta }: FieldProps) => {
                          const hasError = Boolean(meta.touched && meta.error);

                          return (
                            <div>
                              <div className="fl">
                                <input
                                  {...field}
                                  className="input fl-control"
                                  id="signup-name"
                                  name="name"
                                  type="text"
                                  placeholder=" "
                                  autoComplete="given-name"
                                  aria-invalid={hasError}
                                  aria-describedby={
                                    hasError ? "signup-name-error" : undefined
                                  }
                                />
                                <label className="fl-label" htmlFor="signup-name">
                                  نام
                                </label>
                              </div>
                              {hasError && (
                                <p
                                  className="field-error"
                                  id="signup-name-error"
                                >
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      </Field>

                      <Field name="familyName">
                        {({ field, meta }: FieldProps) => {
                          const hasError = Boolean(meta.touched && meta.error);

                          return (
                            <div>
                              <div className="fl">
                                <input
                                  {...field}
                                  className="input fl-control"
                                  id="signup-family"
                                  name="familyName"
                                  type="text"
                                  placeholder=" "
                                  autoComplete="family-name"
                                  aria-invalid={hasError}
                                  aria-describedby={
                                    hasError ? "signup-family-error" : undefined
                                  }
                                />
                                <label
                                  className="fl-label"
                                  htmlFor="signup-family"
                                >
                                  نام خانوادگی
                                </label>
                              </div>
                              {hasError && (
                                <p
                                  className="field-error"
                                  id="signup-family-error"
                                >
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      </Field>

                      <Field name="email">
                        {({ field, meta }: FieldProps) => {
                          const hasError = Boolean(meta.touched && meta.error);

                          return (
                            <div>
                              <div className="fl">
                                <input
                                  {...field}
                                  className="input fl-control"
                                  id="signup-email"
                                  name="email"
                                  type="email"
                                  placeholder=" "
                                  autoComplete="email"
                                  dir="ltr"
                                  aria-invalid={hasError}
                                  aria-describedby={
                                    hasError ? "signup-email-error" : undefined
                                  }
                                />
                                <label
                                  className="fl-label"
                                  htmlFor="signup-email"
                                >
                                  ایمیل
                                </label>
                              </div>
                              {hasError && (
                                <p
                                  className="field-error"
                                  id="signup-email-error"
                                >
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      </Field>

                      <Field name="phone">
                        {({ field, meta }: FieldProps) => {
                          const hasError = Boolean(meta.touched && meta.error);

                          return (
                            <div>
                              <div className="fl">
                                <input
                                  {...field}
                                  className="input fl-control"
                                  id="signup-phone"
                                  name="phone"
                                  type="tel"
                                  placeholder=" "
                                  autoComplete="tel"
                                  dir="ltr"
                                  maxLength={11}
                                  aria-invalid={hasError}
                                  aria-describedby={
                                    hasError ? "signup-phone-error" : undefined
                                  }
                                />
                                <label
                                  className="fl-label"
                                  htmlFor="signup-phone"
                                >
                                  شماره موبایل
                                </label>
                              </div>
                              {hasError && (
                                <p
                                  className="field-error"
                                  id="signup-phone-error"
                                >
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      </Field>

                      <Field name="national_code">
                        {({ field, meta }: FieldProps) => {
                          const hasError = Boolean(meta.touched && meta.error);

                          return (
                            <div>
                              <div className="fl">
                                <input
                                  {...field}
                                  className="input fl-control"
                                  id="signup-national-id"
                                  name="national_code"
                                  type="text"
                                  placeholder=" "
                                  dir="ltr"
                                  maxLength={10}
                                  inputMode="numeric"
                                  aria-invalid={hasError}
                                  aria-describedby={
                                    hasError
                                      ? "signup-national-id-error"
                                      : undefined
                                  }
                                />
                                <label
                                  className="fl-label"
                                  htmlFor="signup-national-id"
                                >
                                  کد ملی
                                </label>
                              </div>
                              {hasError && (
                                <p
                                  className="field-error"
                                  id="signup-national-id-error"
                                >
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      </Field>

                      <div>
                        <label className="sr-only" htmlFor="signup-tshirt">
                          سایز تیشرت
                        </label>
                        <span className="select">
                          <select
                            id="signup-tshirt"
                            name="tshirt_size"
                            value={values.tshirt_size}
                            onChange={(e) =>
                              setFieldValue("tshirt_size", e.target.value)
                            }
                            aria-invalid={Boolean(
                              touched.tshirt_size && errors.tshirt_size
                            )}
                            aria-describedby={
                              touched.tshirt_size && errors.tshirt_size
                                ? "signup-tshirt-error"
                                : undefined
                            }
                          >
                            <option value="">
                              سایز تیشرت را انتخاب کنید
                            </option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>
                          <svg
                            className="select-chevron icon-sm"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                        {touched.tshirt_size && errors.tshirt_size && (
                          <p
                            className="field-error"
                            id="signup-tshirt-error"
                          >
                            {errors.tshirt_size as string}
                          </p>
                        )}
                      </div>

                      <Field name="university">
                        {({ field, meta }: FieldProps) => {
                          const hasError = Boolean(meta.touched && meta.error);

                          return (
                            <div>
                              <div className="fl">
                                <input
                                  {...field}
                                  className="input fl-control"
                                  id="signup-university"
                                  name="university"
                                  type="text"
                                  placeholder=" "
                                  aria-invalid={hasError}
                                  aria-describedby={
                                    hasError
                                      ? "signup-university-error"
                                      : undefined
                                  }
                                />
                                <label
                                  className="fl-label"
                                  htmlFor="signup-university"
                                >
                                  دانشگاه
                                </label>
                              </div>
                              {hasError && (
                                <p
                                  className="field-error"
                                  id="signup-university-error"
                                >
                                  {meta.error}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      </Field>
                    </div>

                    <div className="form-actions">
                      <button
                        className="btn btn-yellow btn-lg btn-block"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="form-foot">
              قبلا حساب کاربری داشته‌اید؟{" "}
              <Link className="link" to="/login">
                وارد شوید
              </Link>
            </p>
          </>
        ) : (
          <>
            <header className="form-header">
              <h1 className="form-title" id="signup-title">
                تایید کد ارسال شده
              </h1>
            </header>

            <div className="form-stack">
              <div className="alert alert-info">
                <div>
                  <p className="small">کد تایید به آدرس ایمیل زیر ارسال شد:</p>
                  <p className="text-highlight">{userData?.email}</p>
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
                    setStep("form");
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

export default SignUp;
