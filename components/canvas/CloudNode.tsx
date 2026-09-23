'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Database, Network, Plus, Minus, Server } from 'lucide-react';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  compute: Cpu,
  storage: HardDrive,
  database: Database,
  networking: Network,
};

export const CloudNode = memo(({ id, data, selected }: NodeProps<any>) => {
  const service = data.service;
  const IconComponent = categoryIcons[service?.category] || Server;
  const isAws = service?.provider === 'aws';
  const providerBadgeColor = isAws
    ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    : 'border-blue-500/30 text-blue-400 bg-blue-500/10';

  const handleDecrement = () => {
    if (data.units > 1 && data.onUnitsChange) {
      data.onUnitsChange(id, data.units - 1);
    }
  };

  const handleIncrement = () => {
    if (data.onUnitsChange) {
      data.onUnitsChange(id, data.units + 1);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`w-64 rounded-2xl bg-slate-900/90 backdrop-blur-md border ${
        selected ? 'border-cyan-400 ring-2 ring-cyan-400/20' : 'border-slate-800'
      } p-4 shadow-xl text-slate-100 relative group`}
    >
      {/* React Flow Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900 transition-all hover:scale-125"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900 transition-all hover:scale-125"
      />

      {/* Service Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`p-2 rounded-xl border ${providerBadgeColor}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="truncate">
            <h3 className="text-xs font-bold text-slate-100 truncate">{data.label}</h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {service?.provider || 'CLOUD'}
            </span>
          </div>
        </div>
      </div>

      {/* Unit Counter Controls */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3">
        <span className="text-[11px] text-slate-400 font-medium">
          {service?.unitLabel || 'Units'}:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-bold text-cyan-300 min-w-[18px] text-center font-mono">
            {data.units || 1}
          </span>
          <button
            onClick={handleIncrement}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Price Pill */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs">
        <span className="text-[10px] text-slate-500 font-medium">Est. Monthly</span>
        <span className="font-bold text-cyan-400 font-mono">
          ${(data.monthlyCost || 0).toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
});

CloudNode.displayName = 'CloudNode';