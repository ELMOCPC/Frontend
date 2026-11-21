// src/components/Landing/Sections/CTASection.tsx
import { AlertTriangle } from "lucide-react";
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
    <section className="section cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band">
          <h2 className="cta-title" id="cta-title">
            فرصت را از دست ندهید!
          </h2>
          <p className="cta-desc">
            همین حالا در پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و
            صنعت ثبت‌نام کنید و در رقابتی فراموش‌نشدنی شرکت نمایید
          </p>

          <div className="cta-stats">
            <div className="cta-stat">
              <span className="cta-stat-value is-yellow">۵۰۰+</span>
              <span className="cta-stat-label">دانشجو</span>
            </div>
            <div className="cta-stat">
              <span className="cta-stat-value is-cyan">۳۰M+</span>
              <span className="cta-stat-label">تومان جایزه</span>
            </div>
            <div className="cta-stat">
              <span className="cta-stat-value is-red">۵</span>
              <span className="cta-stat-label">ساعت رقابت</span>
            </div>
          </div>

          <div className="cta-actions">
            <CTAButtons
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
              onDashboard={onDashboard}
              onRegister={onRegister}
              variant="section"
              size="lg"
              showSecondaryButton={false}
            />
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onScrollToRules}
            >
              مطالعه قوانین
            </button>
          </div>

          <div className="cta-cards">
            <article className="cta-card">
              <h3 className="card-title">تجربه عملی</h3>
              <p className="card-text">
                بهترین فرصت برای تمرین و آمادگی برای مسابقات ملی
              </p>
            </article>
            <article className="cta-card">
              <h3 className="card-title">یادگیری تیمی</h3>
              <p className="card-text">
                کار گروهی و همفکری با بهترین برنامه‌نویس‌ها
              </p>
            </article>
            <article className="cta-card">
              <h3 className="card-title">رزومه‌سازی</h3>
              <p className="card-text">
                گواهینامه معتبر برای تقویت رزومه تحصیلی و شغلی
              </p>
            </article>
          </div>

          <p className="cta-deadline">
            <AlertTriangle className="icon icon-sm" aria-hidden="true" />
            مهلت ثبت‌نام: تا ۱۵ آذر ۱۴۰۴ - ظرفیت محدود است
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
