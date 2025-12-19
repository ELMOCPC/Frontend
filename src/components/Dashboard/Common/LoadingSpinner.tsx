// src/pages/Dashboard/components/Common/LoadingSpinner.tsx
import { type ReactNode } from "react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  children?: ReactNode;
}

const LoadingSpinner = ({
  text = "درحال بارگذاری...",
  size = "md",
  fullScreen = false,
  children,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-[#FFD500]/30 border-t-[#FFD500] rounded-full animate-spin mb-3`}
      />
      {text && <p className="text-gray-300">{text}</p>}
      {children}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] flex items-center justify-center text-white">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
