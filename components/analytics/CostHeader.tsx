'use client';

import React from 'react';
import { CloudRegion, REGION_MULTIPLIERS } from '@/types';
import { BarChart3, Layers } from 'lucide-react';

interface CostHeaderProps {
  totalCost: number;
  nodeCount: number;
  monthlyBudget?: number;
  onBudgetChange?: (budget: number) => void;
  selectedRegion?: CloudRegion;
  onRegionChange?: (region: CloudRegion) => void;
  onOpenAnalytics?: () => void;
}

export const CostHeader = ({
  totalCost,
  nodeCount,
  monthlyBudget = 200,
  onBudgetChange,
  selectedRegion = 'us-east',
  onRegionChange,
  onOpenAnalytics,
}: CostHeaderProps) => {
  const isOverBudget = totalCost > monthlyBudget;

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between z-10 text-slate-100">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className="font-bold text-base tracking-tight text-white">Cloud Cost Architect</h1>
        </div>
        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700">
          {nodeCount} {nodeCount === 1 ? 'Node' : 'Nodes'}
        </span>
      </div>

      <div className="flex items-center gap-6">
        {onRegionChange && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Region:</label>
            <select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value as CloudRegion)}
              className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-400"
            >
              {Object.entries(REGION_MULTIPLIERS).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.name} ({info.multiplier}x)
                </option>
              ))}
            </select>
          </div>
        )}

        {onBudgetChange && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Budget ($):</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="w-20 bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-cyan-400 text-right font-mono"
            />
          </div>
        )}

        <div className="flex items-center gap-3 bg-slate-950/60 px-4 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Total Monthly:</span>
          <span
            className={`text-sm font-extrabold font-mono ${
              isOverBudget ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            ${totalCost.toFixed(2)}
          </span>
        </div>

        {onOpenAnalytics && (
          <button
            onClick={onOpenAnalytics}
            className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
        )}
      </div>
    </header>
  );
};