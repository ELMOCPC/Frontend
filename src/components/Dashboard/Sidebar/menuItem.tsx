// src/pages/Dashboard/components/Sidebar/MenuItem.tsx
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface MenuItemProps {
  id: string;
  label: string;
  icon: string;
  activeTab: string;
  sidebarOpen: boolean;
  onClick: () => void;
}

const MenuItem = ({
  id,
  label,
  icon,
  activeTab,
  sidebarOpen,
  onClick,
}: MenuItemProps) => {
  const IconComponent = (LucideIcons as any)[icon] as LucideIcon;
  const isActive = activeTab === id;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`sidebar-link${isActive ? " is-active" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      <IconComponent className="icon" aria-hidden="true" />
      {sidebarOpen && <span className="sidebar-label">{label}</span>}
    </button>
  );
};

export default MenuItem;
