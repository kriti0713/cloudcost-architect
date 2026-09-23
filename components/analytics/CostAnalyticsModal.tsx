'use client';

import React from 'react';
import { X, PieChart } from 'lucide-react';
import { ArchitectureNodeData } from '@/types';

interface CostAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: any[];
  totalCost: number;
  regionName: string;
}

export const CostAnalyticsModal = ({
  isOpen,
  onClose,
  nodes,
  totalCost,
  regionName,
}: CostAnalyticsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Cost Analysis Breakdown</h3>
            <p className="text-xs text-slate-400">Region: {regionName}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
          {nodes.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">No nodes added to canvas yet.</p>
          ) : (
            nodes.map((node) => {
              const nodeData = node.data as ArchitectureNodeData;
              const nodeCost = nodeData?.monthlyCost || 0;
              const percentage = totalCost > 0 ? ((nodeCost / totalCost) * 100).toFixed(1) : '0';

              return (
                <div
                  key={node.id}
                  className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{nodeData?.label}</h4>
                    <p className="text-[10px] text-slate-400">
                      {nodeData?.units} x {nodeData?.service?.unitLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">${nodeCost.toFixed(2)}</span>
                    <p className="text-[10px] text-slate-500">{percentage}% of total</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300">Total Monthly Estimate</span>
          <span className="text-base font-black text-cyan-400 font-mono">${totalCost.toFixed(2)}/mo</span>
        </div>
      </div>
    </div>
  );
};