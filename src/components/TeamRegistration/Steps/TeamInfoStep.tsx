// src/pages/TeamRegistration/components/Steps/TeamInfoStep.tsx
import { Formik, Form, Field, type FieldProps } from "formik";
import { Users } from "lucide-react";
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

          <div className="form-stack">
            <Field name="teamName">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && !!meta.error;

                return (
                  <div>
                    <div className="fl">
                      <input
                        {...field}
                        id="team-name"
                        type="text"
                        placeholder=" "
                        autoFocus
                        className="input fl-control"
                        aria-invalid={hasError}
                      />
                      <label className="fl-label" htmlFor="team-name">
                        نام تیم
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

            <Field name="teamDescription">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && !!meta.error;

                return (
                  <div>
                    <div className="fl">
                      <textarea
                        {...field}
                        id="team-desc"
                        placeholder=" "
                        className="textarea fl-control"
                        aria-invalid={hasError}
                      />
                      <label className="fl-label" htmlFor="team-desc">
                        توضیحات تیم (اختیاری)
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

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-yellow btn-lg btn-block"
                disabled={formSubmitting || isSubmitting}
              >
                {formSubmitting || isSubmitting ? "در حال ایجاد تیم..." : "ادامه"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TeamInfoStep;
