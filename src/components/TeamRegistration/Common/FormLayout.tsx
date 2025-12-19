// src/pages/TeamRegistration/components/Common/FormLayout.tsx
import { type ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6"
      dir="rtl"
    >
      {children}
    </div>
  );
};

export default FormLayout;
