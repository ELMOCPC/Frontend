// src/pages/Dashboard/components/TeamSection/TeamStatusCard.tsx
import {
  AlertCircle,
  Clock,
  Receipt,
  Upload,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface TeamStatusCardProps {
  teamData: {
    status: string;
    receipt_image_url?: string;
  };
  formatPrice: (price: number) => string;
  paymentInfo: {
    ticketPrice: number;
    cardNumber: string;
    bankName: string;
  };
}

const TeamStatusCard = ({
  teamData,
  formatPrice,
  paymentInfo,
}: TeamStatusCardProps) => {
  const statusConfig: Record<
    string,
    {
      icon: React.ElementType;
      title: string;
      color: string;
      description: string;
      steps: string[];
      note: string;
    }
  > = {
    draft: {
      icon: AlertCircle,
      title: "تیم در حالت پیش‌نویس",
      color: "yellow",
      description:
        "ثبت‌نام شما هنوز تکمیل نشده است. برای تکمیل فرآیند ثبت‌نام، لطفاً مراحل زیر را انجام دهید:",
      steps: [
        "اعضای تیم را دعوت کنید (حداکثر ۳ نفر)",
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
      note: "⏳ زمان بررسی معمولاً ۱ تا ۶ ساعت طول می‌کشد",
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
      note: `💰 مبلغ قابل پرداخت: ${formatPrice(paymentInfo.ticketPrice)}`,
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

  const config = statusConfig[teamData.status] || statusConfig.draft;
  const Icon = config.icon;

  const colorClasses: Record<string, any> = {
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      iconBg: "bg-yellow-500/20",
      iconText: "text-yellow-400",
      text: "text-yellow-400",
      dot: "bg-yellow-400",
      noteBg: "bg-yellow-500/5",
      noteBorder: "border-yellow-500/20",
      noteText: "text-yellow-400",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconText: "text-blue-400",
      text: "text-blue-400",
      dot: "bg-blue-400",
      noteBg: "bg-blue-500/5",
      noteBorder: "border-blue-500/20",
      noteText: "text-blue-400",
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      iconBg: "bg-orange-500/20",
      iconText: "text-orange-400",
      text: "text-orange-400",
      dot: "bg-orange-400",
      noteBg: "bg-orange-500/5",
      noteBorder: "border-orange-500/20",
      noteText: "text-orange-400",
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      iconBg: "bg-purple-500/20",
      iconText: "text-purple-400",
      text: "text-purple-400",
      dot: "bg-purple-400",
      noteBg: "bg-purple-500/5",
      noteBorder: "border-purple-500/20",
      noteText: "text-purple-400",
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      iconBg: "bg-green-500/20",
      iconText: "text-green-400",
      text: "text-green-400",
      dot: "bg-green-400",
      noteBg: "bg-green-500/5",
      noteBorder: "border-green-500/20",
      noteText: "text-green-400",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      iconBg: "bg-red-500/20",
      iconText: "text-red-400",
      text: "text-red-400",
      dot: "bg-red-400",
      noteBg: "bg-red-500/5",
      noteBorder: "border-red-500/20",
      noteText: "text-red-400",
    },
  };

  const colors = colorClasses[config.color] || colorClasses.yellow;

  // If waiting for payment, show payment info
  if (teamData.status === "waiting_for_payment") {
    return (
      <div className="space-y-6">
        <div
          className={`${colors.bg} backdrop-blur-md border ${colors.border} rounded-2xl p-6`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
            >
              <Icon className={`w-6 h-6 ${colors.iconText}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${colors.text} mb-3`}>
                {config.title}
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm leading-relaxed">{config.description}</p>
                <ul className="space-y-2 text-sm mr-4">
                  {config.steps.map((step, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 ${colors.dot} rounded-full`}
                      ></div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {config.note && (
                  <div
                    className={`${colors.noteBg} border ${colors.noteBorder} rounded-lg p-3 mt-3`}
                  >
                    <p className={`text-xs ${colors.noteText} font-medium`}>
                      {config.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">مبلغ قابل پرداخت</p>
            <p className="text-lg font-bold text-[#FFD500]">
              {formatPrice(paymentInfo.ticketPrice)}
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">شماره کارت</p>
            <p
              className="text-lg font-bold text-green-400 font-mono text-right"
              dir="ltr"
            >
              {paymentInfo.cardNumber}
            </p>
            <p className="text-gray-400 text-xs mt-1">{paymentInfo.bankName}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${colors.bg} backdrop-blur-md border ${colors.border} rounded-2xl p-6`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
        >
          <Icon className={`w-6 h-6 ${colors.iconText}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${colors.text} mb-3`}>
            {config.title}
          </h3>
          <div className="space-y-3 text-gray-300">
            <p className="text-sm leading-relaxed">{config.description}</p>
            <ul className="space-y-2 text-sm mr-4">
              {config.steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            {config.note && (
              <div
                className={`${colors.noteBg} border ${colors.noteBorder} rounded-lg p-3 mt-3`}
              >
                <p className={`text-xs ${colors.noteText} font-medium`}>
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

export default TeamStatusCard;
