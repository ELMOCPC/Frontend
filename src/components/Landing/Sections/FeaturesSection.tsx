// src/pages/LandingPage/components/Sections/FeaturesSection.tsx
import { Code, Users, Zap, Trophy } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import FeatureCard from "../Common/FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: Code,
      title: "مسابقه حضوری ویژه",
      description:
        "اولین دوره حضوری ELMOCPC با امکانات و فضای رقابتی حرفه‌ای در دانشگاه علم و صنعت",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "رقابت تیمی",
      description:
        "شرکت در قالب تیم‌های ۳ نفره و تجربه کار گروهی واقعی در محیط دانشگاه",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "شبیه‌سازی آزمون کشوری",
      description:
        "آماده‌سازی برای مسابقات ملی با استانداردهای بین‌المللی ICPC",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      title: "جوایز ارزشمند",
      description: "30 میلیون تومان جایزه نقدی و هدایای ویژه برای تیم‌های برتر",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div id="about" className="py-20 container mx-auto px-4">
      <SectionHeader
        title="چرا در ELMOCPC شرکت کنیم؟"
        description="پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و صنعت، فرصتی استثنایی برای سنجش مهارت‌ها، یادگیری تیمی و آمادگی برای مسابقات ملی"
        gradient
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
