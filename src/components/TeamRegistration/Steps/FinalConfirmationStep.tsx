// src/components/TeamRegistration/Steps/AdvancedFinalConfirmationStep.tsx
import { useState } from "react";
import {
  CheckCircle,
  ArrowLeft,
  Users,
  AlertCircle,
  Mail,
  Smartphone,
  GraduationCap,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FormHeader from "../Common/FormHeader";
import EditButton from "../FormControls/EditButton";
import { cn } from "@/lib/utils";

interface TeamInfo {
  teamName: string;
  teamDescription: string;
}

interface MemberData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  university: string;
  nationalCode?: string;
  tshirtSize?: string;
}

interface AdvancedFinalConfirmationStepProps {
  teamInfo: TeamInfo;
  member1: MemberData;
  member2: MemberData;
  onEditStep: (step: number) => void;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const AdvancedFinalConfirmationStep = ({
  teamInfo,
  member1,
  member2,
  onEditStep,
  onBack,
  onSubmit,
  isSubmitting,
}: AdvancedFinalConfirmationStepProps) => {
  const [expandedSections, setExpandedSections] = useState({
    team: true,
    member1: true,
    member2: true,
    notes: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderTeamInfo = () => (
    <div
      className="bg-gradient-to-r from-[#FFD500]/10 to-[#FFD500]/5 border border-[#FFD500]/30 rounded-xl overflow-hidden mb-4"
      dir="rtl"
    >
      <button
        onClick={() => toggleSection("team")}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-white/5 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FFD500] to-[#ffea80] rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-[#00274D]" />
          </div>
          <div className="text-right">
            <h3 className="text-white font-semibold text-lg">اطلاعات تیم</h3>
            <p className="text-gray-400 text-sm">{teamInfo.teamName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              onEditStep(0);
            }}
            label="ویرایش"
          />
          {expandedSections.team ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {expandedSections.team && (
        <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-white/10 pt-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-400 text-sm mb-1">نام تیم</h4>
              <p className="text-white text-xl font-bold bg-white/5 p-3 rounded-lg">
                {teamInfo.teamName}
              </p>
            </div>

            {teamInfo.teamDescription && (
              <div>
                <h4 className="text-gray-400 text-sm mb-1">توضیحات تیم</h4>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">
                    {teamInfo.teamDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderMemberInfo = (
    member: MemberData,
    title: string,
    memberNumber: number,
    sectionKey: "member1" | "member2"
  ) => {
    // const memberIcon =
    //   memberNumber === 1 ? (
    //     <Mail className="w-4 h-4" />
    //   ) : (
    //     <Smartphone className="w-4 h-4" />
    //   );

    return (
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-white/5 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                memberNumber === 1
                  ? "bg-gradient-to-br from-[#FFD500] to-[#ffea80]"
                  : "bg-gradient-to-br from-[#FFD500] to-[#ffea80]"
              )}
            >
              <div className="text-black font-bold text-sm">
                {memberNumber === 1 ? "۲" : "۳"}
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-gray-400 text-sm">
                {member.name} {member.familyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                onEditStep(memberNumber);
              }}
              label="ویرایش"
            />
            {expandedSections[sectionKey] ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </button>

        {expandedSections[sectionKey] && (
          <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-white/10 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={<Users className="w-4 h-4" />}
                label="نام و نام خانوادگی"
                value={`${member.name} ${member.familyName}`}
                color="text-blue-400"
              />

              <InfoCard
                icon={<Mail className="w-4 h-4" />}
                label="ایمیل"
                value={member.email}
                isLtr
                color="text-cyan-400"
              />

              <InfoCard
                icon={<Smartphone className="w-4 h-4" />}
                label="شماره موبایل"
                value={member.phone}
                isLtr
                color="text-green-400"
              />

              <InfoCard
                icon={<GraduationCap className="w-4 h-4" />}
                label="دانشگاه"
                value={member.university}
                color="text-amber-400"
              />

              {member.nationalCode && (
                <InfoCard
                  icon={<Shield className="w-4 h-4" />}
                  label="کد ملی"
                  value={member.nationalCode}
                  color="text-purple-400"
                />
              )}

              <InfoCard
                icon="👕"
                label="سایز تیشرت"
                value={member.tshirtSize || "M"}
                color="text-red-400"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const InfoCard = ({
    icon,
    label,
    value,
    isLtr = false,
    color = "text-white",
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    isLtr?: boolean;
    color?: string;
  }) => (
    <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center gap-2 mb-2">
        {typeof icon === "string" ? (
          <span className="text-lg">{icon}</span>
        ) : (
          icon
        )}
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p
        className={cn("font-medium truncate", color)}
        dir={isLtr ? "ltr" : "rtl"}
      >
        {value}
      </p>
    </div>
  );

  const handleSubmit = async () => {
    // Show confirmation modal before submitting
    if (
      window.confirm(
        "آیا از صحت اطلاعات وارد شده اطمینان دارید؟ پس از ارسال، امکان ویرایش وجود نخواهد داشت."
      )
    ) {
      await onSubmit();
    }
  };

  return (
    <div>
      <FormHeader
        icon={CheckCircle}
        title="بررسی نهایی اطلاعات"
        description="تمام اطلاعات وارد شده را با دقت بررسی کنید"
      />

      {/* اطلاعات تیم */}
      {renderTeamInfo()}

      {/* اطلاعات اعضا */}
      <div dir="rtl">
        {renderMemberInfo(member1, "عضو دوم", 1, "member1")}
        {renderMemberInfo(member2, "عضو سوم", 2, "member2")}
      </div>

      {/* نکات مهم */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("notes")}
          className="w-full flex items-center justify-between p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <h4 className="text-blue-400 font-semibold">
              نکات مهم قبل از ارسال
            </h4>
          </div>
          {expandedSections.notes ? (
            <ChevronUp className="w-5 h-5 text-blue-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-400" />
          )}
        </button>

        {expandedSections.notes && (
          <div className="mt-2 bg-blue-500/5 border border-blue-500/20 rounded-lg p-4"
          dir="rtl">
            <ul className="text-sm text-gray-300 space-y-2 mr-4">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  پس از ارسال دعوت، اعضا باید دعوتنامه را از طریق ایمیل تأیید
                  کنند
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  تیم پس از قبول دعوت توسط همه اعضا فعال و قابل استفاده می‌شود
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                <span>
                  می‌توانید از بخش "تیم من" در داشبورد وضعیت دعوت‌ها را پیگیری
                  کنید
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                <span className="text-red-300">
                  امکان ویرایش اطلاعات پس از ارسال دعوت وجود ندارد
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                <span className="text-amber-300">
                  اطمینان حاصل کنید که اطلاعات تماس اعضا صحیح است
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* دکمه‌های ناوبری */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 border border-white/10"
        >
          <ArrowLeft className="w-5 h-5 ml-2 inline-block" />
          بازگشت به ویرایش
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>در حال ارسال دعوت...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold">ارسال دعوت به اعضا</span>
            </div>
          )}
        </Button>
      </div>

      {/* وضعیت */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">تیم آماده ثبت</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">۲ عضو برای دعوت</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400">در انتظار تأیید</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFinalConfirmationStep;
