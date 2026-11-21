import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  Users,
  CircleCheck,
  Award,
  Sparkles,
  Mail,
  Zap,
  ChevronDown,
} from "lucide-react";
import Footer from "@/components/Custom/Footer.tsx";
import anvari from "@/assets/anvari.webp";

const EVENT_URL =
  "https://evand.com/events/%DA%A9%D9%85%D9%BE-%D8%A2%D9%85%D8%A7%D8%AF%DA%AF%DB%8C-elmocpc-42621082";

function BootcampDetails() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const instructors = [
    {
      name: "امین انوری",
      role: "مدرس رفع اشکال",
      expertise: "الگوریتم‌های پیشرفته و تئوری",
    },
  ];

  const schedule = [
    {
      day: "روز اول",
      date: "6 آذر 1404",
      morning: "10:00 - 13:00",
      afternoon: "15:00 - 17:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی ",
      afternoonTitle: "رفع اشکال با امین انوری",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال و بحث",
    },
    {
      day: "روز دوم",
      date: "7 آذر 1404",
      morning: "10:00 - 13:00",
      afternoon: "15:00 - 17:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی",
      afternoonTitle: "رفع اشکال با امین انوری",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال و بحث",
    },
    {
      day: "روز سوم",
      date: "13 آذر 1404",
      morning: "10:00 - 13:00",
      afternoon: "15:00 - 17:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی",
      afternoonTitle: "رفع اشکال - مدرس اعلام می‌شود",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال",
    },
    {
      day: "روز چهارم",
      date: "14 آذر 1404",
      morning: "10:00 - 13:00",
      afternoon: "15:00 - 17:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی ",
      afternoonTitle: "رفع اشکال - مدرس اعلام می‌شود",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال",
    },
  ];

  const benefits = [
    "آموزش جامع توسط متخصصین نامدار",
    "تجربه حل مسائل رقابتی واقعی",
    "شبکه‌سازی با برنامه‌نویسان نخبه",
    " سوالات گلچین شده از بهترین کانست ها",
    "دسترسی به منابع و فیلم‌های آموزشی",
    "پشتیبانی و راهنمایی فنی مداوم",
  ];

  const faqs = [
    {
      q: "آیا نیاز به دانش قبلی دارد؟",
      a: "بله، این بوتکمپ فشرده پیشرفته است و نیاز به دانش کافی از الگوریتم دارد",
    },
    {
      q: "این کمپ به صورت آنلاین برگزار می شه یا حضوری؟",
      a: "هم کانتست و هم رفع اشکال هر 2 به صورت آنلاین برگزار می شوند",
    },
    {
      q: "آیا این بوت کمپ برای مسابقه ELMOCPC کافی است؟",
      a: "این بوت کمپ یک بنیاد قوی فراهم می‌کند. برای تسلط کامل، تمرین مداوم بعد از بوت کمپ ضروری است.",
    },
    {
      q: "آیا شرکت برای افراد خارج از دانشگاه علم و صنعت ممکنه؟",
      a: "بله، شرکت برای عموم افراد حتی دانش آموزان آزاد هست",
    },
    {
      q: "آیا فیلم‌های جلسات نگهداری می‌شوند؟",
      a: "بله، تمام جلسات ضبط شده و شرکت‌کنندگان به مدت 3 ماه دسترسی خواهند داشت.",
    },
    {
      q: "چگونه می‌توانم تماس بگیرم؟",
      a: "می توانید از طرق آیدی 'cesa_public' در تلگرام با ما در ارتباط باشید",
    },
  ];

  return (
    <div dir="rtl">
      <header className="back-header">
        <div className="back-header-inner between">
          <Link className="back-link" to="/">
            <ArrowRight className="icon-sm" aria-hidden="true" />
            بازگشت
          </Link>
          <h1 className="back-title">
            <span className="text-highlight">بوت کمپ</span>
            <span> 4 روزه</span>
          </h1>
          <span className="back-spacer" aria-hidden="true" />
        </div>
      </header>

      <main>
        {/* ============ Hero ============ */}
        <section className="camp-hero container" aria-labelledby="camp-hero-title">
          <span className="section-badge">
            <Sparkles className="icon icon-sm" aria-hidden="true" />
            برنامه آموزشی فشرده
          </span>

          <h2 className="camp-title" id="camp-hero-title">
            آماده‌سازی پیشرفته برای ELMOCPC 2025
          </h2>

          <p className="camp-subtitle">
            یک برنامه آموزشی جامع و عملی برای تسلط بر مهارت‌های برنامه‌نویسی
            رقابتی
          </p>

          <div className="chips">
            <span className="chip">
              <Calendar
                className="icon-sm icon-yellow"
                aria-hidden="true"
              />
              7-14 آذر 1404
            </span>
            <span className="chip">
              <Clock className="icon-sm icon-cyan" aria-hidden="true" />
              کانتست روزانه
            </span>
            <span className="chip">
              <Users className="icon-sm icon-red" aria-hidden="true" />
              محدود به 20 تیم
            </span>
          </div>
        </section>

        {/* ============ Instructors ============ */}
        <section className="section" aria-labelledby="instructors-title">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title" id="instructors-title">
                مدرسین برجسته
              </h2>
            </div>

            {instructors.map((instructor, index) => (
              <article className="card instructor-card" key={index}>
                <img
                  className="instructor-photo"
                  src={anvari}
                  alt={instructor.name}
                  width={112}
                  height={112}
                />
                <h3 className="card-title">{instructor.name}</h3>
                <span className="chip">{instructor.role}</span>
                <p className="card-text small">{instructor.expertise}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============ Schedule ============ */}
        <section
          className="section section-alt"
          aria-labelledby="schedule-title"
        >
          <div className="container">
            <div className="section-head">
              <h2 className="section-title" id="schedule-title">
                جدول برنامه آموزشی
              </h2>
            </div>

            <div className="schedule-wrap">
              <div
                className="tabs tabs-center"
                role="tablist"
                aria-label="روزهای بوت کمپ"
              >
                {schedule.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`tab${selectedDay === index ? " is-active" : ""}`}
                    role="tab"
                    id={`tab-day-${index + 1}`}
                    aria-selected={selectedDay === index}
                    aria-controls={`panel-day-${index + 1}`}
                    data-day={`day-${index + 1}`}
                    onClick={() => setSelectedDay(index)}
                  >
                    {item.day}
                  </button>
                ))}
              </div>

              <div className="tab-panels">
                {schedule.map((item, index) => (
                  <section
                    key={index}
                    className="tab-panel"
                    id={`panel-day-${index + 1}`}
                    role="tabpanel"
                    aria-labelledby={`tab-day-${index + 1}`}
                    data-daypanel={`day-${index + 1}`}
                    hidden={selectedDay !== index}
                  >
                    <div className="card">
                      <div className="schedule-head">
                        <span className="schedule-day">
                          <span className="schedule-dot" aria-hidden="true" />
                          {item.day}
                        </span>
                        <span className="schedule-date">
                          <Calendar className="icon icon-sm" aria-hidden="true" />
                          {item.date}
                        </span>
                      </div>

                      <div className="schedule-slots">
                        <div className="slot">
                          <span className="slot-time">
                            <Clock
                              className="icon icon-sm"
                              aria-hidden="true"
                            />
                            {item.morning}
                          </span>
                          <div className="slot-box">{item.morningTitle}</div>
                        </div>
                        <div className="slot is-afternoon">
                          <span className="slot-time">
                            <Clock
                              className="icon icon-sm"
                              aria-hidden="true"
                            />
                            {item.afternoon}
                          </span>
                          <div className="slot-box">{item.afternoonTitle}</div>
                        </div>
                      </div>

                      <div className="schedule-foot">
                        <span className="chip">{item.theme}</span>
                        <span className="schedule-desc">{item.description}</span>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ Benefits ============ */}
        <section className="section" aria-labelledby="benefits-title">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title" id="benefits-title">
                مزایای شرکت
              </h2>
            </div>

            <div className="grid grid-2 narrow-md">
              {benefits.map((benefit, index) => (
                <article className="card benefit" key={index}>
                  <CircleCheck className="icon" aria-hidden="true" />
                  <p>{benefit}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Pricing / enrollment CTA ============ */}
        <section className="section section-alt" aria-labelledby="pricing-title">
          <div className="container">
            <div className="cta-band">
              <span className="banner-icon" aria-hidden="true">
                <Award className="icon-lg" />
              </span>

              <h2 className="cta-title" id="pricing-title">
                شروع یادگیری
              </h2>
              <p className="cta-desc">ثبت‌نام محدود</p>

              <div className="cta-stats">
                <div className="cta-stat">
                  <span className="cta-stat-value is-yellow">150</span>
                  <span className="cta-stat-label">
                    هزار تومن تمام جلسات و منابع به ازای هر نفر
                  </span>
                </div>
                <div className="cta-stat">
                  <span className="cta-stat-value is-cyan">20 تیم</span>
                  <span className="cta-stat-label">ظرفیت شرکت‌کنندگان</span>
                </div>
                <div className="cta-stat">
                  <span className="cta-stat-value is-red">5 آذر</span>
                  <span className="cta-stat-label">پایان مهلت ثبت‌نام</span>
                </div>
              </div>

              <div className="cta-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => (window.location.href = EVENT_URL)}
                  disabled={true}
                >
                  <Sparkles className="icon-sm" aria-hidden="true" />
                  مهلت ثبت‌نام به پایان رسیده است
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => (window.location.href = "https://t.me/iustacm")}
                >
                  <Mail className="icon-sm" aria-hidden="true" />
                  تماس برای اطلاعات بیشتر
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="section" aria-labelledby="faq-title">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title" id="faq-title">
                سوالات متداول
              </h2>
            </div>

            <div className="accordion narrow-sm">
              {faqs.map((item, index) => (
                <div
                  className={`accordion-item${expandedFaq === index ? " is-open" : ""}`}
                  key={index}
                >
                  <h3 className="accordion-heading">
                    <button
                      type="button"
                      className="accordion-trigger"
                      id={`faq-q${index + 1}`}
                      aria-expanded={expandedFaq === index}
                      aria-controls={`faq-a${index + 1}`}
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className="accordion-chevron icon"
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    className="accordion-panel"
                    id={`faq-a${index + 1}`}
                    role="region"
                    aria-labelledby={`faq-q${index + 1}`}
                    hidden={expandedFaq !== index}
                  >
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Final strip ============ */}
        <section className="section" aria-label="پایان مهلت ثبت‌نام">
          <div className="container">
            <div className="section-head">
              <p className="cta-desc">ظرفیت محدود است - دیر نکنید</p>
              <div className="cta-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => (window.location.href = EVENT_URL)}
                  disabled={true}
                >
                  <Zap className="icon-sm" aria-hidden="true" />
                  مهلت ثبت‌نام به پایان رسیده است
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default BootcampDetails;
