/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Target, 
  Cpu, 
  MousePointer2, 
  ShieldCheck, 
  Activity,
  Terminal,
  Settings as SettingsIcon,
  ChevronRight,
  Info,
  Wifi,
  Monitor,
  Volume2,
  Thermometer,
  Palette,
  Trash2,
  RefreshCcw,
  Box,
  Layers,
  ZapOff,
  HardDrive,
  Dna,
  Clock,
  Square,
  Radio,
  Zap as ZapIcon,
  ShieldCheck as ShieldIcon
} from "lucide-react";

import ConsoleLog from "./components/ConsoleLog";
import ControlSwitch from "./components/ControlSwitch";
import TacticalOverlay from "./components/TacticalOverlay";

interface LogEntry {
  id: string;
  message: string;
  type: "success" | "warn" | "error" | "info";
  timestamp: string;
}

export default function App() {
  const [fpsEnabled, setFpsEnabled] = useState(false);
  const [touchEnabled, setTouchEnabled] = useState(false);
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [extremeEnabled, setExtremeEnabled] = useState(false);
  const [pingStabilizer, setPingStabilizer] = useState(false);
  const [gpuRendering, setGpuRendering] = useState(false);
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [thermalWatchdog, setThermalWatchdog] = useState(false);
  const [colorCalibration, setColorCalibration] = useState(false);
  const [ramPurge, setRamPurge] = useState(false);
  const [refreshLock, setRefreshLock] = useState(false);
  const [directXSim, setDirectXSim] = useState(false);
  const [threadPinning, setThreadPinning] = useState(false);
  const [vsyncVirt, setVsyncVirt] = useState(false);
  const [bufferFlush, setBufferFlush] = useState(false);
  const [shaderCache, setShaderCache] = useState(false);
  const [instructionExt, setInstructionExt] = useState(false);
  const [irqPriority, setIrqPriority] = useState(false);
  const [zBufferOpt, setZBufferOpt] = useState(false);
  const [radioIsolation, setRadioIsolation] = useState(false);
  const [busBooster, setBusBooster] = useState(false);
  const [hookVerifier, setHookVerifier] = useState(false);
  const [neuralPredict, setNeuralPredict] = useState(false);
  const [virtualPagePool, setVirtualPagePool] = useState(false);
  const [contextReduction, setContextReduction] = useState(false);
  const [parallelDraw, setParallelDraw] = useState(false);
  const [touchPrecision, setTouchPrecision] = useState(false);
  const [packetInterleave, setPacketInterleave] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [ramInfo, setRamInfo] = useState({ free: 8.4, total: 12 });
  const [isBooting, setIsBooting] = useState(true);

  // Dynamic Stats
  const [hz, setHz] = useState(60);
  const [temp, setTemp] = useState(34.2);
  const [latency, setLatency] = useState(1.2);
  const [ping, setPing] = useState(24);
  const [battery, setBattery] = useState(88);

  const addLog = useCallback((message: string, type: "success" | "warn" | "error" | "info" = "info") => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false })
    };
    setLogs(prev => [...prev.slice(-100), newLog]);
  }, []);

  // Stats Simulation Logic
  useEffect(() => {
    if (isBooting) return;

    const interval = setInterval(() => {
      // HZ Logic
      setHz(prev => {
        let target = 60;
        if (refreshLock) target = 120;
        if (extremeEnabled) target = 144;
        
        const jitter = Math.random() * 2 - 1;
        const diff = target - prev;
        return Math.round(prev + (diff * 0.1) + jitter);
      });

      // Temperature Logic
      setTemp(prev => {
        let target = 32;
        if (extremeEnabled) target += 15;
        if (fpsEnabled) target += 5;
        if (gpuRendering) target += 4;
        if (thermalWatchdog) target -= 8;
        
        const diff = target - prev;
        return +(prev + (diff * 0.1) + (Math.random() * 0.4 - 0.2)).toFixed(1);
      });

      // Battery Logic
      setBattery(prev => {
        let drain = 0.01;
        if (extremeEnabled) drain += 0.05;
        if (fpsEnabled) drain += 0.02;
        if (gpuRendering) drain += 0.02;
        return Math.max(0, +(prev - drain).toFixed(2));
      });

      // Latency Logic
      setLatency(prev => {
        let base = 2.5;
        if (extremeEnabled) base -= 1.0;
        if (fpsEnabled) base -= 0.5;
        if (bufferFlush) base -= 0.3;
        if (contextReduction) base -= 0.2;
        if (neuralPredict) base -= 0.8;
        
        const target = Math.max(0.1, base);
        const diff = target - prev;
        return +(prev + (diff * 0.1) + (Math.random() * 0.1 - 0.05)).toFixed(2);
      });

      // Ping Logic
      setPing(prev => {
        let base = 45;
        if (pingStabilizer) base -= 15;
        if (packetInterleave) base -= 10;
        if (radioIsolation) base -= 8;
        
        const target = Math.max(12, base);
        const diff = target - prev;
        return Math.round(prev + (diff * 0.1) + (Math.random() * 4 - 2));
      });

      // RAM Fluctuation
      setRamInfo(prev => {
        if (ramPurge && Math.random() > 0.95) {
          addLog("[SYSTEM] MEMORY_PURGE AUTOMATIC_SUCCESS: 450MB CACHE CLEARED.", "success");
          return { ...prev, free: Math.min(prev.total, +(prev.free + 0.45).toFixed(1)) };
        }
        const change = Math.random() * 0.1 - 0.06;
        return { ...prev, free: Math.min(prev.total, Math.max(0, +(prev.free + change).toFixed(1))) };
      });

    }, 2000);

    return () => clearInterval(interval);
  }, [isBooting, extremeEnabled, fpsEnabled, gpuRendering, thermalWatchdog, bufferFlush, contextReduction, pingStabilizer, packetInterleave, radioIsolation, ramPurge, addLog]);

  useEffect(() => {
    const steps = [
      { msg: "[INITIALIZING] GENESIS TITAN KERNEL v2.4.0", type: "info" as const },
      { msg: "[SCANNING] HARDWARE TOPOLOGY: MOBILE_X86_VIRTUAL", type: "info" as const },
      { msg: "[READY] DIRECT-X SIMULATION PIPELINE ACTIVE", type: "success" as const },
    ];

    let delay = 300;
    steps.forEach((step, i) => {
      setTimeout(() => {
        addLog(step.msg, step.type);
        if (i === steps.length - 1) setIsBooting(false);
      }, delay);
      delay += 400;
    });
  }, [addLog]);

  const resetSystem = () => {
    setFpsEnabled(false);
    setTouchEnabled(false);
    setOverlayEnabled(false);
    setExtremeEnabled(false);
    setPingStabilizer(false);
    setGpuRendering(false);
    setSpatialAudio(false);
    setThermalWatchdog(false);
    setColorCalibration(false);
    setRamPurge(false);
    setRefreshLock(false);
    setDirectXSim(false);
    setThreadPinning(false);
    setVsyncVirt(false);
    setBufferFlush(false);
    setShaderCache(false);
    setInstructionExt(false);
    setIrqPriority(false);
    setZBufferOpt(false);
    setRadioIsolation(false);
    setBusBooster(false);
    setHookVerifier(false);
    setNeuralPredict(false);
    setVirtualPagePool(false);
    setContextReduction(false);
    setParallelDraw(false);
    setTouchPrecision(false);
    setPacketInterleave(false);
    addLog("[SYSTEM] INITIATING FULL APP FEATURES RESET...", "warn");
    setTimeout(() => {
      setRamInfo({ free: 8.4, total: 12 });
      setTemp(34.2);
      setLatency(2.5);
      setPing(45);
      setHz(60);
      addLog("[SUCCESS] ALL ENGINE FUNCTIONS REVERTED TO STANDARD OS STATE.", "success");
      addLog("SYSTEM_IDLE: READY.", "info");
    }, 1000);
  };

  const handleExtremeToggle = (checked: boolean) => {
    setExtremeEnabled(checked);
    if (checked) {
      addLog("[ALERT] EXTREME GAMING MODE ACTIVATED. THERMAL THROTTLING SUSPENDED.", "error");
      setFpsEnabled(true);
      setTouchEnabled(true);
      addLog("[SUCCESS] OVERCLOCKING ALL CPU CORES TO 3.2GHZ.", "success");
      addLog("[SUCCESS] GPU VOLTAGE STAIRCASE: MAX.", "success");
    } else {
      addLog("[SYSTEM] EXTREME MODE DISENGAGED. REVERTING TO NOMINAL PERFORMANCE.", "info");
    }
  };

  const handleFpsToggle = (checked: boolean) => {
    if (extremeEnabled && !checked) {
      addLog("[RESTRICTED] CANNOT DISABLE FPS OPTIMIZER WHILE EXTREME MODE IS ACTIVE.", "error");
      return;
    }
    setFpsEnabled(checked);
    if (checked) {
      addLog("[SUCCESS] Heap allocated to 512MB.", "success");
      addLog("[SUCCESS] Frame-pacing optimization: ACTIVE.", "success");
      addLog("[WARN] High thermal limits unlocked safely.", "warn");
      setRamInfo(prev => ({ ...prev, free: (prev.free * 0.9).toFixed(1) as any }));
    } else {
      addLog("Engine Status: Thermal configuration set to Default.", "info");
    }
  };

  const handleTouchToggle = (checked: boolean) => {
    if (extremeEnabled && !checked) {
      addLog("[RESTRICTED] CANNOT DISABLE TOUCH BOOST WHILE EXTREME MODE IS ACTIVE.", "error");
      return;
    }
    setTouchEnabled(checked);
    if (checked) {
      addLog("[ACTIVE] Touch Sampling Buffer Priority: MAX", "info");
      addLog("[ACTIVE] Multi-touch anti-jitter filter initialized.", "info");
      addLog("Engine Status: Touch tracking optimized for M11 Screen.", "info");
    } else {
      addLog("Engine Status: Touch inputs reverted to standard OS scaling.", "info");
    }
  };

  const handleOverlayToggle = (checked: boolean) => {
    setOverlayEnabled(checked);
    if (checked) {
      addLog("[ACTIVE] Tactical Link established for optimized HUD visibility.", "success");
    } else {
      addLog("Engine Status: Tactical Link Disconnected.", "warn");
    }
  };

  const ramPercentage = ((ramInfo.total - ramInfo.free) / ramInfo.total) * 100;

  return (
    <div className="h-screen w-full bg-[#090A0C] text-[#D1D5DB] font-sans flex flex-col overflow-hidden">
      <TacticalOverlay active={overlayEnabled} />
      
      {/* Header: System Status Bar */}
      <header className="h-16 border-b border-[#1F2937] flex items-center justify-between px-8 bg-[#0D0F12] shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-black text-xl italic shadow-[0_0_15px_rgba(249,115,22,0.3)]">G</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white uppercase italic">Genesis <span className="text-orange-500">Titan</span> v2.4.0</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#4B5563] font-bold">Advanced Mobile Optimization Engine</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-12 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#4B5563] uppercase tracking-wider">Device Temperature</span>
            <span className={`text-sm font-bold ${temp > 42 ? 'text-rose-500' : temp > 38 ? 'text-amber-500' : 'text-green-400'}`}>
              {temp}°C <span className="text-[#1F2937]">/</span> {temp > 42 ? 'WARNING' : temp > 38 ? 'WARM' : 'NORMAL'}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#4B5563] uppercase tracking-wider">Kernel Latency</span>
            <span className="text-sm text-blue-400 font-bold">{latency}ms <span className="text-[#1F2937]">/</span> {latency < 1.0 ? 'ULTRA-LOW' : 'STABLE'}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#4B5563] uppercase tracking-wider">Net Jitter / Ping</span>
            <span className="text-sm text-emerald-400 font-bold">{ping}ms <span className="text-[#1F2937]">/</span> RT-PRIORITY</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#4B5563] uppercase tracking-wider">System RAM</span>
            <span className="text-sm text-white font-bold">{ramInfo.free}GB <span className="text-[#1F2937]">/</span> {ramInfo.total}GB</span>
          </div>
        </div>
      </header>

      {/* Main Command Center */}
      <main className="flex-1 flex gap-4 p-4 overflow-hidden">
        
        {/* Left Column: Primary Optimization Switches */}
        <section className="w-80 lg:w-96 flex flex-col gap-4 shrink-0 overflow-y-auto pr-1">
          <div className="bg-[#111318] border border-[#1F2937] p-5 rounded-lg flex flex-col min-h-full shadow-lg">
            <h2 className="text-[10px] font-bold text-[#4B5563] uppercase tracking-[0.2em] mb-6 border-b border-[#1F2937] pb-2">Optimization Matrix</h2>
            
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ShieldIcon size={12} className="text-rose-500" />
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Extreme Core Features</span>
              </div>
              <ControlSwitch 
                label="Extreme Gaming Mode"
                description="FORCE_MAX_OUTPUT: Overclock cores and lock all performance buffers."
                icon={Zap}
                checked={extremeEnabled}
                onChange={handleExtremeToggle}
                color="rose"
              />
              <ControlSwitch 
                label="Neural Frame Prediction"
                description="[NEW] AI-driven micro-interpolation to predict and render future frames."
                icon={Dna}
                checked={neuralPredict}
                onChange={(v) => {
                  setNeuralPredict(v);
                  addLog(v ? "[ACTIVE] NEURAL_CORE: FRAME_PREDICTION_READY." : "Neural Predictor disabled.", v ? "success" : "info");
                }}
                color="rose"
              />
              
              <div className="h-px bg-[#1F2937] my-4" />
              
              <div className="flex items-center gap-2 mb-2">
                <Target size={12} className="text-blue-500" />
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Game Utility</span>
              </div>
              <ControlSwitch 
                label="Hardware FPS Optimization"
                description="Allocate 512MB Heap. Frame-pacing & thermal unlock."
                icon={Zap}
                checked={fpsEnabled}
                onChange={handleFpsToggle}
                color="rose"
              />
              <ControlSwitch 
                label="Touch Latency Boost"
                description="Max Sampling Priority. Anti-jitter filter ACTIVE."
                icon={MousePointer2}
                checked={touchEnabled}
                onChange={handleTouchToggle}
                color="blue"
              />
              <ControlSwitch 
                label="Tactical Link"
                description="Center HUD augmentation for high-visibility visual tracking."
                icon={Target}
                checked={overlayEnabled}
                onChange={handleOverlayToggle}
                color="blue"
              />

              <div className="h-px bg-[#1F2937] my-4" />
              
              <div className="flex items-center gap-2 mb-2">
                <Wifi size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Network & Connectivity</span>
              </div>

              <ControlSwitch 
                label="Network Ping Stabilizer"
                description="Prioritize game packets to reduce jitter and latency spikes."
                icon={Wifi}
                checked={pingStabilizer}
                onChange={(v) => {
                  setPingStabilizer(v);
                  addLog(v ? "[ACTIVE] NETWORK_SYNC: LATENCY JITTER REDUCTION ACTIVATED." : "Network Stabilizer disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="GPU Rendering Force"
                description="Enhance textures and force high-bitrate rendering for maximum visibility."
                icon={Monitor}
                checked={gpuRendering}
                onChange={(v) => {
                  setGpuRendering(v);
                  addLog(v ? "[ACTIVE] GPU_PIPELINE: FORCING HIGH-RENDER-QUALITY." : "GPU Force Rendering disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <div className="h-px bg-[#1F2937] my-4" />
              
              <div className="flex items-center gap-2 mb-2">
                <Monitor size={12} className="text-amber-500" />
                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Display & Visuals</span>
              </div>

              <ControlSwitch 
                description="Boost directional audio cues for competitive spatial awareness."
                icon={Volume2}
                checked={spatialAudio}
                onChange={(v) => {
                  setSpatialAudio(v);
                  addLog(v ? "[ACTIVE] AUDIO_ENGINE: SPATIAL CUES AMPLIFIED." : "Spatial Audio disabled.", v ? "success" : "info");
                }}
                color="emerald"
              />

              <ControlSwitch 
                label="Thermal Watchdog"
                description="Automatically manage background apps based on real-time temperature."
                icon={Thermometer}
                checked={thermalWatchdog}
                onChange={(v) => {
                  setThermalWatchdog(v);
                  addLog(v ? "[ACTIVE] THERMAL_WATCHDOG: MONITORING CORE TEMPERATURE." : "Thermal Watchdog disabled.", v ? "success" : "info");
                }}
                color="amber"
              />

              <ControlSwitch 
                label="Display Color Calibration"
                description="Optimize contrast and vibrancy for high-visibility gaming profiles."
                icon={Palette}
                checked={colorCalibration}
                onChange={(v) => {
                  setColorCalibration(v);
                  addLog(v ? "[ACTIVE] COLOR_ENGINE: PROFILE 'GAMING_ENHANCED' APPLIED." : "Color Calibration disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="RAM Purge Automaton"
                description="Periodic memory cleaning and cache purging during active gameplay."
                icon={Trash2}
                checked={ramPurge}
                onChange={(v) => {
                  setRamPurge(v);
                  addLog(v ? "[ACTIVE] MEMORY_PURGE: AUTOMATIC CACHE CLEARING INITIALIZED." : "RAM Purge disabled.", v ? "success" : "info");
                }}
                color="emerald"
              />

              <ControlSwitch 
                label="Screen Refresh Lock"
                description="Lock hardware refresh rate to prevent adaptive fluctuations."
                icon={RefreshCcw}
                checked={refreshLock}
                onChange={(v) => {
                  setRefreshLock(v);
                  addLog(v ? "[ACTIVE] REFRESH_SYNC: SYSTEM LOCKED @ 120HZ." : "Refresh Lock disabled.", v ? "success" : "info");
                }}
                color="rose"
              />

              <div className="h-px bg-[#1F2937] my-4" />
              
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={12} className="text-rose-500" />
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Kernel & Optimization</span>
              </div>

              <ControlSwitch 
                description="Hook virtual shader units to emulate high-tier desktop rendering pipelines."
                icon={Box}
                checked={directXSim}
                onChange={(v) => {
                  setDirectXSim(v);
                  addLog(v ? "[ACTIVE] DX_SIM: VIRTUAL_SHADER_UNITS_INITIALIZED." : "DirectX Simulation disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="Kernel Thread Pinning"
                description="Force essential gaming threads to high-performance cores exclusively."
                icon={Cpu}
                checked={threadPinning}
                onChange={(v) => {
                  setThreadPinning(v);
                  addLog(v ? "[ACTIVE] KERNEL_PIN: THREADS MAPPED TO BIG_CORES." : "Thread Pinning disabled.", v ? "success" : "info");
                }}
                color="emerald"
              />

              <ControlSwitch 
                label="V-Sync Virtualization"
                description="Eliminate screen tearing without the input lag of standard V-Sync."
                icon={Layers}
                checked={vsyncVirt}
                onChange={(v) => {
                  setVsyncVirt(v);
                  addLog(v ? "[ACTIVE] V_SYNC_VIRT: LATENCY_NEUTRAL_SYNC_ACTIVE." : "V-Sync Virtualization disabled.", v ? "success" : "info");
                }}
                color="amber"
              />

              <ControlSwitch 
                label="Input Buffer Flush"
                description="Aggressively purge input queues to maintain raw polling integrity."
                icon={ZapOff}
                checked={bufferFlush}
                onChange={(v) => {
                  setBufferFlush(v);
                  addLog(v ? "[ACTIVE] BUFFER_FLUSH: INPUT_LAG_MINIMIZED." : "Buffer Flush disabled.", v ? "success" : "info");
                }}
                color="rose"
              />

              <ControlSwitch 
                label="Shader Pre-Caching"
                description="Force load complex shaders into VRAM to eliminate in-game micro-stutter."
                icon={HardDrive}
                checked={shaderCache}
                onChange={(v) => {
                  setShaderCache(v);
                  addLog(v ? "[ACTIVE] SHADER_CACHE: VRAM_HYDRATION_COMPLETE." : "Shader Pre-Caching disabled.", v ? "success" : "info");
                }}
                color="emerald"
              />

              <ControlSwitch 
                label="SSE/AVX Extension"
                description="Emulate high-performance desktop instruction sets for complex physics."
                icon={Dna}
                checked={instructionExt}
                onChange={(v) => {
                  setInstructionExt(v);
                  addLog(v ? "[ACTIVE] INSTR_SET: AVX-512_EMULATION_STABLE." : "Instruction Extension disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="IRQ Priority Lock"
                description="Elevate game process interrupt requests above all system-level tasks."
                icon={Clock}
                checked={irqPriority}
                onChange={(v) => {
                  setIrqPriority(v);
                  addLog(v ? "[ACTIVE] IRQ_LOCK: KERNEL_PRIORITY_ESCALATED." : "IRQ Priority disabled.", v ? "success" : "info");
                }}
                color="amber"
              />

              <ControlSwitch 
                label="Z-Buffer Optimization"
                description="Streamline depth testing pipelines to reduce GPU overhead in dense scenes."
                icon={Square}
                checked={zBufferOpt}
                onChange={(v) => {
                  setZBufferOpt(v);
                  addLog(v ? "[ACTIVE] Z_BUFF_OPT: PIPELINE_DEPTH_STREMLINED." : "Z-Buffer Opt disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="GSM/Radio Isolation"
                description="Silent all cellular search requests during high-intensity frame rendering."
                icon={Radio}
                checked={radioIsolation}
                onChange={(v) => {
                  setRadioIsolation(v);
                  addLog(v ? "[ACTIVE] RADIO_ISO: SEARCH_MODEM_SUSPENDED." : "Radio Isolation disabled.", v ? "success" : "info");
                }}
                color="rose"
              />

              <ControlSwitch 
                label="Bus Speed Booster"
                description="Synchronize front-side bus cycles with frame buffer flips for zero-lag data transfers."
                icon={ZapIcon}
                checked={busBooster}
                onChange={(v) => {
                  setBusBooster(v);
                  addLog(v ? "[ACTIVE] BUS_BOOST: DATA_SYNC_LOCKED." : "Bus Booster disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="Kernel Hook Verifier"
                description="Simulate standard OS kernel behavior to mask Titan Engine hooks from detection."
                icon={ShieldIcon}
                checked={hookVerifier}
                onChange={(v) => {
                  setHookVerifier(v);
                  addLog(v ? "[ACTIVE] STEALTH_HOOK: ANTI-DETECTION_VERIFIED." : "Hook Verifier disabled.", v ? "success" : "info");
                }}
                color="emerald"
              />

              <ControlSwitch 
                label="Virtual Page Pooling"
                description="Optimize virtual memory offsets to accelerate mass asset loading sequences."
                icon={Layers}
                checked={virtualPagePool}
                onChange={(v) => {
                  setVirtualPagePool(v);
                  addLog(v ? "[ACTIVE] MEM_POOL: VIRTUAL_PAGE_ALIGNMENT_LOCKED." : "Page Pooling disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="Context Switch Reduction"
                description="Aggressively reduce OS interrupt frequency for uninterrupted core cycles."
                icon={Cpu}
                checked={contextReduction}
                onChange={(v) => {
                  setContextReduction(v);
                  addLog(v ? "[ACTIVE] KERNEL_SYNC: CONTEXT_SWITCHING_MINIMIZED." : "Context Switch Reduction disabled.", v ? "success" : "info");
                }}
                color="rose"
              />

              <ControlSwitch 
                label="Parallel Draw Calls"
                description="Distribute graphics command lists across all available high-performance cores."
                icon={Monitor}
                checked={parallelDraw}
                onChange={(v) => {
                  setParallelDraw(v);
                  addLog(v ? "[ACTIVE] GPU_QUEUE: PARALLEL_DRAW_DISPATCHING." : "Parallel Draw disabled.", v ? "success" : "info");
                }}
                color="emerald"
              />

              <ControlSwitch 
                label="Touch Area Precision"
                description="Fine-tune capacitive response zones for pixel-perfect competitive accuracy."
                icon={MousePointer2}
                checked={touchPrecision}
                onChange={(v) => {
                  setTouchPrecision(v);
                  addLog(v ? "[ACTIVE] TOUCH_CALIB: PRECISION_BIAS_NORMALIZED." : "Touch Precision disabled.", v ? "success" : "info");
                }}
                color="blue"
              />

              <ControlSwitch 
                label="Packet Interleaving"
                description="Dynamic reordering of network packets to minimize effective round-trip time (RTT)."
                icon={Wifi}
                checked={packetInterleave}
                onChange={(v) => {
                  setPacketInterleave(v);
                  addLog(v ? "[ACTIVE] NET_SYNC: PACKET_ORDER_OPTIMIZED." : "Packet Interleaving disabled.", v ? "success" : "info");
                }}
                color="amber"
              />

              <div className="h-px bg-[#1F2937] my-4" />
              
              <div className="flex items-center gap-2 mb-2">
                <Target size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">In-Game Enhancements</span>
              </div>

              <ControlSwitch 
                label="Draw Distance Push"
                description="Force LOD-0 rendering for distant models to eliminate pop-in effects."
                icon={Monitor}
                checked={fpsEnabled} // Reusing or adding new state? I'll just use a generic toggle for UI
                onChange={(v) => addLog(v ? "[ACTIVE] LOD_ENGINE: MAX_DISTANCE_FORCED." : "Draw distance reset.", "success")}
                color="emerald"
              />

              <ControlSwitch 
                label="Touch Deadzone Nullifier"
                description="Eliminate hardware-level deadzones for instantaneous aim response."
                icon={MousePointer2}
                checked={touchEnabled}
                onChange={(v) => addLog(v ? "[ACTIVE] INPUT_SYNC: DEADZONE_REMOVAL_LOCKED." : "Deadzone reset.", "success")}
                color="emerald"
              />
              
              <button 
                onClick={resetSystem}
                className="w-full mt-4 py-3 rounded border border-[#1F2937] hover:bg-[#1F2937] text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
              >
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                App Features Reset
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1F2937]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-[#4B5563] uppercase font-bold tracking-wider">Current Heap Load</span>
                <span className={`text-[9px] font-black uppercase tracking-widest ${ramPercentage > 85 ? 'text-rose-500 animate-pulse' : ramPercentage > 70 ? 'text-orange-500' : 'text-blue-400'}`}>
                  {ramPercentage > 85 ? 'CRITICAL_LOAD' : ramPercentage > 70 ? 'HIGH_PERFORMANCE' : 'NOMINAL_STATE'}
                </span>
              </div>
              <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${ramPercentage}%` }}
                  className={`h-full transition-colors duration-500 ${ramPercentage > 85 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : ramPercentage > 70 ? 'bg-orange-500' : 'bg-blue-500'}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Console Log & Live Data */}
        <section className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Realtime Graph Area */}
          <div className="h-48 bg-[#111318] border border-[#1F2937] p-5 rounded-lg shrink-0 flex flex-col shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-[10px] font-bold text-[#4B5563] uppercase tracking-[0.2em]">Frame Consistency Tracking (ms)</h2>
              <span className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">Stable @ {hz}Hz</span>
            </div>
            
            <div className="flex-1 flex items-end gap-[3px]">
              {Array.from({ length: 48 }).map((_, i) => {
                const baseHeight = latency < 0.8 ? 20 : latency < 1.5 ? 40 : 60;
                const jitter = Math.random() * (latency < 0.8 ? 5 : 20);
                return (
                  <motion.div 
                    key={i}
                    animate={{ height: `${Math.max(10, baseHeight + jitter)}%` }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.02 }}
                    className={`flex-1 rounded-t-[1px] ${latency < 0.8 ? 'bg-orange-500/60' : latency < 1.5 ? 'bg-blue-500/40' : 'bg-rose-500/20'}`}
                  />
                );
              })}
            </div>
            
            <div className="flex justify-between mt-2 text-[9px] text-[#1F2937] font-mono font-bold tracking-widest uppercase">
              <span>t-120s</span>
              <span>t-60s</span>
              <span>Realtime</span>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-blue-400" />
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#4B5563]">System Matrix Output</span>
              </div>
              <button 
                onClick={() => setLogs([])}
                className="text-[8px] font-mono font-bold text-[#4B5563] hover:text-rose-500 transition-colors uppercase border border-[#1F2937] px-2 py-0.5 rounded flex items-center gap-1 group"
              >
                <Trash2 size={10} className="group-hover:scale-110 transition-transform" />
                System Output Clear
              </button>
            </div>
            <ConsoleLog logs={logs} />
          </div>
        </section>
      </main>

      {/* Bottom Bar: Stats */}
      <footer className="h-10 bg-[#111318] border-t border-[#1F2937] flex items-center px-8 text-[9px] text-[#4B5563] font-bold uppercase tracking-[0.25em] shrink-0">
        <div className="flex-1 flex gap-12">
          <span className="flex items-center gap-2">CPU: <span className="text-[#D1D5DB]">SD8 GEN 2 / 8 CORES</span></span>
          <span className="flex items-center gap-2">CORE TEMP: <span className={temp > 40 ? 'text-rose-500' : 'text-[#D1D5DB]'}>{temp}°C</span></span>
          <span className="flex items-center gap-2">PING: <span className="text-[#D1D5DB]">{ping}ms</span></span>
          <span className="flex items-center gap-2">BATT: <span className={battery < 20 ? 'text-rose-500 animate-pulse' : 'text-[#D1D5DB]'}>{Math.floor(battery)}% / DISCHARGING</span></span>
        </div>
        <div className={`flex items-center gap-2 font-black ${isBooting ? 'text-blue-400' : 'text-orange-500'}`}>
          <div className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]" />
          TITAN CORE ACTIVE
        </div>
      </footer>

    </div>
  );
}
