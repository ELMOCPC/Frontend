// src/pages/TeamRegistration/components/Steps/MemberInfoStep.tsx
import { Formik, Form, Field, type FieldProps } from "formik";
import { User, ArrowLeft } from "lucide-react";
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

interface TextFieldConfig {
  name: string;
  label: string;
  type?: string;
  dir?: "ltr" | "rtl";
  maxLength?: number;
  autoFocus?: boolean;
}

const textFields: TextFieldConfig[] = [
  { name: "name", label: "نام", type: "text", autoFocus: true },
  { name: "familyName", label: "نام خانوادگی", type: "text" },
  { name: "email", label: "ایمیل", type: "email", dir: "ltr" },
  { name: "phone", label: "شماره موبایل", type: "tel", dir: "ltr", maxLength: 11 },
  { name: "university", label: "نام دانشگاه", type: "text" },
  { name: "nationalCode", label: "کد ملی", type: "text", maxLength: 10 },
];

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
            {textFields.map((config) => {
              const inputId = `member-${memberNumber}-${config.name}`;

              return (
                <Field key={config.name} name={config.name}>
                  {({ field, meta }: FieldProps) => {
                    const hasError = meta.touched && !!meta.error;

                    return (
                      <div>
                        <div className="fl">
                          <input
                            {...field}
                            id={inputId}
                            type={config.type ?? "text"}
                            dir={config.dir}
                            maxLength={config.maxLength}
                            autoFocus={config.autoFocus}
                            placeholder=" "
                            className="input fl-control"
                            aria-invalid={hasError}
                          />
                          <label className="fl-label" htmlFor={inputId}>
                            {config.label}
                          </label>
                        </div>
                        {hasError && (
                          <span className="field-error">
                            {meta.error as string}
                          </span>
                        )}
                      </div>
                    );
                  }}
                </Field>
              );
            })}

            <TShirtSizeSelect />
          </FormLayout>

          <div className="form-actions form-actions-fill">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-ghost btn-lg"
            >
              {memberNumber === 1 ? (
                <>{backButtonText}</>
              ) : (
                <>
                  <ArrowLeft className="icon" aria-hidden="true" />
                  {backButtonText}
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={formSubmitting || isSubmitting}
              className="btn btn-yellow btn-lg"
            >
              {formSubmitting || isSubmitting ? "در حال ذخیره..." : "ذخیره و ادامه"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MemberInfoStep;
