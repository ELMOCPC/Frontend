// src/components/Landing/Sections/StatsSection.tsx
const stats = [
  { value: "15+", label: "دانشگاه شرکت‌کننده" },
  { value: "1200+", label: "شرکت‌کننده" },
  { value: "5", label: "سال تجربه موفق" },
  { value: "200+", label: "تیم ثبت‌نام‌شده" },
];

const StatsSection = () => {
  return (
    <section className="section stats-section" aria-label="آمار مسابقه">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
