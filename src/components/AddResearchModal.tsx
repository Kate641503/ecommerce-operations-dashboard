import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { ProductResearchItem, ResearchStatus, MarketDemand } from '../types';

interface AddResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResearch: (item: ProductResearchItem) => void;
}

export const AddResearchModal: React.FC<AddResearchModalProps> = ({
  isOpen,
  onClose,
  onAddResearch,
}) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Desk Accessories');
  const [marketDemand, setMarketDemand] = useState<MarketDemand>('High');
  const [searchVolumeMonthly, setSearchVolumeMonthly] = useState(35000);
  const [competitorPrice, setCompetitorPrice] = useState(49.99);
  const [suggestedSellingPrice, setSuggestedSellingPrice] = useState(44.99);
  const [supplierCost, setSupplierCost] = useState(14.0);
  const [researchStatus, setResearchStatus] = useState<ResearchStatus>('Researching');
  const [targetAudience, setTargetAudience] = useState('Remote professionals & ergonomic office setups');
  const [prosText, setProsText] = useState('High consumer interest, compact shipping size');
  const [consText, setConsText] = useState('Requires careful packaging for fragile corners');
  const [notes, setNotes] = useState('Researched by Catherine Ngina. Supplier sample requested.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const estimatedMargin = suggestedSellingPrice > 0
      ? ((suggestedSellingPrice - supplierCost) / suggestedSellingPrice) * 100
      : 0;

    const newItem: ProductResearchItem = {
      id: `res-${Date.now()}`,
      productName: productName.trim(),
      category: category.trim(),
      marketDemand,
      searchVolumeMonthly: Number(searchVolumeMonthly) || 20000,
      competitorPrice: Number(competitorPrice) || 0,
      suggestedSellingPrice: Number(suggestedSellingPrice) || 0,
      supplierCost: Number(supplierCost) || 0,
      estimatedMargin: Number(estimatedMargin.toFixed(1)),
      researchStatus,
      pros: prosText.split(',').map((p) => p.trim()).filter(Boolean),
      cons: consText.split(',').map((c) => c.trim()).filter(Boolean),
      targetAudience: targetAudience.trim(),
      notes: notes.trim(),
      dateAdded: new Date().toISOString().split('T')[0],
    };

    onAddResearch(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Product Sourcing Research</h3>
              <p className="text-xs text-slate-300">Analyze market feasibility before listing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Product Opportunity Name *</label>
            <input
              required
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Ergonomic Silicone Mouse Wrist Rest"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Market Demand</label>
              <select
                value={marketDemand}
                onChange={(e) => setMarketDemand(e.target.value as MarketDemand)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Seasonal">Seasonal</option>
                <option value="Niche">Niche</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Supplier Cost ($)</label>
              <input
                type="number"
                step="0.01"
                value={supplierCost}
                onChange={(e) => setSupplierCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Competitor Avg ($)</label>
              <input
                type="number"
                step="0.01"
                value={competitorPrice}
                onChange={(e) => setCompetitorPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={suggestedSellingPrice}
                onChange={(e) => setSuggestedSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Monthly Search Volume</label>
              <input
                type="number"
                value={searchVolumeMonthly}
                onChange={(e) => setSearchVolumeMonthly(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Research Status</label>
              <select
                value={researchStatus}
                onChange={(e) => setResearchStatus(e.target.value as ResearchStatus)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Researching">Researching</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Approved">Approved</option>
                <option value="Needs Review">Needs Review</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Pros (comma separated)</label>
            <input
              type="text"
              value={prosText}
              onChange={(e) => setProsText(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Cons / Risks (comma separated)</label>
            <input
              type="text"
              value={consText}
              onChange={(e) => setConsText(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">VA Sourcing Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Research</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
