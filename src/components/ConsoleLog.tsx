import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

interface LogEntry {
  id: string;
  message: string;
  type: "success" | "warn" | "error" | "info";
  timestamp: string;
}

export default function ConsoleLog({ logs }: { logs: LogEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#0A0C0E] border border-[#1F2937] rounded-lg p-4 font-mono text-[11px] overflow-hidden h-full flex flex-col shadow-2xl relative">
      <div className="absolute top-2 right-4 text-[9px] text-[#4B5563] uppercase tracking-widest pointer-events-none">Engine Monitor Output</div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-[#1F2937]"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <span className={
                log.type === "success" ? "text-green-400" :
                log.type === "warn" ? "text-orange-500" :
                log.type === "error" ? "text-rose-500" :
                "text-blue-400"
              }>
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="text-gray-400 animate-pulse border-l-2 border-white pl-2 h-3 mt-1" />
      </div>
    </div>
  );
}
