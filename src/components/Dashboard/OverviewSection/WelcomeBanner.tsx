// src/pages/Dashboard/components/OverviewSection/WelcomeBanner.tsx

interface WelcomeBannerProps {
  name: string;
}

const WelcomeBanner = ({ name }: WelcomeBannerProps) => {
  return (
    <div className="banner">
      <div>
        <h1 className="banner-title">سلام، {name}! 👋</h1>
        <p className="banner-text">
          به داشبورد مسابقات ELMOCPC 2025 خوش آمدید
        </p>
      </div>
      <span className="banner-icon" aria-hidden="true">
        <svg
          className="icon-lg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      </span>
    </div>
  );
};

export default WelcomeBanner;
