// src/pages/Dashboard/components/Modals/BaseModal.tsx
import { type ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  showHeader?: boolean;
  title?: string;
  description?: string;
  disableBodyScroll?: boolean;
}

const BaseModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
  showHeader = false,
  title,
  description,
  disableBodyScroll = true,
}: BaseModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 10);

      if (disableBodyScroll) {
        document.body.style.overflow = "hidden";
      }
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 300); // Match animation duration

      if (disableBodyScroll) {
        document.body.style.overflow = "auto";
      }

      return () => clearTimeout(timer);
    }

    return () => {
      if (disableBodyScroll) {
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpen, disableBodyScroll]);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with animation */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full max-h-[90vh] overflow-y-auto",
            maxWidth
          )}
          onClick={handleModalClick}
        >
          {/* Modal Content with animation */}
          <div
            className={cn(
              "bg-[#00274D] border border-white/10 rounded-2xl shadow-xl transform transition-all duration-300",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
              className
            )}
          >
            {/* Header */}
            {showHeader && (title || description) && (
              <div className="border-b border-white/10 p-6 pb-4">
                {showCloseButton && (
                  <Button
                    onClick={onClose}
                    className="absolute left-4 top-4 p-2 hover:bg-white/10 text-white rounded-full transition-colors"
                    aria-label="بستن"
                    variant="ghost"
                    size="icon"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}

                <div className="pr-10">
                  {title && (
                    <h3 className="text-lg font-bold text-white mb-2">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-sm text-gray-300">{description}</p>
                  )}
                </div>
              </div>
            )}

            {/* Close button without header */}
            {!showHeader && showCloseButton && (
              <Button
                onClick={onClose}
                className="absolute left-4 top-4 p-2 hover:bg-white/10 text-white rounded-full transition-colors"
                aria-label="بستن"
                variant="ghost"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            )}

            {/* Modal Body */}
            <div className={cn("p-6", showHeader ? "pt-4" : "")}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
