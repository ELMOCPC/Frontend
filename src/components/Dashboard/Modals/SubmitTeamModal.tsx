// src/components/Dashboard/Modals/SubmitTeamModal.tsx (نسخه پیشرفته)
import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Users,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BaseModal from "./BaseModal";

interface SubmitTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  memberCount: number;
  pendingInvites: number;
  onSubmit: () => Promise<boolean>;
  teamStatus?: string;
}

type Step = 1 | 2 | 3; // 1: تأیید اولیه, 2: بررسی شرایط, 3: نتیجه

const SubmitTeamModal = ({
  isOpen,
  onClose,
  teamName,
  memberCount,
  pendingInvites,
  onSubmit,
  teamStatus = "draft",
}: SubmitTeamModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);

  const hasPendingInvites = pendingInvites > 0;
  const hasMinMembers = memberCount >= 3;
  const canSubmit = !hasPendingInvites && hasMinMembers;

  const checkRequirements = () => {
    const requirements = [
      {
        condition: hasMinMembers,
        text: "تعداد اعضا (حداقل ۳ نفر)",
        current: `${memberCount} نفر`,
      },
      {
        condition: !hasPendingInvites,
        text: "عدم وجود دعوت‌های در انتظار",
        current: `${pendingInvites} دعوت`,
      },
      {
        condition: teamStatus === "draft",
        text: "تیم در حالت پیش‌نویس باشد",
        current: teamStatus === "draft" ? "مناسب" : "نامناسب",
      },
    ];

    return requirements;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!canSubmit) {
        setCurrentStep(2); // Show requirements check
      } else {
        setCurrentStep(3); // Go to final confirmation
      }
    } else if (currentStep === 2) {
      // If requirements are met, go to final step
      if (canSubmit) {
        setCurrentStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleFinalSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const success = await onSubmit();
      setSubmitResult({
        success,
        message: success
          ? "تیم با موفقیت ثبت نهایی شد. منتظر تأیید ادمین‌ها باشید."
          : "خطا در ثبت نهایی تیم. لطفاً دوباره تلاش کنید.",
      });
    } catch (error: any) {
      setSubmitResult({
        success: false,
        message: error?.message || "خطای ناشناخته رخ داده است.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setSubmitResult(null);
    }, 300);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${
                currentStep === stepNum
                  ? "bg-[#FFD500] text-[#00274D]"
                  : currentStep > stepNum
                  ? "bg-green-500/20 text-green-400"
                  : "bg-white/10 text-gray-400"
              }
            `}
            >
              {currentStep > stepNum ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                stepNum
              )}
            </div>
            {stepNum < 3 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  currentStep > stepNum ? "bg-green-400" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    const requirements = checkRequirements();

    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">آمادگی برای ثبت نهایی</h3>
                <p className="text-sm text-gray-400">مرحله ۱ از ۳</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-[#FFD500]/10 to-transparent border border-[#FFD500]/20 rounded-lg p-4">
                <h4 className="font-bold text-[#FFD500] mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {teamName}
                </h4>
                <p className="text-sm text-gray-300">
                  برای ثبت نهایی تیم خود، لطفاً شرایط زیر را بررسی کنید.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">تعداد اعضای فعلی:</span>
                    <span className="font-bold">{memberCount} نفر</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">دعوت‌های در انتظار:</span>
                    <span
                      className={`font-bold ${
                        hasPendingInvites ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {pendingInvites} دعوت
                    </span>
                  </div>
                </div>
              </div>

              {!canSubmit && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-400 text-sm mb-1">
                        شرایط لازم رعایت نشده است
                      </h4>
                      <p className="text-xs text-red-300">
                        برای ادامه، لطفاً شرایط لازم را برطرف کنید.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleClose}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
              >
                انصراف
              </Button>
              <Button
                onClick={handleNextStep}
                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
              >
                بررسی شرایط
                <ChevronRight className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">بررسی شرایط</h3>
                <p className="text-sm text-gray-400">مرحله ۲ از ۳</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-300 text-sm">
                قبل از ثبت نهایی، لطفاً شرایط زیر را بررسی کنید:
              </p>

              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      req.condition
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {req.condition ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm">{req.text}</span>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        req.condition ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {req.current}
                    </span>
                  </div>
                ))}
              </div>

              {!canSubmit && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-bold text-red-400 text-sm mb-2">
                    اقدامات لازم:
                  </h4>
                  <ul className="text-xs text-red-300 space-y-1">
                    {hasPendingInvites && (
                      <li>• دعوت‌نامه‌های در انتظار را مدیریت کنید</li>
                    )}
                    {!hasMinMembers && (
                      <li>• تعداد اعضای تیم را به حداقل ۳ نفر برسانید</li>
                    )}
                    {teamStatus !== "draft" && (
                      <li>• تیم باید در حالت پیش‌نویس باشد</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handlePrevStep}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
              >
                بازگشت
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!canSubmit}
                className={`flex-1 ${
                  canSubmit
                    ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                } disabled:opacity-50`}
              >
                {canSubmit ? (
                  <>
                    ادامه به تأیید نهایی
                    <ChevronRight className="w-4 h-4 mr-2" />
                  </>
                ) : (
                  "شرایط رعایت نشده"
                )}
              </Button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">تأیید نهایی</h3>
                <p className="text-sm text-gray-400">مرحله ۳ از ۳</p>
              </div>
            </div>

            {submitResult ? (
              <div className="space-y-4 mb-6">
                <div
                  className={`p-4 rounded-lg border ${
                    submitResult.success
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {submitResult.success ? (
                      <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
                    ) : (
                      <X className="w-6 h-6 text-red-400 mt-0.5" />
                    )}
                    <div>
                      <h4
                        className={`font-bold mb-2 ${
                          submitResult.success
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {submitResult.success ? "عملیات موفق" : "عملیات ناموفق"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {submitResult.message}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleClose}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                >
                  {submitResult.success ? "متوجه شدم" : "تلاش مجدد"}
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-400 text-sm mb-1">
                          هشدار مهم!
                        </h4>
                        <ul className="text-xs text-yellow-300 space-y-1">
                          <li>
                            • پس از ثبت نهایی، امکان ویرایش تیم وجود نخواهد داشت
                          </li>
                          <li>• امکان دعوت عضو جدید غیرفعال می‌شود</li>
                          <li>• این عمل غیرقابل بازگشت است</li>
                          <li>
                            • اطلاعات تیم برای بررسی به ادمین‌ها ارسال می‌شود
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#FFD500]/10 to-transparent border border-[#FFD500]/20 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-300 mb-2">
                        آیا مطمئن هستید که می‌خواهید تیم زیر را ثبت نهایی کنید؟
                      </p>
                      <h4 className="text-lg font-bold text-[#FFD500]">
                        {teamName}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handlePrevStep}
                    disabled={submitting}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
                  >
                    بازگشت
                  </Button>
                  <Button
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 text-green-400 border border-green-500/30 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin ml-2" />
                        در حال ثبت نهایی...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 ml-2" />
                        ثبت نهایی تیم
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </>
        );
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-md"
      showCloseButton={!submitting && !submitResult}
      closeOnOverlayClick={!submitting}
    >
      {renderStepIndicator()}
      {renderStepContent()}
    </BaseModal>
  );
};

export default SubmitTeamModal;
