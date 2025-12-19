// src/pages/LandingPage/components/Navbar/Navbar.tsx
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  scrollY: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  displayName: string;
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
  onLogout: () => void;
  onScrollToSection: (id: string) => void;
}

const Navbar = ({
  scrollY,
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoggedIn,
  displayName,
  onLogin,
  onRegister,
  onDashboard,
  onLogout,
  onScrollToSection,
}: NavbarProps) => {
  const navItems = [
    {
      id: "home",
      label: "خانه",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "about",
      label: "درباره مسابقه",
      action: () => onScrollToSection("about"),
    },
    {
      id: "timeline",
      label: "جدول زمانی",
      action: () => onScrollToSection("timeline"),
    },
    {
      id: "rules",
      label: "قوانین و جوایز",
      action: () => onScrollToSection("rules"),
    },
    {
      id: "contact",
      label: "تماس با ما",
      action: () => onScrollToSection("contact"),
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrollY > 50
            ? "bg-[#00274D]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl"
            : "bg-[#00274D]/90 md:bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <DesktopMenu
            navItems={navItems}
            isLoggedIn={isLoggedIn}
            displayName={displayName}
            onLogin={onLogin}
            onRegister={onRegister}
            onDashboard={onDashboard}
            onLogout={onLogout}
          />

          <MobileMenu
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            navItems={navItems}
            isLoggedIn={isLoggedIn}
            onLogin={onLogin}
            onRegister={onRegister}
            onDashboard={onDashboard}
            onLogout={onLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
