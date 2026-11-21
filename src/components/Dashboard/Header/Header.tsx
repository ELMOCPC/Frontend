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
  const role = teamData ? (isCaptain ? "کاپیتان تیم" : "عضو تیم") : "بدون تیم";

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="جمع کردن منوی کناری"
          aria-expanded={sidebarOpen}
        >
          <ChevronLeft
            className={`icon transition-transform${
              sidebarOpen ? " rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="btn btn-ghost"
          onClick={onNavigateHome}
        >
          <svg
            className="icon-sm"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          صفحه اصلی
        </button>

        <div className="topbar-actions">
          <div className="row">
            <span className="avatar" aria-hidden="true">
              {userData.name?.charAt(0)}
            </span>
            <span className="user-meta">
              <span className="user-name">
                {userData.name} {userData.familyName}
              </span>
              <span className="user-role">{role}</span>
            </span>
            <span className="badge badge-success">
              <span className="dot" aria-hidden="true" />
              فعال
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
