import { motion } from "motion/react";

export default function TacticalOverlay({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center font-mono">
      {/* Status Indicators */}
      <div className="absolute bottom-1/4 flex flex-col items-center gap-1">
        <div className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.3em]">
          Tactical Link Active
        </div>
        <div className="flex gap-1.5 opacity-50">
          <div className="w-1 h-3 bg-orange-500 animate-pulse" />
          <div className="w-1 h-3 bg-orange-500 animate-pulse delay-75" />
          <div className="w-1 h-3 bg-orange-500 animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
}
