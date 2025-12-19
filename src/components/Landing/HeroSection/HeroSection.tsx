// src/pages/LandingPage/components/HeroSection/HeroSection.tsx
import { Users, Clock, Award } from "lucide-react";
import cesa from "@/assets/CESA.svg";
// import AnimatedBackground from "./AnimatedBackground";
import CountdownTimer from "./CountdownTimer";
import CTAButtons from "./CTAButtons";

interface HeroSectionProps {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
}

const HeroSection = ({
  countdown,
  isLoggedIn,
  onLogin,
  onRegister,
  onDashboard,
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* <AnimatedBackground /> */}

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-block p-4">
            <img src={cesa} alt="ELMOCPC Logo" className="h-16 md:h-20" />
          </div>
        </div>

        {/* Title */}
        <div className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-[#ffffff]">ELMO</span>
          <span className="text-[#46BEF6]">C</span>
          <span className="text-[#D7263D]">P</span>
          <span className="text-[#FFD500]">C</span>
          <span className="text-white"> 2025</span>
        </div>

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-4 text-gray-200 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و صنعت
        </p>

        <p
          className="text-lg md:text-xl mb-8 text-[#FFD500] animate-slide-up font-semibold"
          style={{ animationDelay: "0.3s" }}
        >
          🏆 اولین دوره حضوری - فرصت استثنایی برای رقابت و یادگیری
        </p>

        {/* Countdown Timer */}
        <div
          className="mb-12 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CountdownTimer countdown={countdown} />
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <CTAButtons
            isLoggedIn={isLoggedIn}
            onLogin={onLogin}
            onRegister={onRegister}
            onDashboard={onDashboard}
          />
        </div>

        {/* Additional Info */}
        <div
          className="mt-12 animate-slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#46BEF6]" />
              <span>تیم‌های حداکثر ۳ نفره</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFD500]" />
              <span>۵ ساعت رقابت فشرده</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D7263D]" />
              <span>جوایز نقدی و هدیه های دیگر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
