// src/pages/TeamRegistration/components/Common/TShirtSizeSelect.tsx
import { Field, type FieldProps } from "formik";

const TShirtSizeSelect = () => {
  return (
    <Field name="tshirtSize">
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && !!meta.error;

        return (
          <div className="field">
            <label className="label" htmlFor="member-tshirt-size">
              سایز تیشرت
            </label>

            <span className="select">
              <select
                {...field}
                value={field.value ?? ""}
                id="member-tshirt-size"
                aria-invalid={hasError}
              >
                <option value="">سایز تیشرت را انتخاب کنید</option>
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

            {hasError && (
              <span className="field-error">{meta.error as string}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default TShirtSizeSelect;
