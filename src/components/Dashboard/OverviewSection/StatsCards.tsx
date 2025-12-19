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

const StatsCards = ({
  teamMembers,
  daysLeft,
  registrationStatus,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* اعضای تیم */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="p-2 md:p-3 bg-blue-500/20 rounded-lg">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
          </div>
          <span className="text-2xl md:text-3xl font-bold">{teamMembers}</span>
        </div>
        <h3 className="text-gray-300 text-sm md:text-base">اعضای تیم</h3>
      </div>

      {/* روز تا مسابقه */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="p-2 md:p-3 bg-yellow-500/20 rounded-lg">
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
          </div>
          <span className="text-2xl md:text-3xl font-bold">{daysLeft}</span>
        </div>
        <h3 className="text-gray-300 text-sm md:text-base">روز تا مسابقه</h3>
      </div>

      {/* وضعیت ثبت‌نام */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="p-2 md:p-3 bg-green-500/20 rounded-lg">
            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
          </div>
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full ${registrationStatus.color}`}
          >
            {registrationStatus.text}
          </span>
        </div>
        <h3 className="text-gray-300 text-sm md:text-base">وضعیت ثبت‌نام</h3>
      </div>
    </div>
  );
};

export default StatsCards;
