// src/pages/LandingPage/components/Common/TimelineItem.tsx
import { Calendar, CheckCircle, Clock } from "lucide-react";

interface TimelineItemProps {
  event: {
    date: string;
    title: string;
    status: "completed" | "active" | "upcoming";
    description?: string;
  };
  index: number;
  isLastItem: boolean;
  lineStatus: string | null;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const TimelineItem = ({
  event,
  index,
  isLastItem,
  lineStatus,
  isActive,
  onHover,
  onLeave,
}: TimelineItemProps) => {
  const getStatusIcon = () => {
    switch (event.status) {
      case "completed":
        return CheckCircle;
      case "active":
        return Clock;
      default:
        return Calendar;
    }
  };

  const getStatusColor = () => {
    switch (event.status) {
      case "completed":
        return "text-[#3DDC84]";
      case "active":
        return "text-[#FFD500]";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBgColor = () => {
    switch (event.status) {
      case "completed":
        return "bg-[#3DDC84]/20 border-[#3DDC84]/30";
      case "active":
        return "bg-[#FFD500]/20 border-[#FFD500]/30";
      default:
        return "bg-white/5 border-white/10";
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <div
      className="relative flex items-start mb-8 last:mb-0 group cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline Node - Desktop */}
      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#00274D] to-[#003D6B] border-2 border-white/20 absolute right-0 z-10">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            event.status === "completed"
              ? "bg-[#3DDC84] border-[#3DDC84]"
              : event.status === "active"
              ? "bg-[#FFD500] border-[#FFD500] animate-pulse"
              : "bg-transparent border-white/30 group-hover:border-[#46BEF6]"
          } transition-all duration-300`}
        >
          {event.status === "completed" && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Timeline Node - Mobile */}
      <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#00274D] to-[#003D6B] border-2 border-white/20 mr-4">
        <StatusIcon className={`w-5 h-5 ${getStatusColor()}`} />
      </div>

      {/* Connection Line */}
      {!isLastItem && (
        <div
          className={`absolute right-6 top-12 w-0.5 h-16 hidden md:block transition-all duration-300 ${
            lineStatus === "completed"
              ? "bg-[#3DDC84]"
              : lineStatus === "completed-to-active"
              ? "bg-gradient-to-b from-[#3DDC84] to-[#FFD500]"
              : lineStatus === "active-to-upcoming"
              ? "bg-gradient-to-b from-[#FFD500] to-[#46BEF6]"
              : lineStatus === "completed-to-upcoming"
              ? "bg-gradient-to-b from-[#3DDC84] to-[#46BEF6]"
              : "bg-white/20 group-hover:bg-[#46BEF6]"
          }`}
        />
      )}

      {/* Content Card */}
      <div
        className={`flex-1 mr-0 md:mr-16 backdrop-blur-md border rounded-xl p-4 md:p-6 transition-all duration-300 ${
          isActive ? "scale-105 shadow-xl" : ""
        } ${getStatusBgColor()}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <StatusIcon className={`w-5 h-5 ${getStatusColor()}`} />
              <h3
                className={`text-lg md:text-xl font-bold ${
                  event.status === "completed"
                    ? "text-[#3DDC84]"
                    : event.status === "active"
                    ? "text-[#FFD500]"
                    : "text-white"
                }`}
              >
                {event.title}
              </h3>
            </div>

            <p
              className={`text-sm ${
                event.status === "completed"
                  ? "text-[#3DDC84]/80"
                  : event.status === "active"
                  ? "text-[#FFD500]/80"
                  : "text-gray-400"
              } mb-2`}
            >
              {event.date}
            </p>

            {event.description && (
              <p className="text-sm text-gray-300 mt-2">{event.description}</p>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex-shrink-0">
            {event.status === "completed" && (
              <span className="inline-flex items-center gap-1 bg-[#3DDC84] text-white px-3 py-1 rounded-full text-sm font-semibold">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                تکمیل شده
              </span>
            )}
            {event.status === "active" && (
              <span className="inline-flex items-center gap-1 bg-[#FFD500] text-[#00274D] px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                <div className="w-2 h-2 bg-[#00274D] rounded-full animate-ping" />
                در جریان
              </span>
            )}
            {event.status === "upcoming" && (
              <span className="inline-flex items-center gap-1 bg-white/20 text-white/80 px-3 py-1 rounded-full text-sm font-semibold">
                پیش رو
              </span>
            )}
          </div>
        </div>

        {/* Step Number */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FFD500] to-[#46BEF6] rounded-full flex items-center justify-center text-white text-xs font-bold">
          {index + 1}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
