// src/pages/TeamRegistration/TeamRegistration.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
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
    updateMember2,
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
    <main className="auth-page">
      <div className="auth-stack">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => handleEditStep(step)}
        />

        <section
          className="auth-card auth-card-wide"
          aria-labelledby="buildteam-title"
        >
          {renderStep()}
        </section>
      </div>

      <Link to="/">
        <img
          className="corner-logo corner-logo-start"
          src={ELMOCPC}
          alt="ELMOCPC"
        />
      </Link>
      <img className="corner-logo corner-logo-end" src={CESA} alt="CESA" />
    </main>
  );
}

export default TeamRegistration;
