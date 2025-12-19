// src/pages/Dashboard/components/OverviewSection/TeamStatusInfo.tsx
import {
  AlertCircle,
  Clock,
  Receipt,
  Upload,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface TeamStatusInfoProps {
  teamData: any;
  formatPrice: (price: number) => string;
}

const TeamStatusInfo = ({ teamData, formatPrice }: TeamStatusInfoProps) => {
  if (!teamData) return null;

  const statusConfig = {
    draft: {
      icon: AlertCircle,
      title: "تیم در حالت پیش‌نویس",
      color: "yellow",
      description:
        "ثبت‌نام شما هنوز تکمیل نشده است. برای تکمیل فرآیند ثبت‌نام، لطفاً مراحل زیر را انجام دهید:",
      steps: [
        "اعضای تیم را دعوت کنید (حداقل ۳ نفر)",
        "منتظر بمانید تا اعضای دعوت شده invitation را قبول کنند",
        "پس از تکمیل اعضا، روی دکمه 'ثبت نهایی تیم' کلیک کنید",
        "پس از ثبت نهایی، منتظر تایید از سمت ادمین‌ها باشید سپس هزینه ثبت‌نام را پرداخت و فیش را آپلود کنید",
      ],
      note: "💡 توجه: تا زمانی که تیم در حالت پیش‌نویس است، امکان ویرایش اطلاعات تیم وجود دارد. پس از ثبت نهایی، ویرایش امکان‌پذیر نخواهد بود.",
    },
    submitted: {
      icon: Clock,
      title: "تیم ثبت نهایی شده است",
      color: "blue",
      description:
        "تیم شما با موفقیت ثبت نهایی شد. در حال حاضر وضعیت شما به شرح زیر است:",
      steps: [
        "تیم شما برای بررسی به ادمین‌ها ارسال شده است",
        "لطفاً منتظر تایید نهایی از سوی ادمین‌ها باشید",
        "پس از تایید ادمین‌ها، می‌توانید هزینه ثبت‌نام را پرداخت کنید",
      ],
      note: "⏳ زمان بررسی معمولاً ۲۴ تا ۴۸ ساعت طول می‌کشد",
    },
    waiting_for_payment: {
      icon: Receipt,
      title: "در انتظار پرداخت",
      color: "orange",
      description:
        "تیم شما توسط ادمین‌ها تایید شده است. لطفاً برای تکمیل ثبت‌نام:",
      steps: [
        "هزینه ثبت‌نام را به شماره کارت مشخص شده واریز کنید",
        "پس از واریز، فیش پرداختی را در سیستم آپلود کنید",
        "پس از آپلود فیش، وضعیت شما به 'در انتظار تایید فیش' تغییر خواهد کرد",
      ],
      note: `💰 مبلغ قابل پرداخت: ${formatPrice(660000)}`,
    },
    receipt_pending: {
      icon: Upload,
      title: teamData.receipt_image_url
        ? "فیش آپلود شده"
        : "در انتظار آپلود فیش",
      color: "purple",
      description: teamData.receipt_image_url
        ? "فیش پرداختی شما با موفقیت آپلود شده است. وضعیت فعلی:"
        : "لطفاً برای تکمیل فرآیند ثبت‌نام:",
      steps: teamData.receipt_image_url
        ? [
            "فیش پرداختی شما توسط ادمین‌ها در حال بررسی است",
            "پس از تایید فیش، وضعیت شما به 'تایید شده' تغییر خواهد کرد",
          ]
        : [
            "هزینه ثبت‌نام را واریز کرده و فیش را آپلود کنید",
            "فرمت‌های قابل قبول: JPG, PNG, PDF",
            "حداکثر حجم فایل: 5MB",
          ],
      note: !teamData.receipt_image_url
        ? "📎 برای آپلود فیش از دکمه 'آپلود فیش' استفاده کنید"
        : "",
    },
    accepted: {
      icon: CheckCircle,
      title: "تیم تایید شده است",
      color: "green",
      description: "تبریک! ثبت‌نام شما با موفقیت تکمیل شد. وضعیت فعلی شما:",
      steps: [
        "تیم شما برای شرکت در مسابقه تایید شده است",
        "منتظر اطلاعیه‌های بعدی برای زمان مسابقه باشید",
      ],
      note: "🎉 موفق باشید در مسابقه!",
    },
    rejected: {
      icon: AlertTriangle,
      title: "تیم رد شده است",
      color: "red",
      description: "متأسفانه تیم شما توسط ادمین‌ها رد شده است. دلایل احتمالی:",
      steps: [
        "مشکل در اطلاعات اعضای تیم",
        "فیش پرداختی نامعتبر",
        "عدم رعایت قوانین مسابقه",
      ],
      note: "📞 در صورت نیاز به اطلاعات بیشتر با پشتیبانی تماس بگیرید",
    },
  };

  const config =
    statusConfig[teamData.status as keyof typeof statusConfig] ||
    statusConfig.draft;
  const Icon = config.icon;

  return (
    <div
      className={`bg-${config.color}-500/10 backdrop-blur-md border border-${config.color}-500/30 rounded-2xl p-6`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 bg-${config.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
        >
          <Icon className={`w-6 h-6 text-${config.color}-400`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold text-${config.color}-400 mb-3`}>
            {config.title}
          </h3>
          <div className="space-y-3 text-gray-300">
            <p className="text-sm leading-relaxed">{config.description}</p>
            <ul className="space-y-2 text-sm mr-4">
              {config.steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 bg-${config.color}-400 rounded-full`}
                  ></div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            {config.note && (
              <div
                className={`bg-${config.color}-500/5 border border-${config.color}-500/20 rounded-lg p-3 mt-3`}
              >
                <p className={`text-xs text-${config.color}-400 font-medium`}>
                  {config.note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatusInfo;
