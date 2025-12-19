// src/pages/LandingPage/components/Navbar/DesktopMenu.tsx
import { Home, Info, Calendar, Trophy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

interface DesktopMenuProps {
  navItems: Array<{ id: string; label: string; action: () => void }>;
  isLoggedIn: boolean;
  displayName: string;
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

const DesktopMenu = ({
  navItems,
  isLoggedIn,
  displayName,
  onLogin,
  onRegister,
  onDashboard,
  onLogout,
}: DesktopMenuProps) => {
  const getIcon = (id: string) => {
    switch (id) {
      case "home":
        return Home;
      case "about":
        return Info;
      case "timeline":
        return Calendar;
      case "rules":
        return Trophy;
      case "contact":
        return Mail;
      default:
        return Home;
    }
  };

  return (
    <>
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = getIcon(item.id);
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-3">
        {isLoggedIn ? (
          <UserDropdown
            displayName={displayName}
            onDashboard={onDashboard}
            onLogout={onLogout}
          />
        ) : (
          <>
            <Button
              onClick={onLogin}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              ورود
            </Button>
            <Button
              onClick={onRegister}
              className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#FFD500]/50"
            >
              ثبت‌نام
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
