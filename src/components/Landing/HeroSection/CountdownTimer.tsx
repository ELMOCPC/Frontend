// src/pages/LandingPage/components/HeroSection/CountdownTimer.tsx
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const CountdownTimer = ({ countdown }: CountdownTimerProps) => {
  const timeUnits = [
    { value: countdown.days, label: "روز" },
    { value: countdown.hours, label: "ساعت" },
    { value: countdown.minutes, label: "دقیقه" },
    { value: countdown.seconds, label: "ثانیه" },
  ];

  return (
    <>
      <p className="text-sm text-[#FFD500] mb-4 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        زمان باقی‌مانده تا روز مسابقه
      </p>
      <div className="flex justify-center gap-4 flex-wrap" dir="ltr">
        {timeUnits.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[80px] transform hover:scale-110 transition-transform duration-300"
          >
            <div className="text-3xl font-bold text-[#FFD500]">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-300 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CountdownTimer;
