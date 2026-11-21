// src/pages/TeamRegistration/components/Common/FormLayout.tsx
import { type ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return <div className="form-grid">{children}</div>;
};

export default FormLayout;
