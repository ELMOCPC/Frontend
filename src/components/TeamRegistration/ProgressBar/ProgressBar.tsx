// src/pages/TeamRegistration/components/ProgressBar/ProgressBar.tsx
import { Award, User, CheckCircle } from "lucide-react";

interface Step {
  title: string;
  step: number;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProgressBar = ({ steps, currentStep, onStepClick }: ProgressBarProps) => {
  const getStepIcon = (index: number) => {
    if (index === 0) return Award;
    if (index === steps.length - 1) return CheckCircle;
    return User;
  };

  return (
    <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-4 md:p-6 mb-6 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const Icon = getStepIcon(index);
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={step.step}
              className="flex flex-col items-center flex-1 relative z-10"
            >
              <button
                onClick={() => isCompleted && onStepClick(step.step)}
                disabled={!isCompleted}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                    : isActive
                    ? "bg-[#FFD500] text-[#00274D]"
                    : "bg-white/20 text-white/50 cursor-default"
                }`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <p className="text-white text-xs mt-2 text-center hidden md:block">
                {step.title}
              </p>

              {/* Step number */}
              {/* <span className="absolute -top-2 -right-2 w-5 h-5 bg-white/30 text-white text-xs rounded-full flex items-center justify-center">
                {index + 1}
              </span> */}
            </div>
          );
        })}

        {/* Connecting lines */}
        {/* <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20 -z-10">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProgressBar;
