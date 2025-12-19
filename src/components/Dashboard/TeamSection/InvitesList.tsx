// src/pages/Dashboard/components/TeamSection/InvitesList.tsx
import { Bell, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../Common/LoadingSpinner";

interface Invite {
  id: string;
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  expires_at: string;
}

interface InvitesListProps {
  invites: Invite[];
  isCaptain: boolean;
  onCancelInvite: (inviteToken: string, teamId: string) => Promise<boolean>;
  teamId: string;
  loading?: boolean;
}

const InvitesList = ({
  invites,
  isCaptain,
  onCancelInvite,
  teamId,
  loading = false,
}: InvitesListProps) => {
  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner text="درحال بارگذاری دعوت‌نامه‌ها..." />
        </div>
      </div>
    );
  }

  if (!invites || invites.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-[#FFD500]">
        <Bell className="w-6 h-6" />
        دعوت‌نامه‌های در انتظار پاسخ
        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
          {invites.length} دعوت
        </span>
      </h3>

      <div className="space-y-3 md:space-y-4">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl gap-4"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm md:text-base truncate">
                  {invite.first_name} {invite.last_name}
                </h4>
                <p className="text-sm text-gray-300 truncate" dir="ltr">
                  {invite.email}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  انقضا: {formatDate(invite.expires_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <span className="text-yellow-400 text-sm whitespace-nowrap">
                در انتظار پاسخ
              </span>
              <Button
                size="sm"
                onClick={() => onCancelInvite(invite.token, teamId)}
                disabled={!isCaptain}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs md:text-sm px-3 py-2"
              >
                <X className="w-4 h-4 ml-1" />
                لغو دعوت
              </Button>
            </div>
          </div>
        ))}
      </div>

      {!isCaptain && invites.length > 0 && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-gray-300 text-center">
            فقط کاپیتان تیم می‌تواند دعوت‌نامه‌ها را مدیریت کند
          </p>
        </div>
      )}
    </div>
  );
};

export default InvitesList;
