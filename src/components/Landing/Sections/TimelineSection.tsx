// src/components/Landing/Sections/TimelineSection.tsx
type TimelineStatus = "done" | "active" | "upcoming";

interface TimelineEvent {
  date: string;
  title: string;
  status: TimelineStatus;
  badge: string;
  badgeClass: string;
  description: string;
}

const timeline: TimelineEvent[] = [
  {
    date: "۱ تا ۵ آذر ۱۴۰۴",
    title: "ثبت نام بوت کمپ",
    status: "done",
    badge: "تکمیل شده",
    badgeClass: "badge-success",
    description: "ثبت‌نام در کارگاه‌های آموزشی آمادگی برای مسابقه",
  },
  {
    date: "۷ آذر ۱۴۰۴",
    title: "شروع ثبت‌نام مسابقه",
    status: "active",
    badge: "در جریان",
    badgeClass: "badge-warning",
    description: "شروع فرآیند ثبت‌نام برای مسابقه اصلی",
  },
  {
    date: "۱۵ آذر ۱۴۰۴",
    title: "پایان مهلت ثبت‌نام",
    status: "upcoming",
    badge: "پیش رو",
    badgeClass: "badge-neutral",
    description: "آخرین فرصت برای ثبت‌نام در مسابقه",
  },
  {
    date: "۱۸ آذر ۱۴۰۴",
    title: "اعلام لیست نهایی تیم‌ها",
    status: "upcoming",
    badge: "پیش رو",
    badgeClass: "badge-neutral",
    description: "اعلام اسامی تیم‌های واجد شرایط برای شرکت در مسابقه",
  },
  {
    date: "۲۱ آذر ۱۴۰۴",
    title: "روز برگزاری مسابقه",
    status: "upcoming",
    badge: "پیش رو",
    badgeClass: "badge-neutral",
    description: "برگزاری مسابقه در دانشگاه علم و صنعت",
  },
  {
    date: "۲۱ آذر ۱۴۰۴",
    title: "مراسم اختتامیه و اهدای جوایز",
    status: "upcoming",
    badge: "پیش رو",
    badgeClass: "badge-neutral",
    description: "مراسم اختتامیه و اهدای جوایز به تیم‌های برتر",
  },
];

const TimelineSection = () => {
  return (
    <section className="section" id="timeline" aria-labelledby="timeline-title">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title" id="timeline-title">
            برنامه زمانی مسابقه
          </h2>
          <p className="section-desc">
            از ثبت‌نام تا برگزاری مسابقه و مراسم اختتامیه
          </p>
        </div>
        <ol className="timeline">
          {timeline.map((event) => (
            <li className={`timeline-item is-${event.status}`} key={event.title}>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-body">
                <div className="timeline-meta">
                  <span className="timeline-date">{event.date}</span>
                  <span className={`badge ${event.badgeClass}`}>
                    <span className="dot" aria-hidden="true" />
                    {event.badge}
                  </span>
                </div>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-desc">{event.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="legend" aria-label="راهنمای وضعیت رویدادها">
          <span className="badge badge-success">
            <span className="dot" aria-hidden="true" />
            تکمیل شده
          </span>
          <span className="badge badge-warning">
            <span className="dot" aria-hidden="true" />
            در جریان
          </span>
          <span className="badge badge-neutral">
            <span className="dot" aria-hidden="true" />
            پیش رو
          </span>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
