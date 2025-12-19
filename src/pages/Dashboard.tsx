// src/pages/Dashboard/Dashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore/userStore";
import { useDashboard } from "@/hooks/useDashboard.ts";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import Header from "@/components/Dashboard/Header/Header";
import OverviewSection from "@/components/Dashboard/OverviewSection/OverviewSection";
import TeamSection from "@/components/Dashboard/TeamSection/TeamSection";
import LoadingSpinner from "@/components/Dashboard/Common/LoadingSpinner";
// import DeleteTeamModal from "@/components/Dashboard/Modals/DeleteTeamModal";
import UploadReceiptModal from "@/components/Dashboard/Modals/UploadReceiptModal";
import SubmitTeamModal from "@/components/Dashboard/Modals/SubmitTeamModal";

function Dashboard() {
  const navigate = useNavigate();
  const { authUser, clearAuth } = useUserStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    userData,
    teamData,
    loading,
    teamLoading,
    invites,
    isCaptain,
    daysLeft,
    notifications,
    handleSubmitTeam,
    handleUploadReceipt,
    handleCancelInvite,
    handleStartSubmitProcess,
    fetchTeamData,
  } = useDashboard(authUser);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  console.log(showDeleteModal)

  useEffect(() => {
    // if (!authUser) {
    //   navigate("/login");
    // }
  }, [authUser, navigate]);

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">کاربر یافت نشد</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] px-4 py-2 rounded-lg"
          >
            بازگشت به ورود
          </button>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewSection
            userData={userData}
            teamData={teamData}
            isCaptain={isCaptain}
            daysLeft={daysLeft}
            notifications={notifications}
            onUploadReceipt={() => setShowUploadModal(true)}
            paymentInfo={{
              ticketPrice: 660000,
              cardNumber: "6104-3387-4761-8581",
              bankName: "بانک ملت مهدی تقی دولابی",
            }}
          />
        );
      case "team":
        return (
          <TeamSection
            teamData={teamData}
            invites={invites}
            isCaptain={isCaptain}
            loading={teamLoading}
            onRefresh={fetchTeamData}
            onDeleteTeam={() => setShowDeleteModal(true)}
            onSubmitTeam={() => handleStartSubmitProcess()}
            onUploadReceipt={() => setShowUploadModal(true)}
            onCancelInvite={handleCancelInvite}
            onCreateTeam={() => navigate("/buildteam")}
            onInviteMember={() => navigate("/invitemember")}
            paymentInfo={{
              ticketPrice: 660000,
              cardNumber: "6104-3387-4761-8581",
              bankName: "بانک ملت مهدی تقی دولابی",
            }}
          />
        );
      // case "schedule":
      //   return <ScheduleSection />;
      // case "notifications":
      //   return <NotificationsSection notifications={notifications} />;
      // case "settings":
      //   return <SettingsSection userData={userData} />;
      // default:
      //   return <OverviewSection {...overviewProps} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white"
      dir="rtl"
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "md:mr-64" : "md:mr-20"
        }`}
      >
        <Header
          userData={userData}
          teamData={teamData}
          isCaptain={isCaptain}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onNavigateHome={() => navigate("/")}
        />

        <div className="p-6">{renderActiveTab()}</div>
      </main>

      {/* Modals */}
      {/* <DeleteTeamModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        teamName={teamData?.name || ""}
        onConfirm={handleDeleteTeam}
      /> */}

      <UploadReceiptModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUploadReceipt}
        paymentInfo={{
          ticketPrice: 660000,
          cardNumber: "6104-3387-4761-8581",
          bankName: "بانک ملت مهدی تقی دولابی",
        }}
      />

      <SubmitTeamModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        teamName={teamData?.name || ""}
        memberCount={teamData?.members?.length || 0}
        pendingInvites={invites?.length || 0}
        onSubmit={handleSubmitTeam}
      />
    </div>
  );
}

export default Dashboard;
