import { useState } from 'react';
import { Search, Plus, RotateCcw, LayoutTemplate, Sparkles, X } from 'lucide-react';
import { CloudService } from '../../types';
import { CLOUD_SERVICES } from '../../data/cloudCatalog';

interface ServiceCatalogProps {
  onAddNode: (service: CloudService) => void;
  onLoadPreset: () => void;
  onClearCanvas: () => void;
}

export const ServiceCatalog = ({
  onAddNode,
  onLoadPreset,
  onClearCanvas,
}: ServiceCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [catalog, setCatalog] = useState<CloudService[]>(CLOUD_SERVICES);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Custom Service Form State
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('Compute');
  const [customProvider, setCustomProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');
  const [customCost, setCustomCost] = useState('15');
  const [customUnitLabel, setCustomUnitLabel] = useState('instance');

  const categories = ['All', 'Compute', 'Database', 'Storage', 'Networking', 'Serverless', 'Custom'];

  const filteredServices = catalog.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleCreateCustomService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newService: CloudService = {
      id: `custom-${Date.now()}`,
      name: customName,
      category: customCategory,
      provider: customProvider,
      costPerUnit: Number(customCost) || 10,
      unitLabel: customUnitLabel || 'unit',
      defaultUnits: 1,
    };

    setCatalog((prev) => [newService, ...prev]);
    onAddNode(newService);
    setIsCustomModalOpen(false);
    setCustomName('');
  };

  return (
    <aside className="w-80 bg-slate-950/90 border-r border-slate-800/80 flex flex-col h-full z-10">
      {/* Search & Actions Header */}
      <div className="p-4 space-y-3 border-b border-slate-800/80">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onLoadPreset}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-cyan-400 font-semibold transition"
          >
            <LayoutTemplate className="w-3.5 h-3.5" /> Demo Architecture
          </button>
          <button
            onClick={onClearCanvas}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-rose-400 transition"
            title="Clear Canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 rounded-xl text-xs font-bold transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Add Custom Resource
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 p-3 overflow-x-auto no-scrollbar border-b border-slate-800/50 text-[11px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredServices.length === 0 ? (
          <p className="text-center text-xs text-slate-500 py-6">No matching services found.</p>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-3 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl flex items-center justify-between group transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{service.name}</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                    {service.provider}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  ${service.costPerUnit} / {service.unitLabel} / mo
                </p>
              </div>

              <button
                onClick={() => onAddNode(service)}
                className="p-1.5 bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-500 text-cyan-300 hover:text-slate-950 rounded-lg transition"
                title="Add to Canvas"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Custom Service Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
          <form onSubmit={handleCreateCustomService} className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-400">Add Custom Resource</h3>
              <button type="button" onClick={() => setIsCustomModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Resource Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom Microservice API"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500/50 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Provider</label>
                  <select
                    value={customProvider}
                    onChange={(e) => setCustomProvider(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                  >
                    <option value="aws">AWS</option>
                    <option value="gcp">GCP</option>
                    <option value="azure">AZURE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                  >
                    <option value="Compute">Compute</option>
                    <option value="Database">Database</option>
                    <option value="Storage">Storage</option>
                    <option value="Networking">Networking</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Cost Per Unit ($/mo)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={customCost}
                    onChange={(e) => setCustomCost(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500/50 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Unit Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GB / instance"
                    value={customUnitLabel}
                    onChange={(e) => setCustomUnitLabel(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500/50 text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition"
              >
                Create & Add to Canvas
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
};