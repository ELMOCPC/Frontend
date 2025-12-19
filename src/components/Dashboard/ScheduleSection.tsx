// src/pages/Dashboard/components/ScheduleSection.tsx
import { Calendar } from "lucide-react";
import SectionCard from "./Common/SectionCard";

const ScheduleSection = () => {
  const events = [
    {
      title: "ثبت‌نام",
      date: "۱۴۰۴/۰۹/۰۹-۱۴۰۴/۰۹/۱۵",
      status: "active" as const,
    },
    {
      title: " مسابقه",
      date: "۱۴۰۴/۰۹/۲۱ ساعت ۸:۰۰",
      status: "upcoming" as const,
    },
    {
      title: "مراسم اهدای جوایز",
      date: "۱۴۰۴/۰۹/۲۱ ساعت ۱۶:۰۰",
      status: "upcoming" as const,
    },
  ];

  return (
    <SectionCard>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-[#FFD500]" />
        برنامه زمانی مسابقات
      </h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border transition-all duration-200 ${
              event.status === "active"
                ? "bg-[#FFD500]/10 border-[#FFD500]/30"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                <p className="text-gray-400">{event.date}</p>
              </div>
              {event.status === "active" && (
                <span className="bg-[#FFD500] text-[#00274D] px-4 py-2 rounded-full text-sm font-semibold">
                  فعال
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default ScheduleSection;
