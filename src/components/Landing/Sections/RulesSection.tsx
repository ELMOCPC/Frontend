// src/pages/LandingPage/components/Sections/RulesSection.tsx
import {
  Users,
  Clock,
  Code,
  Shield,
  Laptop,
  Smartphone,
  AlertTriangle,
  ClipboardCheck,
  LogOut,
  Folder,
} from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import RuleCard from "../Common/RuleCard";

const RulesSection = () => {
  const rules = [
    {
      title: "شرایط شرکت",
      description:
        "هر تیم می‌تواند از ۱ تا ۳ نفر تشکیل شود و حضور دانش‌آموزان و دانشجویان در تمامی مقاطع مجاز است",
      icon: Users,
      color: "#46BEF6",
    },
    {
      title: "مدت زمان مسابقه",
      description:
        "مسابقه برای مدت ۵ ساعت متوالی برگزار می‌شود. زمان‌بندی دقیق متعاقبا اعلام می‌شود",
      icon: Clock,
      color: "#FFD500",
    },
    {
      title: "زبان‌ها و محیط توسعه",
      description:
        "زبان‌های C++، Python، Java و JavaScript مورد پذیرش هستند و انتخاب محیط توسعه آزاد است. نسخه‌های استاندارد Python، GCC، Java و Node.js الزامی است",
      icon: Code,
      color: "#3DDC84",
    },
    {
      title: "قوانین فنی و منابع",
      description:
        "استفاده از اینترنت به‌صورت کامل ممنوع است. تنها منابع مجاز، مستندات آفلاین و حداکثر ۲۰ صفحه منابع چاپ‌شده یا دست‌نویس برای کمک قابل استفاده است",
      icon: Shield,
      color: "#D7263D",
    },
    {
      title: "تجهیزات مجاز و سخت‌افزار",
      description:
        "هر تیم تنها مجاز به همراه داشتن یک لپ‌تاپ است. استفاده از چند مانیتور، تبلت یا سخت‌افزار اضافی ممنوع است. نصب نرم‌افزار جدید فقط با اجازه مسئول فنی مجاز است",
      icon: Laptop,
      color: "#8A2BE2",
    },
    {
      title: "ممنوعیت وسایل الکترونیکی",
      description:
        "در هنگام ورود، تلفن‌های همراه از شرکت‌کنندگان دریافت می‌شود. استفاده از هرگونه وسیله ارتباطی یا ابزارهای تولید خودکار کد مانند AI، Copilot و ... ممنوع است",
      icon: Smartphone,
      color: "#FF7F50",
    },
    {
      title: "تخلفات و رفتار حرفه‌ای",
      description:
        "هرگونه تبادل کد یا اطلاعات میان تیم‌ها و رفتار نامناسب باعث حذف تیم خواهد شد. در صورت انجام هرگونه عمل مغایر قوانین، تیم متخلف بدون هیچ استثنایی از ادامه مسابقه حذف خواهد شد",
      icon: AlertTriangle,
      color: "#FF4C4C",
    },
    {
      title: "سیستم داوری و امتیازدهی",
      description:
        "تمام ارسال‌ها توسط داور خودکار بررسی می‌شود و نتیجه داوری نهایی و غیرقابل‌تغییر است. زمان و تعداد ارسال‌ها روی امتیاز نهایی تأثیر دارد. رده‌بندی لحظه‌ای نمایش داده می‌شود اما ۱ ساعت انتهایی فریز خواهد شد",
      icon: ClipboardCheck,
      color: "#00BFFF",
    },
    {
      title: "خروج موقت",
      description:
        "خروج از سالن مسابقه فقط با اجازه داور ممکن است و زمان خروج به تیم اضافه نمی‌شود",
      icon: LogOut,
      color: "#FF6347",
    },
    {
      title: "تحویل نهایی و پلتفرم",
      description:
        "تیم باید تمام کدها را در پوشه مشخص‌شده ذخیره کرده و طبق دستورالعمل، در پلتفرم اعلامی آپلود کند",
      icon: Folder,
      color: "#32CD32",
    },
  ];

  return (
    <div id="rules" className="py-16 md:py-20 container mx-auto px-4">
      <SectionHeader
        badge={{
          text: "📋 قوانین",
          icon: "📋",
          color: "#46BEF6",
          bgColor: "rgba(70, 190, 246, 0.2)",
          borderColor: "rgba(70, 190, 246, 0.5)",
        }}
        title="قوانین و شرایط مسابقه"
        description="برای شرکت در مسابقه، این شرایط را به دقت مطالعه کنید"
      />

      <div className="grid md:grid-cols-2 gap-4 md:gap-6" dir="rtl">
        {rules.map((rule, index) => (
          <RuleCard key={index} {...rule} />
        ))}
      </div>
    </div>
  );
};

export default RulesSection;
