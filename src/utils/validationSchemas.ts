// src/pages/TeamRegistration/utils/validationSchemas.ts
import * as Yup from "yup";

export const teamValidationSchema = Yup.object({
  teamName: Yup.string()
    .min(3, "نام تیم باید حداقل ۳ حرف باشد")
    .max(50, "نام تیم نباید بیشتر از ۵۰ حرف باشد")
    .required("نام تیم الزامی است"),
  teamDescription: Yup.string().max(
    500,
    "توضیحات تیم نباید بیشتر از ۵۰۰ حرف باشد"
  ),
});

export const memberValidationSchema = Yup.object({
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

  university: Yup.string()
    .min(3, "نام دانشگاه باید حداقل ۳ حرف باشد")
    .required("نام دانشگاه الزامی است"),

  nationalCode: Yup.string()
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),

  tshirtSize: Yup.string()
    .oneOf(["M", "L", "XL", "XXL"], "سایز معتبر انتخاب کنید")
    .required("سایز تیشرت الزامی است"),
});