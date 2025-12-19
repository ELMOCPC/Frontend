// src/pages/Dashboard/components/TeamSection/TeamHeader.tsx
import {
  Users,
  Plus,
  CheckCircle,
  Upload,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "../Common/StatusBadge";
// import { translateTeamStatus } from "@/services/teamService";

interface TeamHeaderProps {
  teamData: {
    name: string;
    description?: string;
    status: string;
    receipt_image_url?: string;
    members?: any[];
  };
  isCaptain: boolean;
  invites: any[];
  onInviteMember: () => void;
  onUploadReceipt: () => void;
  onDeleteTeam: () => void;
  onSubmitTeam: () => void;
}

const TeamHeader = ({
  teamData,
  isCaptain,
  invites,
  onInviteMember,
  onUploadReceipt,
  onDeleteTeam,
  onSubmitTeam,
}: TeamHeaderProps) => {
  const canInvite =
    (!invites || invites.length < 3) &&
    (teamData.status === "draft" || !teamData);

  return (
    <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#FFD500]/20 rounded-lg">
              <Users className="w-6 h-6 text-[#FFD500]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{teamData.name}</h2>
          </div>

          {teamData.description && (
            <p className="text-gray-300 mb-3">{teamData.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={teamData.status} />
            {teamData.receipt_image_url && (
              <span className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                فیش آپلود شده
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {teamData.status === "draft" && isCaptain && (
            <Button
              onClick={onSubmitTeam}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
            >
              <CheckCircle className="w-5 h-5 ml-2" />
              ثبت نهایی تیم
            </Button>
          )}

          {canInvite && isCaptain && (
            <Button
              onClick={onInviteMember}
              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
            >
              <Plus className="w-5 h-5 ml-2" />
              دعوت عضو
            </Button>
          )}

          {teamData.status === "waiting_for_payment" && isCaptain && (
            <Button
              onClick={onUploadReceipt}
              className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30"
            >
              <Upload className="w-5 h-5 ml-2" />
              آپلود فیش
            </Button>
          )}

          {teamData.status === "draft" && isCaptain && (
            <Button
              onClick={onDeleteTeam}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
            >
              <Trash2 className="w-5 h-5 ml-2" />
              حذف تیم
            </Button>
          )}
        </div>
      </div>

      {!isCaptain && (
        <div className="mt-6 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="font-bold text-blue-400 mb-1">
                شما عضو تیم هستید
              </h3>
              <p className="text-gray-300 text-sm">
                برای تغییرات در تیم (ثبت نهایی، دعوت عضو، حذف تیم) با کاپیتان
                تیم تماس بگیرید.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamHeader;
