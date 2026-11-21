// src/pages/Landing.tsx
import { useCountdown } from "@/hooks/LandingPage/useCountdown";
import { useUserAuth } from "@/hooks/LandingPage/useUserAuth";
import Navbar from "@/components/Landing/Navbar/Navbar";
import HeroSection from "@/components/Landing/HeroSection/HeroSection";
import StatsSection from "@/components/Landing/Sections/StatsSection";
import FeaturesSection from "@/components/Landing/Sections/FeaturesSection";
import PrizesSection from "@/components/Landing/Sections/PrizesSection";
import TimelineSection from "@/components/Landing/Sections/TimelineSection";
import CTASection from "@/components/Landing/Sections/CTASection";
import Footer from "@/components/Custom/Footer";

function ICPCLanding() {
  const countdown = useCountdown(new Date("2025-12-12T08:00:00"));
  const { isLoggedIn, displayName, handleLogout } = useUserAuth();

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div dir="rtl">
      <Navbar
        isLoggedIn={isLoggedIn}
        displayName={displayName}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
        onDashboard={handleDashboardClick}
        onLogout={handleLogout}
        onScrollToSection={scrollToSection}
      />

      <main>
        <HeroSection
          countdown={countdown}
          isLoggedIn={isLoggedIn}
          onLogin={handleLoginClick}
          onRegister={handleRegisterClick}
          onDashboard={handleDashboardClick}
        />

        <StatsSection />
        <FeaturesSection />
        <TimelineSection />
        <PrizesSection />
        <CTASection
          onLogin={handleLoginClick}
          isLoggedIn={isLoggedIn}
          onDashboard={handleDashboardClick}
          onRegister={handleRegisterClick}
          onScrollToRules={() => scrollToSection("rules")}
        />
      </main>

      <Footer />
    </div>
  );
}

export default ICPCLanding;
