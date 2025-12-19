// src/pages/LandingPage/components/Sections/PrizesSection.tsx
import { Medal, Trophy } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";

const PrizesSection = () => {
  const prizes = [
    {
      rank: "🥇 مقام اول",
      medal: Medal,
      reward: "۱۵,۰۰۰,۰۰۰ تومان",
      color: "from-yellow-500 to-amber-500",
    },
    {
      rank: "🥈 مقام دوم",
      medal: Medal,
      reward: "۱۰,۰۰۰,۰۰۰ تومان",
      color: "from-gray-400 to-gray-300",
    },
    {
      rank: "🥉 مقام سوم",
      medal: Medal,
      reward: "۵,۰۰۰,۰۰۰ تومان",
      color: "from-orange-700 to-orange-600",
    },
    {
      rank: "🏆 تیم‌های برتر",
      medal: Trophy,
      reward: "گواهینامه معتبر + هدایای ویژه",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="py-20 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{
            text: "🎁 جوایز",
            icon: "🎁",
            color: "#FFD500",
            bgColor: "#FFD500/20",
            borderColor: "#FFD500/50",
          }}
          title="جوایز ارزشمند مسابقه"
          description="علاوه بر افتخار و اعتبار، جوایز نقدی و جوایز ویژه در انتظار تیم‌های برتر است"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}
              />
              <prize.medal className="w-12 h-12 mb-4 text-[#FFD500] mx-auto" />
              <h3 className="text-lg font-bold mb-2 text-white text-center">
                {prize.rank}
              </h3>
              <p className="text-gray-300 text-sm text-center">
                {prize.reward}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrizesSection;
