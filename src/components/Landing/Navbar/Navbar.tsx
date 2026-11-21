// src/components/Landing/Navbar/Navbar.tsx
import { useState } from "react";
import { Home, Info, Calendar, Trophy, Mail } from "lucide-react";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";

interface NavbarProps {
  isLoggedIn: boolean;
  displayName: string;
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
  onLogout: () => void;
  onScrollToSection: (id: string) => void;
}

const NAV_ICONS = {
  home: Home,
  about: Info,
  timeline: Calendar,
  rules: Trophy,
  contact: Mail,
} as const;

const Navbar = ({
  isLoggedIn,
  displayName,
  onLogin,
  onRegister,
  onDashboard,
  onLogout,
  onScrollToSection,
}: NavbarProps) => {
  const [activeId, setActiveId] = useState("home");

  const navItems = [
    { id: "home", label: "خانه" },
    { id: "about", label: "درباره مسابقه" },
    { id: "timeline", label: "جدول زمانی" },
    { id: "rules", label: "قوانین و جوایز" },
    { id: "contact", label: "تماس با ما" },
  ] as const;

  const handleNavClick = (id: string) => {
    setActiveId(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onScrollToSection(id);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Logo />

        <nav className="nav-links" aria-label="ناوبری اصلی">
          {navItems.map((item) => {
            const Icon = NAV_ICONS[item.id];
            return (
              <a
                key={item.id}
                className={`nav-link${activeId === item.id ? " is-active" : ""}`}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <Icon className="icon icon-sm" aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-auth">
          {isLoggedIn ? (
            <UserDropdown
              displayName={displayName}
              onDashboard={onDashboard}
              onLogout={onLogout}
            />
          ) : (
            <>
              <button type="button" className="btn btn-ghost" onClick={onLogin}>
                ورود
              </button>
              <button type="button" className="btn btn-primary" onClick={onRegister}>
                ثبت‌نام
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
