// src/pages/Dashboard/components/OverviewSection/WelcomeBanner.tsx

interface WelcomeBannerProps {
  name: string;
}

const WelcomeBanner = ({ name }: WelcomeBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">سلام، {name}! 👋</h2>
      <p className="text-gray-300 text-sm md:text-base">
        به داشبورد مسابقات ELMOCPC 2025 خوش آمدید
      </p>
    </div>
  );
};

export default WelcomeBanner;
