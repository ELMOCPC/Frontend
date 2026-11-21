// src/components/Landing/Sections/FeaturesSection.tsx
import { Award, Users, Target, Gift } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "مسابقه حضوری ویژه",
    description:
      "اولین دوره حضوری ELMOCPC با امکانات و فضای رقابتی حرفه‌ای در دانشگاه علم و صنعت",
  },
  {
    icon: Users,
    title: "رقابت تیمی",
    description:
      "شرکت در قالب تیم‌های ۳ نفره و تجربه کار گروهی واقعی در محیط دانشگاه",
  },
  {
    icon: Target,
    title: "شبیه‌سازی آزمون کشوری",
    description:
      "آماده‌سازی برای مسابقات ملی با استانداردهای بین‌المللی ICPC",
  },
  {
    icon: Gift,
    title: "جوایز ارزشمند",
    description:
      "30 میلیون تومان جایزه نقدی و هدایای ویژه برای تیم‌های برتر",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section section-alt" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="about-title">
            چرا در ELMOCPC شرکت کنیم؟
          </h2>
          <p className="section-desc">
            پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و صنعت، فرصتی
            استثنایی برای سنجش مهارت‌ها، یادگیری تیمی و آمادگی برای مسابقات ملی
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="card card-hover feature-card" key={feature.title}>
                <span className="feature-icon" aria-hidden="true">
                  <Icon className="icon" />
                </span>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-text">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
