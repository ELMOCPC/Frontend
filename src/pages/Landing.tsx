// src/pages/LandingPage/ICPCLanding.tsx
import { useState } from "react";
import { useScrollY } from "@/hooks/LandingPage/useScrollY";
import { useCountdown } from "@/hooks/LandingPage/useCountdown";
import { useUserAuth } from "@/hooks/LandingPage/useUserAuth";
import Navbar from "@/components/Landing/Navbar/Navbar";
import HeroSection from "@/components/Landing/HeroSection/HeroSection";
import StatsSection from "@/components/Landing/Sections/StatsSection";
import FeaturesSection from "@/components/Landing/Sections/FeaturesSection";
import PrizesSection from "@/components/Landing/Sections/PrizesSection";
import RulesSection from "@/components/Landing/Sections/RulesSection";
import TimelineSection from "@/components/Landing/Sections/TimelineSection";
import CTASection from "@/components/Landing/Sections/CTASection";
import Footer from "@/components/Custom/Footer.tsx";

function ICPCLanding() {
  const scrollY = useScrollY();
  const countdown = useCountdown(new Date("2025-12-12T08:00:00"));
  const { isLoggedIn, displayName, handleLogout } = useUserAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRegisterClick = () => {
    window.location.href = "/signup";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleDashboardClick = () => {
    window.location.href = "/dashboard";
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white overflow-x-hidden"
      dir="rtl"
    >
      <Navbar
        scrollY={scrollY}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        displayName={displayName}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
        onDashboard={handleDashboardClick}
        onLogout={handleLogout}
        onScrollToSection={scrollToSection}
      />

      <HeroSection
        countdown={countdown}
        isLoggedIn={isLoggedIn}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
        onDashboard={handleDashboardClick}
      />

      <StatsSection />
      <FeaturesSection />
      <PrizesSection />
      <RulesSection />
      <TimelineSection />
      <CTASection
        onLogin={handleLoginClick}
        isLoggedIn={isLoggedIn}
        onDashboard={handleDashboardClick}
        onRegister={handleRegisterClick}
        onScrollToRules={() => scrollToSection("rules")}
      />

      <Footer />

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 213, 0, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 213, 0, 0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ICPCLanding;
