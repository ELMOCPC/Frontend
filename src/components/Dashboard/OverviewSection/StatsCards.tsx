// src/pages/Dashboard/components/OverviewSection/StatsCards.tsx
import { Users, Clock, CheckCircle } from "lucide-react";

interface StatsCardsProps {
  teamMembers: number;
  daysLeft: number;
  registrationStatus: {
    text: string;
    color: string;
  };
}

const getStatusVariant = (color: string) => {
  if (color.includes("green")) return "is-accepted";
  if (color.includes("blue")) return "is-submitted";
  if (color.includes("yellow") || color.includes("orange")) return "is-waiting";
  if (color.includes("red")) return "is-rejected";
  return "is-draft";
};

const StatsCards = ({
  teamMembers,
  daysLeft,
  registrationStatus,
}: StatsCardsProps) => {
  return (
    <div className="stats-grid">
      {/* اعضای تیم */}
      <div className="stat-card">
        <span className="stat-icon is-cyan" aria-hidden="true">
          <Users className="icon" />
        </span>
        <p className="stat-value">{teamMembers}</p>
        <p className="stat-label">اعضای تیم</p>
      </div>

      {/* روز تا مسابقه */}
      <div className="stat-card">
        <span className="stat-icon is-yellow" aria-hidden="true">
          <Clock className="icon" />
        </span>
        <p className="stat-value">{daysLeft}</p>
        <p className="stat-label">روز تا مسابقه</p>
      </div>

      {/* وضعیت ثبت‌نام */}
      <div className="stat-card">
        <span className="stat-icon is-green" aria-hidden="true">
          <CheckCircle className="icon" />
        </span>
        <span className={`status-pill ${getStatusVariant(registrationStatus.color)}`}>
          {registrationStatus.text}
        </span>
        <p className="stat-label">وضعیت ثبت‌نام</p>
      </div>
    </div>
  );
};

export default StatsCards;
