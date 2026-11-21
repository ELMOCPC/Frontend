// src/components/Landing/Navbar/UserDropdown.tsx
import { useState, useRef, useEffect } from "react";
import { Home, LogOut, Settings, Trophy, ChevronDown } from "lucide-react";

interface UserDropdownProps {
  displayName: string;
  onDashboard: () => void;
  onLogout: () => void;
  avatarUrl?: string;
  className?: string;
}

const UserDropdown = ({
  displayName,
  onDashboard,
  onLogout,
  avatarUrl,
  className = "",
}: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const menuItems = [
    { icon: Home, label: "داشبورد", action: onDashboard },
    {
      icon: Trophy,
      label: "تیم من",
      action: () => (window.location.href = "/dashboard?tab=team"),
    },
    {
      icon: Settings,
      label: "تنظیمات",
      action: () => (window.location.href = "/dashboard?tab=settings"),
    },
  ];

  return (
    <div ref={dropdownRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="btn btn-ghost"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {avatarUrl ? (
          <img className="avatar" src={avatarUrl} alt={displayName} />
        ) : (
          <span className="avatar">{getInitials(displayName)}</span>
        )}
        <span className="user-meta">
          <span className="user-name">{displayName}</span>
          <span className="user-role">کاربر فعال</span>
        </span>
        <ChevronDown
          className="icon icon-sm"
          style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="card"
          style={{
            position: "absolute",
            top: "calc(100% + var(--space-2))",
            insetInlineEnd: 0,
            width: "16rem",
            padding: "var(--space-2)",
            zIndex: 60,
          }}
        >
          <div
            className="user-meta"
            style={{ padding: "var(--space-2) var(--space-3)" }}
          >
            <span className="user-name">{displayName}</span>
            <span className="user-role">شرکت‌کننده مسابقه</span>
          </div>
          <hr className="divider" />
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="nav-link"
                style={{ width: "100%" }}
                onClick={() => {
                  item.action();
                  closeDropdown();
                }}
              >
                <Icon className="icon icon-sm" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
          <hr className="divider" />
          <button
            type="button"
            className="nav-link"
            style={{ width: "100%", color: "var(--destructive)" }}
            onClick={() => {
              onLogout();
              closeDropdown();
            }}
          >
            <LogOut className="icon icon-sm" aria-hidden="true" />
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
