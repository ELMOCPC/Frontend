// src/pages/LandingPage/components/Sections/CTASection.tsx
import { Trophy, Sparkles, ArrowRight } from "lucide-react";
import CTAButtons from "../HeroSection/CTAButtons";

interface CTASectionProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onDashboard: () => void;
  onRegister: () => void;
  onScrollToRules: () => void;
}

const CTASection = ({
  isLoggedIn,
  onLogin,
  onDashboard,
  onRegister,
  onScrollToRules,
}: CTASectionProps) => {
  return (
    <div className="py-16 md:py-20 bg-gradient-to-r from-[#00274D] to-[#003D6B]">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#46BEF6]/20 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD500] to-[#46BEF6] rounded-full blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-[#FFD500] to-[#46BEF6] p-4 rounded-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            فرصت را از دست ندهید!
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            همین حالا در پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و
            صنعت ثبت‌نام کنید و در رقابتی فراموش‌نشدنی شرکت نمایید
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFD500]">۵۰۰+</div>
              <div className="text-sm text-gray-300">دانشجو</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#46BEF6]">۳۰M+</div>
              <div className="text-sm text-gray-300">تومان جایزه</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D7263D]">۵</div>
              <div className="text-sm text-gray-300">ساعت رقابت</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <CTAButtons
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
              onDashboard={onDashboard}
              onRegister={onRegister}
              variant="section"
              size="md"
            />

            <button
              onClick={onScrollToRules}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl text-lg transition-all duration-300 hover:scale-105 border border-white/20"
            >
              مطالعه قوانین
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#FFD500]" />
                <h4 className="font-semibold text-white">تجربه عملی</h4>
              </div>
              <p className="text-sm text-gray-300">
                بهترین فرصت برای تمرین و آمادگی برای مسابقات ملی
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#46BEF6]"></div>
                <h4 className="font-semibold text-white">یادگیری تیمی</h4>
              </div>
              <p className="text-sm text-gray-300">
                کار گروهی و همفکری با بهترین برنامه‌نویس‌ها
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-[#D7263D]"></div>
                <h4 className="font-semibold text-white">رزومه‌سازی</h4>
              </div>
              <p className="text-sm text-gray-300">
                گواهینامه معتبر برای تقویت رزومه تحصیلی و شغلی
              </p>
            </div>
          </div>

          {/* Timer Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-300">
              ⏳ مهلت ثبت‌نام: تا ۱۵ آذر ۱۴۰۴ - ظرفیت محدود است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
