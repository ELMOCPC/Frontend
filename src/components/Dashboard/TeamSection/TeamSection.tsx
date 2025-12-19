// src/pages/Dashboard/components/TeamSection/TeamSection.tsx
import TeamHeader from "./TeamHeader.tsx";
import TeamStatusCard from "./TeamStatusCard.tsx";
import TeamMembers from "./TeamMembers.tsx";
import InvitesList from "./InvitesList.tsx";
import LoadingSpinner from "../Common/LoadingSpinner.tsx";
import { Button } from "@/components/ui/button";

interface TeamSectionProps {
  teamData: any;
  invites: any[];
  isCaptain: boolean;
  loading: boolean;
  onRefresh: () => void;
  onDeleteTeam: () => void;
  onSubmitTeam: () => void;
  onUploadReceipt: () => void;
  onCancelInvite: (inviteToken: string, inviteid: string) => Promise<boolean>;
  onCreateTeam: () => void;
  onInviteMember: () => void;
  paymentInfo: {
    ticketPrice: number;
    cardNumber: string;
    bankName: string;
  };
}

const TeamSection = ({
  teamData,
  invites,
  isCaptain,
  loading,
  onRefresh,
  onDeleteTeam,
  onSubmitTeam,
  onUploadReceipt,
  onCancelInvite,
  onCreateTeam,
  onInviteMember,
  paymentInfo
}: TeamSectionProps) => {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner text="درحال بارگذاری اطلاعات تیم..." />
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="text-center py-16 md:py-20">
        <div className="w-20 h-20 mx-auto mb-6 text-gray-500 flex items-center justify-center bg-white/5 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">شما هنوز تیمی ندارید</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          برای شرکت در مسابقه، ابتدا یک تیم تشکیل دهید
        </p>
        <Button
          onClick={onCreateTeam}
          className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold px-8 py-3 rounded-lg"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          تشکیل تیم جدید
        </Button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " هزار تومان برای کل تیم";
  };

  return (
    <div className="space-y-6">
      <TeamHeader
        teamData={teamData}
        isCaptain={isCaptain}
        onInviteMember={onInviteMember}
        onUploadReceipt={onUploadReceipt}
        onDeleteTeam={onDeleteTeam}
        onSubmitTeam={onSubmitTeam}
        invites={invites}
      />

      <TeamStatusCard
        teamData={teamData}
        formatPrice={formatPrice}
        paymentInfo={paymentInfo}
      />

      {invites?.length > 0 && isCaptain && (
        <InvitesList
          invites={invites}
          isCaptain={isCaptain}
          onCancelInvite={onCancelInvite}
          teamId={teamData.id.toString()}
        />
      )}

      {teamData.members && teamData.members.length > 0 && (
        <TeamMembers members={teamData.members} />
      )}

      <div className="text-center pt-4">
        <Button
          onClick={onRefresh}
          className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 px-8 rounded-lg transition-all duration-200"
        >
          بروزرسانی اطلاعات تیم
        </Button>
      </div>
    </div>
  );
};

export default TeamSection;