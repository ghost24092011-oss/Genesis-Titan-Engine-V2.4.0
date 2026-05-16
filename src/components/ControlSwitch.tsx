import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ControlSwitchProps {
  label: string;
  description: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
}

export default function ControlSwitch({ 
  label, 
  description, 
  icon: Icon, 
  checked, 
  onChange,
  color = "blue"
}: ControlSwitchProps) {
  const activeColorClass = {
    blue: "bg-blue-500 border-blue-500/50",
    emerald: "bg-blue-500 border-blue-500/50",
    rose: "bg-orange-500 border-orange-500/30",
    amber: "bg-orange-500 border-orange-500/30"
  }[color as keyof typeof activeColorClass] || "bg-orange-500";

  const pillColor = activeColorClass.split(' ')[0];

  return (
    <div 
      className={`flex items-start justify-between p-3 rounded transition-all duration-200 cursor-pointer
        ${checked ? `bg-[#16191F] border ${activeColorClass}` : 'bg-[#16191F] border border-[#1F2937] opacity-60'}
      `}
      onClick={() => onChange(!checked)}
    >
      <div className="flex-1">
        <h3 className="text-sm font-bold text-white">{label}</h3>
        <p className="text-[11px] text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div 
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? pillColor : 'bg-[#374151]'}`}
      >
        <motion.div 
          animate={{ x: checked ? 26 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </div>
    </div>
  );
}
