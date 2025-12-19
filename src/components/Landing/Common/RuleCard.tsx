// src/pages/LandingPage/components/Common/RuleCard.tsx
import { type LucideIcon } from "lucide-react";

interface RuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const RuleCard = ({ icon: Icon, title, description, color }: RuleCardProps) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      {/* Hover Effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start gap-3 md:gap-4 relative z-10">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-bold mb-2 text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Corner Decoration */}
      <div
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: color }}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: color }}
      />
    </div>
  );
};

export default RuleCard;
