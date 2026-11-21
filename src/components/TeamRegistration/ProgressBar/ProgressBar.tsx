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
    <ol className="steps steps-bar">
      {steps.map((step, index) => {
        const Icon = getStepIcon(index);
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const stateClass = isCompleted
          ? "is-done"
          : isActive
          ? "is-active"
          : "is-upcoming";

        return (
          <li
            key={step.step}
            className={`step ${stateClass}`}
            aria-current={isActive ? "step" : undefined}
          >
            <button
              type="button"
              className="step-dot"
              onClick={() => isCompleted && onStepClick(step.step)}
              disabled={!isCompleted}
              aria-label={step.title}
            >
              <Icon className="icon-sm" aria-hidden="true" />
            </button>
            <span className="step-label">{step.title}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default ProgressBar;
