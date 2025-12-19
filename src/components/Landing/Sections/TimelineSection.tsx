// src/pages/LandingPage/components/Sections/TimelineSection.tsx
import { useState } from "react";
import SectionHeader from "../Common/SectionHeader";
import TimelineItem from "../Common/TimelineItem";

interface TimelineEvent {
  date: string;
  title: string;
  status: "completed" | "active" | "upcoming";
  description?: string;
}

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const timeline: TimelineEvent[] = [
    {
      date: "۱ تا ۵ آذر ۱۴۰۴",
      title: "ثبت نام بوت کمپ",
      status: "completed",
      description: "ثبت‌نام در کارگاه‌های آموزشی آمادگی برای مسابقه",
    },
    {
      date: "۷ آذر ۱۴۰۴",
      title: "شروع ثبت‌نام مسابقه",
      status: "active",
      description: "شروع فرآیند ثبت‌نام برای مسابقه اصلی",
    },
    {
      date: "۱۵ آذر ۱۴۰۴",
      title: "پایان مهلت ثبت‌نام",
      status: "upcoming",
      description: "آخرین فرصت برای ثبت‌نام در مسابقه",
    },
    {
      date: "۱۸ آذر ۱۴۰۴",
      title: "اعلام لیست نهایی تیم‌ها",
      status: "upcoming",
      description: "اعلام اسامی تیم‌های واجد شرایط برای شرکت در مسابقه",
    },
    {
      date: "۲۱ آذر ۱۴۰۴",
      title: "روز برگزاری مسابقه",
      status: "upcoming",
      description: "برگزاری مسابقه در دانشگاه علم و صنعت",
    },
    {
      date: "۲۱ آذر ۱۴۰۴",
      title: "مراسم اختتامیه و اهدای جوایز",
      status: "upcoming",
      description: "مراسم اختتامیه و اهدای جوایز به تیم‌های برتر",
    },
  ];

  const getLineStatus = (currentStatus: string, nextStatus: string) => {
    if (currentStatus === "completed" && nextStatus === "completed") {
      return "completed";
    }
    if (currentStatus === "completed" && nextStatus === "active") {
      return "completed-to-active";
    }
    if (currentStatus === "active" && nextStatus === "upcoming") {
      return "active-to-upcoming";
    }
    if (currentStatus === "completed" && nextStatus === "upcoming") {
      return "completed-to-upcoming";
    }
    return "upcoming";
  };

  return (
    <div
      id="timeline"
      className="py-16 md:py-20 container mx-auto px-4"
      dir="rtl"
    >
      <SectionHeader
        title="برنامه زمانی مسابقه"
        description="از ثبت‌نام تا برگزاری مسابقه و مراسم اختتامیه"
        gradient
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3DDC84] via-[#FFD500] to-[#46BEF6] hidden md:block" />

        {/* Timeline Items */}
        {timeline.map((event, index) => {
          const isLastItem = index === timeline.length - 1;
          const lineStatus = !isLastItem
            ? getLineStatus(event.status, timeline[index + 1].status)
            : null;

          const isActive = activeIndex === index;

          return (
            <TimelineItem
              key={index}
              event={event}
              index={index}
              isLastItem={isLastItem}
              lineStatus={lineStatus}
              isActive={isActive}
              onHover={() => setActiveIndex(index)}
              onLeave={() => setActiveIndex(null)}
            />
          );
        })}
      </div>

      {/* Timeline Legend */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3DDC84]"></div>
          <span className="text-sm text-gray-300">تکمیل شده</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFD500] animate-pulse"></div>
          <span className="text-sm text-gray-300">در جریان</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/30"></div>
          <span className="text-sm text-gray-300">پیش رو</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
