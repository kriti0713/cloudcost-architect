import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Cpu, Database, HardDrive, Server, Plus, Minus } from 'lucide-react';
import { ArchitectureNodeData } from '@/types';

const iconMap = { Cpu, Database, HardDrive };

interface CloudNodeProps {
  id: string;
  data: ArchitectureNodeData & {
    onUnitsChange?: (id: string, newUnits: number) => void;
  };
  selected?: boolean;
}

export const CloudNode = ({ id, data, selected }: CloudNodeProps) => {
  const Icon = iconMap[data.service?.iconName as keyof typeof iconMap] || Server;
  const isAws = data.service.provider === 'aws';

  const handleDecrease = () => {
    if (data.units > 1 && data.onUnitsChange) {
      data.onUnitsChange(id, data.units - 1);
    }
  };

  const handleIncrease = () => {
    if (data.onUnitsChange) {
      data.onUnitsChange(id, data.units + 1);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border transition-all duration-300 min-w-[240px] ${
        selected
          ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
          : 'border-slate-800/80 shadow-xl shadow-black/50 hover:border-slate-700'
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-cyan-400 !border-2 !border-slate-950 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border ${
              isAws
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}
          >
            <Icon className="w-5 h-5 drop-shadow" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 tracking-wide">{data.service.name}</h4>
            <span
              className={`text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded ${
                isAws ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
              }`}
            >
              {data.service.provider}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between my-3 px-2 py-1.5 bg-slate-950/60 rounded-xl border border-slate-800/60">
        <span className="text-[10px] text-slate-400 font-medium">{data.service.unitLabel}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition disabled:opacity-30"
            disabled={data.units <= 1}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-extrabold text-cyan-400 min-w-[16px] text-center">
            {data.units}
          </span>
          <button
            onClick={handleIncrease}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <span className="text-[11px] text-slate-400 font-medium">Est. Monthly</span>
        <span className="text-xs font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
          ${data.monthlyCost.toFixed(2)}/mo
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-cyan-400 !border-2 !border-slate-950 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
      />
    </motion.div>
  );
};