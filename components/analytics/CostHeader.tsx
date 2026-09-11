import { motion } from 'framer-motion';
import { Cpu, Layers, AlertTriangle, ShieldCheck, Globe, BarChart3 } from 'lucide-react';
import { CloudRegion, REGION_MULTIPLIERS } from '../../types';

interface CostHeaderProps {
  totalCost: number;
  nodeCount: number;
  monthlyBudget: number;
  onBudgetChange: (budget: number) => void;
  selectedRegion: CloudRegion;
  onRegionChange: (region: CloudRegion) => void;
  onOpenAnalytics: () => void;
}

export const CostHeader = ({
  totalCost,
  nodeCount,
  monthlyBudget,
  onBudgetChange,
  selectedRegion,
  onRegionChange,
  onOpenAnalytics,
}: CostHeaderProps) => {
  const isOverBudget = totalCost > monthlyBudget;

  return (
    <header className="flex items-center justify-between bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-3.5 z-20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          <Cpu className="w-5 h-5 text-slate-950 font-bold" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-wide text-slate-100">
            CloudCost <span className="text-cyan-400">Architect</span>
          </h1>
          <p className="text-[11px] text-slate-400">Interactive cloud cost simulator</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value as CloudRegion)}
            className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer text-xs"
          >
            {Object.entries(REGION_MULTIPLIERS).map(([key, info]) => (
              <option key={key} value={key} className="bg-slate-900 text-slate-200">
                {info.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>{nodeCount} Nodes</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Target: $</span>
          <input
            type="number"
            value={monthlyBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value) || 0)}
            className="w-14 bg-transparent text-slate-100 font-bold focus:outline-none border-b border-slate-700 text-xs text-center"
            step="50"
            min="0"
          />
        </div>

        <button
          onClick={onOpenAnalytics}
          className="p-2 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition"
          title="Open Cost Analytics"
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
        </button>

        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-all duration-300 ${
            isOverBudget
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.25)] animate-pulse'
              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
          }`}
        >
          {isOverBudget ? (
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          )}

          <motion.span
            key={totalCost}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xs font-black tracking-tight"
          >
            ${totalCost.toFixed(2)} / mo
          </motion.span>
        </div>
      </div>
    </header>
  );
};