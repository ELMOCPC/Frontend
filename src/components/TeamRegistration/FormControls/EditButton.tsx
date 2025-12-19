// src/components/TeamRegistration/FormControls/EditButton.tsx
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const EditButton = ({ onClick, label, disabled = false }: EditButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1 min-w-[80px]"
    >
      <Edit className="w-3 h-3" />
      <span>{label}</span>
    </Button>
  );
};

export default EditButton;
