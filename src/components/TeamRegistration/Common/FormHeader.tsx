// src/pages/TeamRegistration/components/Common/FormHeader.tsx
import { type LucideIcon } from "lucide-react";

interface FormHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FormHeader = ({ icon: Icon, title, description }: FormHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-block p-4 bg-[#FFD500]/20 rounded-2xl mb-4">
        <Icon className="w-12 h-12 text-[#FFD500]" />
      </div>
      <h1 className="text-white text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default FormHeader;
