// src/pages/Dashboard/components/SettingsSection.tsx
import SectionCard from "./Common/SectionCard";

interface SettingsSectionProps {
  userData: {
    name: string;
    familyName: string;
    email: string;
    phone: string;
  };
}

const SettingsSection = ({ userData }: SettingsSectionProps) => {
  return (
    <SectionCard>
      <h2 className="text-2xl font-bold mb-6">اطلاعات حساب کاربری</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">نام و نام خانوادگی</label>
          <p className="text-lg font-semibold">
            {userData.name} {userData.familyName}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-400">ایمیل</label>
          <p className="text-lg font-semibold">{userData.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-400">شماره موبایل</label>
          <p className="text-lg font-semibold">{userData.phone}</p>
        </div>
      </div>
    </SectionCard>
  );
};

export default SettingsSection;
