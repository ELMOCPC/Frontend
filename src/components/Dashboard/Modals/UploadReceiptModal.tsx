// src/pages/Dashboard/components/Modals/UploadReceiptModal.tsx
import { useState, useCallback } from "react";
import { Upload, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import BaseModal from "./BaseModal.tsx";

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<boolean>;
  paymentInfo: {
    ticketPrice: number;
    cardNumber: string;
    bankName: string;
  };
}

const UploadReceiptModal = ({
  isOpen,
  onClose,
  onUpload,
  paymentInfo,
}: UploadReceiptModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat("fa-IR").format(price) + " هزار تومان برای کل تیم"
    );
  };

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isTypeAllowed =
      allowedTypes.includes(file.type) ||
      ["jpg", "jpeg", "png", "pdf"].includes(fileExtension || "");

    if (!isTypeAllowed) {
      alert("فرمت فایل مجاز نیست. فقط JPG, PNG, PDF قابل قبول است");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم فایل باید کمتر از 5MB باشد");
      return;
    }

    setSelectedFile(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const success = await onUpload(selectedFile);
    setUploading(false);

    if (success) {
      onClose();
      setSelectedFile(null);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
          <Upload className="w-6 h-6 text-orange-400" />
        </div>
        <h3 className="text-lg font-bold text-white">آپلود فیش پرداخت</h3>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className={`
          border-2 border-dashed rounded-xl p-6 min-h-[200px] 
          flex flex-col items-center justify-center cursor-pointer transition
          ${
            isDragging
              ? "border-orange-400 bg-orange-500/10"
              : "border-orange-500/30"
          }
        `}
        onClick={() => document.getElementById("receipt-input")?.click()}
      >
        <Receipt className="w-12 h-12 text-orange-400 mb-3" />

        {!selectedFile ? (
          <>
            <p className="text-gray-200 mb-1">فایل را اینجا رها کنید</p>
            <p className="text-sm text-gray-400">یا کلیک کنید برای انتخاب</p>
          </>
        ) : (
          <p className="text-green-300 font-medium">
            {selectedFile.name} انتخاب شد ✔
          </p>
        )}

        <input
          id="receipt-input"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
      </div>

      <div className="text-xs text-gray-400 mt-4 mb-6 text-center leading-relaxed">
        <p>فرمت‌های قابل قبول: JPG, PNG, PDF</p>
        <p>حداکثر حجم: 5MB</p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onClose}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white"
          disabled={uploading}
        >
          انصراف
        </Button>

        <Button
          onClick={handleUpload}
          className="flex-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
          disabled={!selectedFile || uploading}
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin ml-2" />
              در حال آپلود...
            </>
          ) : (
            "آپلود فایل"
          )}
        </Button>
      </div>
    </BaseModal>
  );
};

export default UploadReceiptModal;
