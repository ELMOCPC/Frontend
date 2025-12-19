// src/pages/Dashboard/components/OverviewSection/PaymentInfoSection.tsx
import { Receipt, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentInfoSectionProps {
  paymentInfo: {
    ticketPrice: number;
    cardNumber: string;
    bankName: string;
  };
  formatPrice: (price: number) => string;
  onUploadReceipt: () => void;
}

const PaymentInfoSection = ({
  paymentInfo,
  formatPrice,
  onUploadReceipt,
}: PaymentInfoSectionProps) => {
  return (
    <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6 space-y-6">
      {/* عنوان */}
      <h3 className="text-xl font-bold flex items-center gap-2 text-orange-400">
        <Receipt className="w-6 h-6" />
        آپلود فیش پرداخت
      </h3>

      {/* اطلاعات پرداخت */}
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

      {/* متن راهنما */}
      <p className="text-gray-300 text-sm">
        لطفا پس از واریز مبلغ، فیش پرداخت را آپلود کنید.
      </p>

      {/* دکمه آپلود */}
      <Button
        onClick={onUploadReceipt}
        className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 justify-center w-full md:w-auto"
      >
        <Upload className="w-5 h-5" />
        آپلود فیش
      </Button>
    </div>
  );
};

export default PaymentInfoSection;
