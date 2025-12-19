// src/pages/LandingPage/components/HeroSection/CTAButtons.tsx
import { Trophy, Sparkles, LogIn, ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const sizeClasses = {
    sm: {
      button: "py-2 px-6 text-sm",
      icon: "w-4 h-4",
    },
    md: {
      button: "py-3 px-8 text-base",
      icon: "w-5 h-5",
    },
    lg: {
      button: "py-4 px-12 text-lg",
      icon: "w-6 h-6",
    },
  };

  const currentSize = sizeClasses[size];

  const getButtonConfig = (type: "primary" | "secondary" | "dashboard") => {
    const config = {
      primary: {
        className:
          "bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold shadow-2xl hover:shadow-[#FFD500]/50",
        icon: variant === "hero" ? Trophy : Sparkles,
        text: {
          hero: "ثبت‌نام در مسابقه",
          section: "شروع ثبت‌نام",
          compact: "ثبت‌نام",
        },
      },
      secondary: {
        className:
          "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white",
        icon: LogIn,
        text: {
          hero: "ورود به حساب کاربری",
          section: "ورود",
          compact: "ورود",
        },
      },
      dashboard: {
        className:
          "bg-gradient-to-r from-[#FFD500] to-[#ffea80] hover:from-[#e6c200] hover:to-[#ffd966] text-[#00274D] font-bold shadow-2xl hover:shadow-[#FFD500]/50",
        icon: Rocket,
        text: {
          hero: "داشبورد و ادامه ی ثبت نام",
          section: "ثبت‌نام نهایی تیم",
          compact: "داشبورد",
        },
      },
    };

    return config[type];
  };

  const renderButton = (
    type: "primary" | "secondary" | "dashboard",
    onClick: () => void
  ) => {
    const config = getButtonConfig(type);
    const Icon = config.icon;
    const buttonText = config.text[variant];

    return (
      <Button
        onClick={onClick}
        className={cn(
          "group relative transition-all duration-300 hover:scale-105",
          config.className,
          currentSize.button,
          className
        )}
      >
        {variant === "hero" ? (
          <>
            <Icon
              className={cn(
                "inline-block ml-2 group-hover:rotate-12 transition-transform",
                currentSize.icon
              )}
            />
            {buttonText}
          </>
        ) : (
          <>
            {buttonText}
            <Icon className={cn("inline-block mr-2", currentSize.icon)} />
            {variant === "section" && (
              <ArrowRight className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            )}
          </>
        )}

        {/* Glow effect for hero variant */}
        {variant === "hero" && type !== "secondary" && (
          <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#FFD500]/30 via-transparent to-[#46BEF6]/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        )}
      </Button>
    );
  };

  if (variant === "compact") {
    return (
      <div className="flex gap-2">
        {isLoggedIn ? (
          renderButton("dashboard", onDashboard)
        ) : (
          <>
            {renderButton("primary", onRegister)}
            {showSecondaryButton && renderButton("secondary", onLogin)}
          </>
        )}
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {renderButton("dashboard", onDashboard)}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {renderButton("primary", onRegister)}
      {showSecondaryButton && renderButton("secondary", onLogin)}
    </div>
  );
};

export default CTAButtons;
