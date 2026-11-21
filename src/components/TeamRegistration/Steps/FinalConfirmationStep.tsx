// src/components/TeamRegistration/Steps/AdvancedFinalConfirmationStep.tsx
import { useState } from "react";
import {
  CheckCircle,
  ArrowLeft,
  Users,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
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

interface MemberFieldProps {
  label: string;
  value: string;
  ltr?: boolean;
}

const MemberField = ({ label, value, ltr = false }: MemberFieldProps) => (
  <div className="user-field">
    <div className="user-field-key">{label}</div>
    <div className="user-field-val" dir={ltr ? "ltr" : "rtl"}>
      {value || "—"}
    </div>
  </div>
);

const notes: { text: string; tone?: string }[] = [
  {
    text: "پس از ارسال دعوت، اعضا باید دعوت‌نامه را از طریق ایمیل تأیید کنند",
  },
  {
    text: "تیم پس از قبول دعوت توسط همه اعضا فعال و قابل استفاده می‌شود",
  },
  {
    text: 'می‌توانید از بخش "تیم من" در داشبورد وضعیت دعوت‌ها را پیگیری کنید',
  },
  {
    text: "امکان ویرایش اطلاعات پس از ارسال دعوت وجود ندارد",
    tone: "text-danger",
  },
  {
    text: "اطمینان حاصل کنید که اطلاعات تماس اعضا صحیح است",
    tone: "text-warning",
  },
];

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

  const invitedCount = [member1, member2].filter(
    (member) => member.name || member.email
  ).length;

  const renderTeamInfo = () => (
    <div
      className={cn(
        "accordion-item",
        expandedSections.team && "is-open"
      )}
    >
      <button
        type="button"
        className="accordion-trigger"
        onClick={() => toggleSection("team")}
        aria-expanded={expandedSections.team}
      >
        <span className="row">
          <span className="badge badge-warning">
            <Users className="icon-sm" aria-hidden="true" />
            اطلاعات تیم
          </span>
          <span className="list-main">
            <span className="list-title">
              {teamInfo.teamName || "تیم بدون نام"}
            </span>
            <span className="list-meta">اطلاعات ثبت‌شده تیم</span>
          </span>
        </span>
        <ChevronDown
          className="accordion-chevron icon"
          aria-hidden="true"
        />
      </button>

      {expandedSections.team && (
        <div className="accordion-panel">
          <div className="card-actions">
            <EditButton onClick={() => onEditStep(0)} label="ویرایش" />
          </div>

          <div className="kv-list">
            <div className="kv-row">
              <span className="kv-key">نام تیم</span>
              <span className="kv-value">{teamInfo.teamName || "—"}</span>
            </div>
            <div className="kv-row">
              <span className="kv-key">توضیحات تیم</span>
              <span className="kv-value">
                {teamInfo.teamDescription || "—"}
              </span>
            </div>
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
    return (
      <div
        className={cn(
          "accordion-item",
          expandedSections[sectionKey] && "is-open"
        )}
      >
        <button
          type="button"
          className="accordion-trigger"
          onClick={() => toggleSection(sectionKey)}
          aria-expanded={expandedSections[sectionKey]}
        >
          <span className="row">
            <span className="badge badge-primary">
              {memberNumber === 1 ? "۲" : "۳"}
            </span>
            <span className="list-main">
              <span className="list-title">{title}</span>
              <span className="list-meta">
                {member.name || member.familyName
                  ? `${member.name} ${member.familyName}`.trim()
                  : "اطلاعات عضو ثبت نشده است"}
              </span>
            </span>
          </span>
          <ChevronDown
            className="accordion-chevron icon"
            aria-hidden="true"
          />
        </button>

        {expandedSections[sectionKey] && (
          <div className="accordion-panel">
            <div className="card-actions">
              <EditButton
                onClick={() => onEditStep(memberNumber)}
                label="ویرایش"
              />
            </div>

            <div className="user-fields">
              <MemberField
                label="نام و نام خانوادگی"
                value={`${member.name} ${member.familyName}`.trim()}
              />
              <MemberField label="ایمیل" value={member.email} ltr />
              <MemberField label="شماره موبایل" value={member.phone} ltr />
              <MemberField label="دانشگاه" value={member.university} />
              <MemberField
                label="کد ملی"
                value={member.nationalCode ?? ""}
                ltr
              />
              <MemberField
                label="سایز تیشرت"
                value={member.tshirtSize || "M"}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

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

      <div className="accordion">
        {/* اطلاعات تیم */}
        {renderTeamInfo()}

        {/* اطلاعات اعضا */}
        {renderMemberInfo(member1, "عضو دوم", 1, "member1")}
        {renderMemberInfo(member2, "عضو سوم", 2, "member2")}

        {/* نکات مهم */}
        <div
          className={cn(
            "accordion-item",
            expandedSections.notes && "is-open"
          )}
        >
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => toggleSection("notes")}
            aria-expanded={expandedSections.notes}
          >
            <span className="row">
              <AlertCircle className="icon text-accent" aria-hidden="true" />
              <span className="list-title">نکات مهم قبل از ارسال</span>
            </span>
            <ChevronDown
              className="accordion-chevron icon"
              aria-hidden="true"
            />
          </button>

          {expandedSections.notes && (
            <div className="accordion-panel">
              <div className="alert alert-info">
                <AlertCircle
                  className="alert-icon icon"
                  aria-hidden="true"
                />
                <div className="stack">
                  <p className="alert-title">نکات مهم قبل از ارسال</p>
                  <ul className="stack small">
                    {notes.map((note) => (
                      <li key={note.text} className={note.tone}>
                        {note.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* دکمه‌های ناوبری */}
      <div className="form-actions form-actions-fill">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="btn btn-ghost btn-lg"
        >
          <ArrowLeft className="icon" aria-hidden="true" />
          بازگشت به ویرایش
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn btn-yellow btn-lg"
        >
          {isSubmitting ? (
            <>
              <span className="spinner" />
              <span>در حال ارسال دعوت...</span>
            </>
          ) : (
            <>
              <CheckCircle className="icon" aria-hidden="true" />
              <span>ارسال دعوت به اعضا</span>
            </>
          )}
        </button>
      </div>

      {/* وضعیت */}
      <div className="row">
        <span className="badge badge-success">
          <span className="dot" aria-hidden="true" />
          تیم آماده ثبت
        </span>
        <span className="badge badge-primary">
          <span className="dot" aria-hidden="true" />
          {invitedCount} عضو برای دعوت
        </span>
        <span className="badge badge-warning">
          <span className="dot" aria-hidden="true" />
          در انتظار تأیید
        </span>
      </div>
    </div>
  );
};

export default AdvancedFinalConfirmationStep;
