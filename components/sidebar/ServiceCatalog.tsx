'use client';

import React from 'react';
import { CloudService } from '@/types';
import { CLOUD_SERVICES } from '@/data/cloudCatalog';
import { Cpu, Database, HardDrive, Plus, Sparkles, Trash2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Database,
  HardDrive,
};

interface ServiceCatalogProps {
  onAddNode: (service: CloudService) => void;
  onLoadPreset?: () => void;
  onClearCanvas?: () => void;
}

export const ServiceCatalog = ({
  onAddNode,
  onLoadPreset,
  onClearCanvas,
}: ServiceCatalogProps) => {
  return (
    <aside className="w-72 bg-slate-900/90 border-r border-slate-800 p-4 flex flex-col justify-between h-full text-slate-100 backdrop-blur-md">
      <div>
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 mb-4">
          Cloud Catalog
        </h2>
        <div className="space-y-3">
          {CLOUD_SERVICES.map((service) => {
            const Icon = iconMap[service.iconName] || Cpu;
            return (
              <div
                key={service.id}
                onClick={() => onAddNode(service)}
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-xl cursor-pointer transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-700/50 rounded-lg group-hover:text-cyan-400 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold">{service.name}</h3>
                    <p className="text-[10px] text-slate-400">${service.costPerUnit}/unit</p>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-2">
        {onLoadPreset && (
          <button
            onClick={onLoadPreset}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium border border-cyan-500/30 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load Architecture Preset
          </button>
        )}
        {onClearCanvas && (
          <button
            onClick={onClearCanvas}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-medium border border-rose-500/30 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Canvas
          </button>
        )}
      </div>
    </aside>
  );
};