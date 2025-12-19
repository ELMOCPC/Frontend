// src/pages/LandingPage/components/Navbar/UserDropdown.tsx
import { useState, useRef, useEffect } from "react";
import {
  Home,
  LogOut,
  Settings,
  Trophy,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  displayName: string;
  onDashboard: () => void;
  onLogout: () => void;
  avatarUrl?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  className?: string;
}

const UserDropdown = ({
  displayName,
  onDashboard,
  onLogout,
  avatarUrl,
  showNotifications = false,
  notificationCount = 0,
  className = "",
}: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    onDashboard();
    closeDropdown();
  };

  const handleLogoutClick = () => {
    onLogout();
    closeDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    {
      icon: Home,
      label: "داشبورد",
      action: handleDashboardClick,
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      icon: Trophy,
      label: "تیم من",
      action: () => (window.location.href = "/dashboard?tab=team"),
      color: "text-amber-400 hover:text-amber-300",
    },
    {
      icon: Settings,
      label: "تنظیمات",
      action: () => (window.location.href = "/dashboard?tab=settings"),
      color: "text-gray-400 hover:text-gray-300",
    },
  ];

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group",
          isOpen
            ? "bg-white/20 backdrop-blur-md"
            : "bg-white/10 hover:bg-white/20"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-8 h-8 rounded-full border-2 border-white/30"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD500] to-[#ffea80] flex items-center justify-center text-[#00274D] font-bold text-sm border-2 border-white/30">
              {getInitials(displayName)}
            </div>
          )}

          {/* Online Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#00274D]" />
        </div>

        {/* User Info */}
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium truncate max-w-[120px]">
            {displayName}
          </div>
          <div className="text-xs text-gray-300">کاربر فعال</div>
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />

        {/* Notification Badge */}
        {showNotifications && notificationCount > 0 && (
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full" />
            </div>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute top-full left-0 mt-2 w-64 bg-[#00274D]/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl py-2 z-50 transition-all duration-200 origin-top-right",
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        )}
        style={{
          backdropFilter: "blur(12px)",
        }}
      >
        {/* User Info Section */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-10 h-10 rounded-full border-2 border-white/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD500] to-[#ffea80] flex items-center justify-center text-[#00274D] font-bold text-lg">
                  {getInitials(displayName)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#00274D]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{displayName}</div>
              <div className="text-xs text-gray-300 truncate">
                شرکت‌کننده مسابقه
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-white/10 transition-all duration-200 group"
            >
              <item.icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
              <span className="flex-1 text-white/90 group-hover:text-white">
                {item.label}
              </span>
              {item.label === "تیم من" && (
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                  فعال
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-2 border-white/10" />

        {/* Notifications */}
        {showNotifications && (
          <button className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-white/10 transition-all duration-200 group">
            <Bell className="w-4 h-4 text-purple-400" />
            <span className="flex-1 text-white/90 group-hover:text-white">
              اطلاعیه‌ها
            </span>
            {notificationCount > 0 && (
              <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-red-500/10 transition-all duration-200 group mt-1"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span className="flex-1 text-red-400 group-hover:text-red-300">
            خروج از حساب
          </span>
        </button>

        {/* Footer */}
        <div className="px-4 py-2 text-xs text-gray-400 text-center border-t border-white/10 mt-2">
          ELMOCPC 2025
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
