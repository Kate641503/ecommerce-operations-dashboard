import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Layers
} from 'lucide-react';
import { ProductResearchItem, ResearchStatus, Product } from '../types';

interface ProductResearchViewProps {
  researchItems: ProductResearchItem[];
  onOpenAddResearch: () => void;
  onUpdateResearchStatus: (id: string, newStatus: ResearchStatus) => void;
  onConvertToProduct: (item: ProductResearchItem) => void;
  searchQuery: string;
}

export const ProductResearchView: React.FC<ProductResearchViewProps> = ({
  researchItems,
  onOpenAddResearch,
  onUpdateResearchStatus,
  onConvertToProduct,
  searchQuery: globalSearch,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<ProductResearchItem | null>(null);

  const filteredItems = useMemo(() => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return researchItems.filter((item) => {
      const matchesSearch =
        !q ||
        item.productName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.targetAudience.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' || item.researchStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [researchItems, localSearch, globalSearch, statusFilter]);

  return (
    <div className="space-y-5">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Product Research & Sourcing Feasibility Workspace
            </h2>
            <p className="text-xs text-slate-500">
              Virtual Assistant opportunity pipeline • Benchmarking margin %, search volume, and competitor pricing
            </p>
          </div>
        </div>

        <button
          id="add-research-btn"
          onClick={onOpenAddResearch}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Product Research</span>
        </button>
      </div>

      {/* Sourcing Methodology Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block">
                VA Sourcing Qualification Criteria:
              </span>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Target &gt;60% gross profit margin • Monthly search volume &gt; 15,000 • Verified supplier lead time &lt; 16 days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span className="bg-indigo-500/20 px-2 py-1 rounded border border-indigo-400/20">
              {researchItems.filter(r => r.researchStatus === 'Approved').length} Approved for Listing
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search research pipeline..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="All">All Research Statuses</option>
            <option value="Researching">Researching</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Approved">Approved</option>
            <option value="Needs Review">Needs Review</option>
          </select>
        </div>
      </div>

      {/* Research Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Opportunity Product</th>
                <th className="py-3 px-3">Market Demand</th>
                <th className="py-3 px-3">Search Vol.</th>
                <th className="py-3 px-3">Supplier Cost</th>
                <th className="py-3 px-3">Competitor Avg</th>
                <th className="py-3 px-3">Target Price</th>
                <th className="py-3 px-3">Est. Margin</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Product */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600">
                      {item.productName}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.category} • Added: {item.dateAdded}
                    </div>
                  </td>

                  {/* Market Demand */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.marketDemand === 'Very High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.marketDemand === 'High'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.marketDemand}
                    </span>
                  </td>

                  {/* Search Vol */}
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-800">
                    {item.searchVolumeMonthly.toLocaleString()} /mo
                  </td>

                  {/* Supplier Cost */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                    ${item.supplierCost.toFixed(2)}
                  </td>

                  {/* Competitor Avg */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                    ${item.competitorPrice.toFixed(2)}
                  </td>

                  {/* Suggested Selling Price */}
                  <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-900">
                    ${item.suggestedSellingPrice.toFixed(2)}
                  </td>

                  {/* Est Margin */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {item.estimatedMargin.toFixed(1)}%
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={item.researchStatus}
                      onChange={(e) => onUpdateResearchStatus(item.id, e.target.value as ResearchStatus)}
                      className={`text-[11px] font-semibold px-2 py-1 rounded border ${
                        item.researchStatus === 'Approved'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : item.researchStatus === 'Reviewed'
                          ? 'bg-blue-50 border-blue-300 text-blue-800'
                          : item.researchStatus === 'Needs Review'
                          ? 'bg-amber-50 border-amber-300 text-amber-800'
                          : 'bg-slate-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      <option value="Researching">Researching</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Approved">Approved</option>
                      <option value="Needs Review">Needs Review</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    {item.researchStatus === 'Approved' ? (
                      <button
                        onClick={() => onConvertToProduct(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors shadow-xs"
                        title="Draft into active product catalog"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>List in Catalog</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                      >
                        View Notes
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden text-xs">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-400/30">
                  {selectedItem.researchStatus}
                </span>
                <h3 className="font-bold text-sm text-white mt-1">{selectedItem.productName}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Supplier Cost</span>
                  <strong className="text-slate-900 text-sm">${selectedItem.supplierCost.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Retail</span>
                  <strong className="text-indigo-700 text-sm">${selectedItem.suggestedSellingPrice.toFixed(2)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Gross Margin</span>
                  <strong className="text-emerald-700 text-sm">{selectedItem.estimatedMargin.toFixed(1)}%</strong>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-900 block mb-1">Target Customer Audience</span>
                <p className="p-2.5 bg-slate-50 rounded-lg text-slate-700 border border-slate-100">
                  {selectedItem.targetAudience}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                  <span className="font-semibold text-emerald-900 flex items-center gap-1 mb-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> Sourcing Pros
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {selectedItem.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg">
                  <span className="font-semibold text-rose-900 flex items-center gap-1 mb-1">
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-600" /> Sourcing Risks / Cons
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {selectedItem.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                <span className="font-semibold text-indigo-900 block mb-1">Virtual Assistant Research Log</span>
                <p className="text-slate-700 leading-relaxed">{selectedItem.notes}</p>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-md"
              >
                Close
              </button>
              {selectedItem.researchStatus === 'Approved' && (
                <button
                  onClick={() => {
                    onConvertToProduct(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Transfer to Active Catalog</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
