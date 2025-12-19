// src/pages/Dashboard/components/Common/StatusBadge.tsx
import { getStatusColor, translateTeamStatus } from "@/services/teamService";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )}`}
    >
      {translateTeamStatus(status)}
    </span>
  );
};

export default StatusBadge;
