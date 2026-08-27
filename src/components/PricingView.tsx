import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowUpDown,
  Sparkles,
  Check,
  RotateCcw
} from 'lucide-react';
import { PricingItem, PricingStatus } from '../types';

interface PricingViewProps {
  pricingItems: PricingItem[];
  onApplyRecommendation: (productId: string, newPrice: number) => void;
  searchQuery: string;
}

export const PricingView: React.FC<PricingViewProps> = ({
  pricingItems,
  onApplyRecommendation,
  searchQuery: globalSearch,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [appliedId, setAppliedId] = useState<string | null>(null);

  // Status counts
  const competitiveCount = pricingItems.filter((p) => p.pricingStatus === 'Competitive').length;
  const aboveMarketCount = pricingItems.filter((p) => p.pricingStatus === 'Above Market').length;
  const belowMarketCount = pricingItems.filter((p) => p.pricingStatus === 'Below Market').length;
  const needsReviewCount = pricingItems.filter((p) => p.pricingStatus === 'Needs Review').length;

  const filteredItems = useMemo(() => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return pricingItems.filter((item) => {
      const matchesSearch =
        !q ||
        item.productName.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' || item.pricingStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [pricingItems, localSearch, globalSearch, statusFilter]);

  const handleApply = (productId: string, newPrice: number) => {
    onApplyRecommendation(productId, newPrice);
    setAppliedId(productId);
    setTimeout(() => setAppliedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Pricing Strategy & Competitive Margin Hub
            </h2>
            <p className="text-xs text-slate-500">
              Competitor price benchmarking, target 60–75% margins, and automated repricing recommendations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Target Margin Rule: <strong>65.0% Baseline</strong>
          </span>
        </div>
      </div>

      {/* Pricing Analysis Cards (4 Status categories as requested) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => setStatusFilter('Competitive')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Competitive' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Competitive</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{competitiveCount} SKUs</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Balanced margin & conversion</p>
        </div>

        <div
          onClick={() => setStatusFilter('Above Market')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Above Market' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Above Market</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">{aboveMarketCount} SKUs</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Priced higher than competitors</p>
        </div>

        <div
          onClick={() => setStatusFilter('Below Market')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Below Market' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Below Market</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2">{belowMarketCount} SKUs</div>
          <p className="text-[11px] text-blue-700 font-medium mt-1">Opportunity to capture more margin</p>
        </div>

        <div
          onClick={() => setStatusFilter('Needs Review')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Needs Review' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Needs Review</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2">{needsReviewCount} SKUs</div>
          <p className="text-[11px] text-rose-700 font-medium mt-1">Supplier cost or price shift</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search SKU, product name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="All">All Pricing Statuses</option>
            <option value="Competitive">Competitive</option>
            <option value="Above Market">Above Market</option>
            <option value="Below Market">Below Market</option>
            <option value="Needs Review">Needs Review</option>
          </select>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Product & SKU</th>
                <th className="py-3 px-3">Current Cost</th>
                <th className="py-3 px-3">Current Price</th>
                <th className="py-3 px-3">Competitor Avg</th>
                <th className="py-3 px-3">Profit Margin</th>
                <th className="py-3 px-3">Recommended Price</th>
                <th className="py-3 px-3">Pricing Status</th>
                <th className="py-3 px-4 text-right">Reprice Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.map((item) => {
                const isApplied = appliedId === item.productId;
                return (
                  <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{item.productName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.sku}</div>
                    </td>

                    {/* Cost */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-medium">
                      ${item.currentCost.toFixed(2)}
                    </td>

                    {/* Current Price */}
                    <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-900">
                      ${item.currentPrice.toFixed(2)}
                    </td>

                    {/* Competitor Avg */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                      ${item.competitorAverage.toFixed(2)}
                      <span className={`text-[10px] ml-1 font-semibold ${item.priceDelta > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        ({item.priceDelta > 0 ? `+$${item.priceDelta.toFixed(2)}` : `-$${Math.abs(item.priceDelta).toFixed(2)}`})
                      </span>
                    </td>

                    {/* Profit Margin */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {item.profitMargin.toFixed(1)}%
                      </span>
                    </td>

                    {/* Recommended Price */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        ${item.recommendedPrice.toFixed(2)}
                      </span>
                    </td>

                    {/* Pricing Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.pricingStatus === 'Competitive'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.pricingStatus === 'Above Market'
                            ? 'bg-amber-100 text-amber-800'
                            : item.pricingStatus === 'Below Market'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.pricingStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleApply(item.productId, item.recommendedPrice)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                          isApplied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Updated!</span>
                          </>
                        ) : (
                          <span>Apply Recommended</span>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
