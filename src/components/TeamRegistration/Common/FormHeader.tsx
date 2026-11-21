// src/pages/TeamRegistration/components/Common/FormHeader.tsx
import { type LucideIcon } from "lucide-react";

interface FormHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FormHeader = ({ icon: Icon, title, description }: FormHeaderProps) => {
  return (
    <header className="form-header">
      <span className="form-icon">
        <Icon className="icon-lg" aria-hidden="true" />
      </span>
      <h1 className="form-title">{title}</h1>
      <p className="form-desc">{description}</p>
    </header>
  );
};

export default FormHeader;
