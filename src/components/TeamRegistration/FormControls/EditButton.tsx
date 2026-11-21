// src/components/TeamRegistration/FormControls/EditButton.tsx
import type { MouseEvent } from "react";
import { Edit } from "lucide-react";

interface EditButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
}

const EditButton = ({ onClick, label, disabled = false }: EditButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn btn-ghost"
    >
      <Edit className="icon-sm" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
};

export default EditButton;
