// src/pages/Dashboard/components/Sidebar/Sidebar.tsx
import { LogOut } from "lucide-react";
import MenuItem from "./menuItem";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
}: SidebarProps) => {
  const menuItems = [
    { id: "overview", label: "خانه", icon: "User" },
    { id: "team", label: "تیم من", icon: "Users" },
    { id: "schedule", label: "برنامه مسابقات", icon: "Calendar" },
    { id: "notifications", label: "اطلاعیه‌ها", icon: "Bell" },
    { id: "settings", label: "تنظیمات", icon: "Settings" },
  ];

  return (
    <aside className={`sidebar${sidebarOpen ? "" : " is-collapsed"}`}>
      <div className="sidebar-head">
        <div className="wordmark wordmark-sm">
          <span className="wm-elmo">ELMO</span>
          <span className="wm-c1">C</span>
          <span className="wm-p">P</span>
          <span className="wm-c2">C</span>
          <span className="wm-year"> 2025</span>
        </div>
        <p className="sidebar-sub">Dashboard</p>
      </div>

      <nav className="sidebar-nav" aria-label="بخش‌های داشبورد">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            activeTab={activeTab}
            sidebarOpen={sidebarOpen}
            onClick={() => {
              setActiveTab(item.id);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          />
        ))}
      </nav>

      <div className="sidebar-foot">
        <button
          type="button"
          onClick={onLogout}
          className="sidebar-link sidebar-logout"
        >
          <LogOut className="icon" aria-hidden="true" />
          <span className="sidebar-label">خروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
