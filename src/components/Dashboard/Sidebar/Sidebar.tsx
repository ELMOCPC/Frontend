// src/pages/Dashboard/components/Sidebar/Sidebar.tsx
import { Trophy, LogOut } from "lucide-react";
import MenuItem from "./menuItem";
import { Button } from "@/components/ui/button";

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
  onLogout 
}: SidebarProps) => {
  const menuItems = [
    { id: "overview", label: "خانه", icon: "User" },
    { id: "team", label: "تیم من", icon: "Users" },
    { id: "schedule", label: "برنامه مسابقات", icon: "Calendar" },
    { id: "notifications", label: "اطلاعیه‌ها", icon: "Bell" },
    { id: "settings", label: "تنظیمات", icon: "Settings" },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full bg-[#00274D]/95 backdrop-blur-md border-l border-white/10 transition-all duration-300 z-50 overflow-y-auto ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        <div className={`p-6 ${!sidebarOpen && "hidden md:block"}`}>
          {/* Logo */}
          <div className={`flex items-center gap-3 mb-8 ${!sidebarOpen && "md:justify-center"}`}>
            <div className="p-2 bg-[#FFD500]/20 rounded-lg">
              <Trophy className="w-6 h-6 text-[#FFD500]" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-bold">
                  <span className="text-[#ffffff]">ELMO</span>
                  <span className="text-[#46BEF6]">C</span>
                  <span className="text-[#D7263D]">P</span>
                  <span className="text-[#FFD500]">C</span>
                  <span className="text-white"> 2025</span>
                </h2>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <nav className="space-y-2 mb-8">
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

          {/* Logout Button */}
          <Button
            onClick={onLogout}
            className={`w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 ${
              !sidebarOpen && "md:px-2"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="mr-2">خروج</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;