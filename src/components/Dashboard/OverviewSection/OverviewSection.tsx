// src/pages/Dashboard/components/OverviewSection/OverviewSection.tsx
import WelcomeBanner from "./WelcomeBanner.tsx";
import StatsCards from "./StatsCards.tsx";
import TeamStatusInfo from "./TeamStatusInfo";
import NotificationsList from "./NotificationsList.tsx";
import PaymentInfoSection from "./PaymentInfoSection.tsx";
import { getUserRegistrationStatus } from "@/services/teamService";

interface OverviewSectionProps {
  userData: any;
  teamData: any;
  isCaptain: boolean;
  daysLeft: number;
  notifications: any[];
  onUploadReceipt: () => void;
  paymentInfo: {
    ticketPrice: number;
    cardNumber: string;
    bankName: string;
  };
}

const OverviewSection = ({
  userData,
  teamData,
  // isCaptain,
  daysLeft,
  notifications,
  onUploadReceipt,
  paymentInfo,
}: OverviewSectionProps) => {
  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat("fa-IR").format(price) + " هزار تومان برای کل تیم"
    );
  };

  return (
    <div className="space-y-6">
      <WelcomeBanner name={userData.name} />

      <StatsCards
        teamMembers={teamData?.members?.length || 0}
        daysLeft={daysLeft}
        registrationStatus={getUserRegistrationStatus(teamData)}
      />

      {teamData?.status === "waiting_for_payment" && (
        <PaymentInfoSection
          paymentInfo={paymentInfo}
          formatPrice={formatPrice}
          onUploadReceipt={onUploadReceipt}
        />
      )}

      <TeamStatusInfo teamData={teamData} formatPrice={formatPrice} />

      <NotificationsList notifications={notifications} />
    </div>
  );
};

export default OverviewSection;
