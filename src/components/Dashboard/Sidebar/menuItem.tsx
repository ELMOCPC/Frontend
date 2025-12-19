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

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === id
          ? "bg-[#FFD500] text-[#00274D]"
          : "hover:bg-white/10 text-white"
      } ${!sidebarOpen && "md:justify-center"}`}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      {sidebarOpen && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );
};

export default MenuItem;
