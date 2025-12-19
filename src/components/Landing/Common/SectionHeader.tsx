// src/pages/LandingPage/components/Common/SectionHeader.tsx
import { type ReactNode } from "react";

interface SectionHeaderProps {
  badge?: {
    text: string;
    icon: ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
  };
  title: string | ReactNode;
  description: string;
  gradient?: boolean;
}

const SectionHeader = ({
  badge,
  title,
  description,
  gradient = false,
}: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16">
      {badge && (
        <div
          className="inline-block mb-4 px-4 py-2 rounded-full border"
          style={{
            backgroundColor: badge.bgColor,
            borderColor: badge.borderColor,
          }}
        >
          <span
            className="font-semibold flex items-center gap-2"
            style={{ color: badge.color }}
          >
            {badge.icon}
            {badge.text}
          </span>
        </div>
      )}

      <h2
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          gradient
            ? "bg-gradient-to-r from-[#46BEF6] via-[#FFD500] to-[#D7263D] bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {title}
      </h2>

      <p className="text-xl text-gray-300 max-w-2xl mx-auto">{description}</p>
    </div>
  );
};

export default SectionHeader;
