// src/pages/Dashboard/components/TeamSection/TeamMembers.tsx
import { Users, Mail, Phone, CheckCircle } from "lucide-react";

interface TeamMember {
  id: string | number;
  name: string;
  familyName: string;
  email: string;
  phone: string;
  isCaptain?: boolean;
}

interface TeamMembersProps {
  members: TeamMember[];
}

const TeamMembers = ({ members }: TeamMembersProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#FFD500]">
        <Users className="w-6 h-6" />
        اعضای تیم
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={member.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFD500] to-[#ffea80] rounded-full flex items-center justify-center text-[#00274D] font-bold text-lg">
                {member.name?.charAt(0)}
                {member.familyName?.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  {member.name} {member.familyName}
                </h3>
                <span className="text-sm text-[#FFD500]">
                  {index === 0 ? "کاپیتان" : "عضو تیم"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate" dir="ltr">
                  {member.email}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{member.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-green-400 text-xs pt-2">
                <CheckCircle className="w-3 h-3" />
                <span>عضو تایید شده</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
