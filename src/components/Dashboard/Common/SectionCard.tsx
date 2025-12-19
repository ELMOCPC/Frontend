// src/pages/Dashboard/components/Common/SectionCard.tsx
import { type ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ children, className = "" }: SectionCardProps) => {
  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionCard;
