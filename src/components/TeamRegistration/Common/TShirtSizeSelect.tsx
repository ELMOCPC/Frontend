// src/pages/TeamRegistration/components/Common/TShirtSizeSelect.tsx
import { Field } from "formik";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const TShirtSizeSelect = () => {
  return (
    <Field name="tshirtSize">
      {({ field, form }: any) => (
        <div className="space-y-2 rtl w-full">
          <label className="text-white text-sm">سایز تیشرت</label>

          <Select
            value={field.value}
            onValueChange={(val) => form.setFieldValue(field.name, val)}
            dir="rtl"
          >
            <SelectTrigger className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-3 rounded-lg">
              <SelectValue placeholder="سایز تیشرت را انتخاب کنید" />
            </SelectTrigger>

            <SelectContent className="rtl">
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
              <SelectItem value="XXL">XXL</SelectItem>
            </SelectContent>
          </Select>

          {form.touched[field.name] && form.errors[field.name] && (
            <p className="text-red-400 text-xs">
              {form.errors[field.name] as string}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default TShirtSizeSelect;
