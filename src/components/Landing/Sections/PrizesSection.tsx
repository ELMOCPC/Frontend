// src/components/Landing/Sections/PrizesSection.tsx
import { Award, ShieldCheck } from "lucide-react";

const prizes = [
  { rank: "مقام اول", amount: "۱۵,۰۰۰,۰۰۰ تومان" },
  { rank: "مقام دوم", amount: "۱۰,۰۰۰,۰۰۰ تومان" },
  { rank: "مقام سوم", amount: "۵,۰۰۰,۰۰۰ تومان" },
  { rank: "تیم‌های برتر", amount: "گواهینامه معتبر + هدایای ویژه" },
];

const rules = [
  {
    title: "شرایط شرکت",
    description:
      "هر تیم می‌تواند از ۱ تا ۳ نفر تشکیل شود و حضور دانش‌آموزان و دانشجویان در تمامی مقاطع مجاز است",
  },
  {
    title: "مدت زمان مسابقه",
    description:
      "مسابقه برای مدت ۵ ساعت متوالی برگزار می‌شود. زمان‌بندی دقیق متعاقبا اعلام می‌شود",
  },
  {
    title: "زبان‌ها و محیط توسعه",
    description:
      "زبان‌های C++، Python، Java و JavaScript مورد پذیرش هستند و انتخاب محیط توسعه آزاد است. نسخه‌های استاندارد Python، GCC، Java و Node.js الزامی است",
  },
  {
    title: "قوانین فنی و منابع",
    description:
      "استفاده از اینترنت به‌صورت کامل ممنوع است. تنها منابع مجاز، مستندات آفلاین و حداکثر ۲۰ صفحه منابع چاپ‌شده یا دست‌نویس برای کمک قابل استفاده است",
  },
  {
    title: "تجهیزات مجاز و سخت‌افزار",
    description:
      "هر تیم تنها مجاز به همراه داشتن یک لپ‌تاپ است. استفاده از چند مانیتور، تبلت یا سخت‌افزار اضافی ممنوع است. نصب نرم‌افزار جدید فقط با اجازه مسئول فنی مجاز است",
  },
  {
    title: "ممنوعیت وسایل الکترونیکی",
    description:
      "در هنگام ورود، تلفن‌های همراه از شرکت‌کنندگان دریافت می‌شود. استفاده از هرگونه وسیله ارتباطی یا ابزارهای تولید خودکار کد مانند AI، Copilot و ... ممنوع است",
  },
  {
    title: "تخلفات و رفتار حرفه‌ای",
    description:
      "هرگونه تبادل کد یا اطلاعات میان تیم‌ها و رفتار نامناسب باعث حذف تیم خواهد شد. در صورت انجام هرگونه عمل مغایر قوانین، تیم متخلف بدون هیچ استثنایی از ادامه مسابقه حذف خواهد شد",
  },
  {
    title: "سیستم داوری و امتیازدهی",
    description:
      "تمام ارسال‌ها توسط داور خودکار بررسی می‌شود و نتیجه داوری نهایی و غیرقابل‌تغییر است. زمان و تعداد ارسال‌ها روی امتیاز نهایی تأثیر دارد. رده‌بندی لحظه‌ای نمایش داده می‌شود اما ۱ ساعت انتهایی فریز خواهد شد",
  },
  {
    title: "خروج موقت",
    description:
      "خروج از سالن مسابقه فقط با اجازه داور ممکن است و زمان خروج به تیم اضافه نمی‌شود",
  },
  {
    title: "تحویل نهایی و پلتفرم",
    description:
      "تیم باید تمام کدها را در پوشه مشخص‌شده ذخیره کرده و طبق دستورالعمل، در پلتفرم اعلامی آپلود کند",
  },
];

const PrizesSection = () => {
  return (
    <section className="section section-alt" id="rules" aria-labelledby="prizes-title">
      <div className="container">
        <div className="section-block">
          <div className="section-head">
            <span className="section-badge">
              <Award className="icon icon-sm" aria-hidden="true" />
              جوایز
            </span>
            <h2 className="section-title" id="prizes-title">
              جوایز ارزشمند مسابقه
            </h2>
            <p className="section-desc">
              علاوه بر افتخار و اعتبار، جوایز نقدی و جوایز ویژه در انتظار تیم‌های
              برتر است
            </p>
          </div>
          <div className="prizes-grid">
            {prizes.map((prize) => (
              <article className="card prize-card" key={prize.rank}>
                <h3 className="prize-rank">{prize.rank}</h3>
                <p className="prize-amount">{prize.amount}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="section-block rules-block">
          <div className="section-head">
            <span className="section-badge">
              <ShieldCheck className="icon icon-sm" aria-hidden="true" />
              قوانین
            </span>
            <h2 className="section-title">قوانین و شرایط مسابقه</h2>
            <p className="section-desc">
              برای شرکت در مسابقه، این شرایط را به دقت مطالعه کنید
            </p>
          </div>
          <div className="rules-grid">
            {rules.map((rule) => (
              <article className="card card-hover rule-card" key={rule.title}>
                <h3 className="card-title">{rule.title}</h3>
                <p className="card-text">{rule.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
