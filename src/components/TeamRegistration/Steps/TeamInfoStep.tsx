// src/pages/TeamRegistration/components/Steps/TeamInfoStep.tsx
import { Formik, Form } from "formik";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput";
import FormHeader from "../Common/FormHeader";
import * as Yup from "yup";

interface TeamInfoStepProps {
  initialValues: {
    teamName: string;
    teamDescription: string;
  };
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
}

const validationSchema = Yup.object({
  teamName: Yup.string()
    .min(3, "نام تیم باید حداقل ۳ حرف باشد")
    .max(50, "نام تیم نباید بیشتر از ۵۰ حرف باشد")
    .required("نام تیم الزامی است"),
  teamDescription: Yup.string().max(
    500,
    "توضیحات تیم نباید بیشتر از ۵۰۰ حرف باشد"
  ),
});

const TeamInfoStep = ({
  initialValues,
  onSubmit,
  isSubmitting,
}: TeamInfoStepProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting: formSubmitting }) => (
        <Form>
          <FormHeader
            icon={Users}
            title="ثبت‌نام تیم"
            description="نام و توضیحات تیم خود را وارد کنید"
          />

          <div className="space-y-6">
            <CustomInput
              name="teamName"
              type="text"
              label="نام تیم"
              className="w-full px-4 py-3 rounded-lg text-lg"
              autoFocus
            />

            <CustomInput
              name="teamDescription"
              type="text"
              label="توضیحات تیم (اختیاری)"
              className="w-full px-4 py-3 rounded-lg"
            />

            <Button
              type="submit"
              disabled={formSubmitting || isSubmitting}
              className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
            >
              {formSubmitting || isSubmitting ? "در حال ایجاد تیم..." : "ادامه"}
              <ArrowRight className="w-5 h-5 mr-2 inline-block" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TeamInfoStep;
