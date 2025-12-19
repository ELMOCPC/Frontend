// src/pages/TeamRegistration/TeamRegistration.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "@/assets/BG.png";
import ProgressBar from "@/components/TeamRegistration/ProgressBar/ProgressBar";
import TeamInfoStep from "@/components/TeamRegistration/Steps/TeamInfoStep";
import MemberInfoStep from "@/components/TeamRegistration/Steps/MemberInfoStep";
// import MemberConfirmationStep from "@/components/TeamRegistration/Steps/MemberConfirmationStep";
import FinalConfirmationStep from "@/components/TeamRegistration/Steps/FinalConfirmationStep";
import { useTeamRegistration } from "@/hooks/TeamRegistration/useTeamRegistration";

function TeamRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const {
    teamInfo,
    member1,
    member2,
    isSubmitting,
    handleCreateTeam,
    handleMember1Submit,
    handleMember2Submit,
    handleFinalSubmit,
    handleEditStep,
    updateTeamInfo,
    updateMember1,
    updateMember2
  } = useTeamRegistration(currentStep, setCurrentStep);

  const steps = [
    { title: "نام و توضیح تیم", step: 0 },
    { title: "عضو دوم", step: 1 },
    { title: "عضو سوم", step: 2 },
    { title: "تایید نهایی", step: 3 },
  ];

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackDashboard = () => {
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <TeamInfoStep
            initialValues={teamInfo}
            onSubmit={(values) => {
              updateTeamInfo(values);
              handleCreateTeam(values);
            }}
            isSubmitting={isSubmitting}
          />
        );
      case 1:
        return (
          <MemberInfoStep
            memberType="دوم"
            memberNumber={1}
            initialValues={member1}
            onSubmit={(values) => {
              updateMember1(values);
              handleMember1Submit(values);
            }}
            onBack={handleBackDashboard}
            isSubmitting={isSubmitting}
            backButtonText="بعدا دعوت می کنم یا تیم زیر 3 نفره دارم"
          />
        );
      case 2:
        return (
          <MemberInfoStep
            memberType="سوم"
            memberNumber={2}
            initialValues={member2}
            onSubmit={(values) => {
              updateMember2(values);
              handleMember2Submit(values);
            }}
            onBack={handleBack}
            isSubmitting={isSubmitting}
            backButtonText="قبلی"
          />
        );
      case 3:
        return (
          <FinalConfirmationStep
            teamInfo={teamInfo}
            member1={member1}
            member2={member2}
            onEditStep={handleEditStep}
            onBack={handleBack}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => handleEditStep(step)}
        />
        
        <div className="bg-[#00274D] backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default TeamRegistration;