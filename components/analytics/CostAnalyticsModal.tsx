import { X, PieChart, Download, Globe, Lightbulb, ShieldAlert, CheckCircle2 } from 'lucide-react';

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

  // Aggregate expenditure by service category
  const categoryTotals: Record<string, number> = {};
  nodes.forEach((node) => {
    const cat = node?.data?.service?.category || 'Compute';
    const cost = Number(node?.data?.monthlyCost) || 0;
    categoryTotals[cat] = (categoryTotals[cat] || 0) + cost;
  });

  // Aggregate expenditure by cloud provider
  const providerTotals: Record<string, number> = {};
  nodes.forEach((node) => {
    const provider = String(node?.data?.service?.provider || 'aws').toUpperCase();
    const cost = Number(node?.data?.monthlyCost) || 0;
    providerTotals[provider] = (providerTotals[provider] || 0) + cost;
  });

  // Rule-based Optimization Engine
  const recommendations: string[] = [];
  const computeCost = categoryTotals['Compute'] || 0;
  const storageCost = categoryTotals['Storage'] || 0;

  if (computeCost > 150) {
    recommendations.push('High Compute usage detected. Consider 1-year or 3-year Reserved Instances (RI) / Savings Plans to reduce compute spend by up to 35%.');
  }
  if (storageCost > 50) {
    recommendations.push('Storage costs exceeding baseline. Enable S3 Lifecycle policies or Blob Auto-tiering to transition infrequently accessed data to Cold/Glacier storage.');
  }
  if (nodes.length > 5) {
    recommendations.push('Multi-resource architecture detected. Implement Auto Scaling groups and CloudWatch/Datadog alerts to dynamic scale instances during low-traffic periods.');
  }
  if (recommendations.length === 0 && nodes.length > 0) {
    recommendations.push('Architecture cost allocation looks balanced across active cloud services.');
  }

  const handleExportJSON = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      region: regionName,
      totalMonthlyCost: totalCost.toFixed(2),
      nodeCount: nodes.length,
      recommendations,
      infrastructure: nodes.map((n) => ({
        service: n?.data?.service?.name || 'Unknown Service',
        provider: n?.data?.service?.provider || 'aws',
        units: n?.data?.units || 1,
        monthlyCost: (Number(n?.data?.monthlyCost) || 0).toFixed(2),
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cloudcost-architect-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const categories = Object.keys(categoryTotals);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold">Cost Breakdown & Analytics</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Active Region Info */}
          <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <span className="flex items-center gap-2 text-slate-400 font-medium">
              <Globe className="w-4 h-4 text-cyan-400" /> Active Region
            </span>
            <span className="font-bold text-cyan-300">{regionName}</span>
          </div>

          {/* Category Breakdown Progress Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Spending by Category</h3>
            {categories.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No resources active on canvas.</p>
            ) : (
              categories.map((cat) => {
                const amount = categoryTotals[cat] || 0;
                const pct = totalCost > 0 ? (amount / totalCost) * 100 : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="capitalize text-slate-300">{cat}</span>
                      <span className="text-slate-400">${amount.toFixed(2)} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Provider Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Spending by Provider</h3>
            <div className="grid grid-cols-3 gap-3">
              {['AWS', 'GCP', 'AZURE'].map((provider) => {
                const amount = providerTotals[provider] || 0;
                return (
                  <div key={provider} className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-slate-500">{provider}</p>
                    <p className="text-xs font-bold text-cyan-300">${amount.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Smart Cost Optimization Recommendations */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Cost Optimization Tips</h3>
            </div>
            <div className="space-y-2">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end gap-3">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 rounded-xl transition text-xs font-bold"
          >
            <Download className="w-4 h-4" /> Export Executive Report (JSON)
          </button>
        </div>
      </div>
    </div>
  );
};