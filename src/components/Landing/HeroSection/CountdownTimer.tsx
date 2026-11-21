// src/components/Landing/HeroSection/CountdownTimer.tsx
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
    <div className="countdown-block">
      <p className="countdown-caption">
        <Clock className="icon icon-sm" aria-hidden="true" />
        زمان باقی‌مانده تا روز مسابقه
      </p>
      <div className="countdown" dir="ltr" aria-label="شمارش معکوس تا روز مسابقه">
        {timeUnits.map((item) => (
          <div className="countdown-unit" key={item.label}>
            <span className="countdown-value">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="countdown-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
