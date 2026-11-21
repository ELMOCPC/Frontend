// src/components/Landing/HeroSection/HeroSection.tsx
import { Users, Clock, Award } from "lucide-react";
import elmocpc from "@/assets/ELMOCPC.svg";
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
    <section className="hero" id="home">
      <div className="container hero-inner">
        <img className="hero-logo" src={elmocpc} alt="ELMOCPC Logo" />

        <p className="wordmark wordmark-hero">
          <span className="wm-elmo">ELMO</span>
          <span className="wm-c1">C</span>
          <span className="wm-p">P</span>
          <span className="wm-c2">C</span>
          <span className="wm-year"> 2025</span>
        </p>

        <h1 className="hero-title">
          پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و صنعت
        </h1>
        <p className="hero-highlight">
          🏆 اولین دوره حضوری - فرصت استثنایی برای رقابت و یادگیری
        </p>

        <CountdownTimer countdown={countdown} />

        <CTAButtons
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onRegister={onRegister}
          onDashboard={onDashboard}
          variant="hero"
          size="lg"
        />

        <ul className="chips">
          <li className="chip">
            <Users className="icon icon-sm icon-cyan" aria-hidden="true" />
            تیم‌های حداکثر ۳ نفره
          </li>
          <li className="chip">
            <Clock className="icon icon-sm icon-yellow" aria-hidden="true" />
            ۵ ساعت رقابت فشرده
          </li>
          <li className="chip">
            <Award className="icon icon-sm icon-red" aria-hidden="true" />
            جوایز نقدی و هدیه های دیگر
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;
