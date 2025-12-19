// src/pages/TeamRegistration/components/Steps/MemberInfoStep.tsx
import { Formik, Form } from "formik";
import { User, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput";
import TShirtSizeSelect from "../Common/TShirtSizeSelect";
import FormHeader from "../Common/FormHeader";
import FormLayout from "../Common/FormLayout";
import * as Yup from "yup";

interface MemberInfoStepProps {
  memberType: string;
  memberNumber: number;
  initialValues: any;
  onSubmit: (values: any) => void;
  onBack: () => void;
  isSubmitting: boolean;
  backButtonText: string;
}

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

const MemberInfoStep = ({
  memberType,
  memberNumber,
  initialValues,
  onSubmit,
  onBack,
  isSubmitting,
  backButtonText,
}: MemberInfoStepProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting: formSubmitting }) => (
        <Form>
          <FormHeader
            icon={User}
            title={`عضو ${memberType}`}
            description={`لطفا اطلاعات عضو ${memberType} را وارد کنید`}
          />

          <FormLayout>
            <CustomInput
              name="name"
              type="text"
              label="نام"
              className="w-full px-4 py-3 rounded-lg"
              autoFocus
            />

            <CustomInput
              name="familyName"
              type="text"
              label="نام خانوادگی"
              className="w-full px-4 py-3 rounded-lg"
            />

            <CustomInput
              name="email"
              type="email"
              label="ایمیل"
              className="w-full px-4 py-3 rounded-lg"
              dir="ltr"
            />

            <CustomInput
              name="phone"
              type="tel"
              label="شماره موبایل"
              className="w-full px-4 py-3 rounded-lg"
              dir="ltr"
              maxLength={11}
            />

            <CustomInput
              name="university"
              type="text"
              label="نام دانشگاه"
              className="w-full px-4 py-3 rounded-lg"
            />

            <CustomInput
              name="nationalCode"
              type="text"
              label="کد ملی"
              className="w-full px-4 py-3 rounded-lg"
              maxLength={10}
            />

            <TShirtSizeSelect />
          </FormLayout>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              type="button"
              onClick={onBack}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
            >
              {memberNumber === 1 ? (
                <>{backButtonText}</>
              ) : (
                <>
                  <ArrowLeft className="w-5 h-5 ml-2 inline-block" />
                  {backButtonText}
                </>
              )}
            </Button>

            <Button
              type="submit"
              disabled={formSubmitting || isSubmitting}
              className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
            >
              {formSubmitting || isSubmitting
                ? "در حال ذخیره..."
                : "ذخیره و ادامه"}
              <ArrowRight className="w-5 h-5 mr-2 inline-block" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MemberInfoStep;
