// src/pages/LandingPage/components/Navbar/MobileMenu.tsx
import { Menu, X, Home, Info, Calendar, Trophy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  navItems: Array<{ id: string; label: string; action: () => void }>;
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  onToggle,
  navItems,
  isLoggedIn,
  onLogin,
  onRegister,
  onDashboard,
  onLogout,
}: MobileMenuProps) => {
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
      <button
        onClick={onToggle}
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#00274D]/95 backdrop-blur-lg border-b border-white/10 animate-slide-down">
          <div className="py-4 px-4">
            {navItems.map((item) => {
              const Icon = getIcon(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onToggle();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}

            <div className="flex flex-col gap-2 mt-4 px-4">
              {isLoggedIn ? (
                <>
                  <Button
                    onClick={() => {
                      onDashboard();
                      onToggle();
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200"
                  >
                    داشبورد
                  </Button>
                  <Button
                    onClick={() => {
                      onLogout();
                      onToggle();
                    }}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-lg transition-all duration-200"
                  >
                    خروج
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      onLogin();
                      onToggle();
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200"
                  >
                    ورود
                  </Button>
                  <Button
                    onClick={() => {
                      onRegister();
                      onToggle();
                    }}
                    className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 rounded-lg transition-all duration-200"
                  >
                    ثبت‌نام
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
