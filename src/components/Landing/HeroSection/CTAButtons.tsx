// src/components/Landing/HeroSection/CTAButtons.tsx
interface CTAButtonsProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
  variant?: "hero" | "section" | "compact";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSecondaryButton?: boolean;
}

const CTAButtons = ({
  isLoggedIn,
  onLogin,
  onRegister,
  onDashboard,
  variant = "hero",
  size = "lg",
  className = "",
  showSecondaryButton = true,
}: CTAButtonsProps) => {
  const sizeClass = size === "lg" ? " btn-lg" : "";
  const gap = variant === "compact" ? "flex gap-2" : "hero-ctas";

  if (isLoggedIn) {
    return (
      <div className={`${gap} ${className}`.trim()}>
        <button
          type="button"
          className={`btn btn-primary${sizeClass}`}
          onClick={onDashboard}
        >
          {variant === "compact" ? "داشبورد" : "مشاهده داشبورد و وضعیت تیم"}
        </button>
      </div>
    );
  }

  return (
    <div className={`${gap} ${className}`.trim()}>
      <button
        type="button"
        className={`btn btn-primary${sizeClass}`}
        onClick={onRegister}
      >
        {variant === "compact" ? "ثبت‌نام" : "ثبت‌نام در مسابقه"}
      </button>
      {showSecondaryButton && (
        <button
          type="button"
          className={`btn btn-secondary${sizeClass}`}
          onClick={onLogin}
        >
          {variant === "compact" ? "ورود" : "ورود به حساب کاربری"}
        </button>
      )}
    </div>
  );
};

export default CTAButtons;
