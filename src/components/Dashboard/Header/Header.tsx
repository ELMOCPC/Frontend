// src/pages/Dashboard/components/Header/Header.tsx
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  userData: {
    name: string;
    familyName: string;
  };
  teamData: any;
  isCaptain: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onNavigateHome: () => void;
}

const Header = ({
  userData,
  teamData,
  isCaptain,
  sidebarOpen,
  setSidebarOpen,
  onNavigateHome,
}: HeaderProps) => {
  return (
    <header className="bg-[#00274D]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <ChevronLeft
              className={`w-6 h-6 transition-transform duration-300 ${
                sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <button
            onClick={onNavigateHome}
            className="hidden md:inline-block px-4 py-2 text-sm font-medium bg-[#FFD500] text-[#00274D] rounded-lg hover:bg-[#ffea80] transition-all duration-200"
          >
            صفحه اصلی
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFD500] to-[#ffea80] text-[#00274D] font-bold text-lg shadow-md">
              {userData.name?.charAt(0)}
              {userData.familyName?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                {userData.name} {userData.familyName}
              </span>
              <span className="text-[11px] text-gray-300">
                {teamData
                  ? isCaptain
                    ? "کاپیتان تیم"
                    : "عضو تیم"
                  : "بدون تیم"}
              </span>
            </div>
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              فعال
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
