// src/pages/Dashboard/components/OverviewSection/NotificationsList.tsx
import { Bell, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  date: string;
  read: boolean;
}

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertCircle;
      case "info":
        return Bell;
      case "error":
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      case "error":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
        <Bell className="w-6 h-6 text-[#FFD500]" />
        آخرین اطلاعیه‌ها
      </h3>

      <div className="space-y-3 md:space-y-4">
        {notifications.slice(0, 3).map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const iconColor = getNotificationColor(notification.type);

          return (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all duration-200 hover:bg-white/5 ${
                !notification.read
                  ? "bg-[#FFD500]/5 border-[#FFD500]/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                    <h4 className="font-semibold text-sm md:text-base">
                      {notification.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-300">
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500 mr-2 md:mr-0">
                  {notification.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsList;
