// src/components/Landing/Sections/StatsSection.tsx
import { Award, Users, Trophy, Flag } from "lucide-react";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
  color: string;
}

const StatsSection = () => {
  const stats: StatItem[] = [
    {
      icon: Award,
      number: "15+",
      label: "دانشگاه شرکت‌کننده",
      color: "#D7263D",
    },
    {
      icon: Users,
      number: "1200+",
      label: "شرکت‌کننده",
      color: "#46BEF6",
    },
    {
      icon: Trophy,
      number: "5",
      label: "سال تجربه موفق",
      color: "#FFD500",
    },
    {
      icon: Flag,
      number: "200+",
      label: "تیم ثبت‌نام‌شده",
      color: "#3DDC84",
    },
  ];

  return (
    <div className="py-16 md:py-20 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300 group"
              >
                <div className="relative inline-block mb-4">
                  <div
                    className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ backgroundColor: stat.color }}
                  />
                  <Icon
                    className="w-10 h-10 md:w-12 md:h-12 mx-auto relative z-10"
                    // style={{ color: stat.color }}
                  />
                </div>
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
