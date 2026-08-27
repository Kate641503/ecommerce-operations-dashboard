import React, { useState } from 'react';
import {
  X,
  Package,
  DollarSign,
  Boxes,
  Building2,
  Calendar,
  FileText,
  Tag,
  CheckCircle,
  AlertTriangle,
  Edit2,
  Save,
  Trash2,
  Share2
} from 'lucide-react';
import { Product, ProductStatus } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct: (updated: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onUpdateProduct,
}) => {
  if (!isOpen || !product) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Product>({ ...product });

  const handleSave = () => {
    // Recalculate profit margin
    const margin = formData.sellingPrice > 0
      ? ((formData.sellingPrice - formData.costPrice) / formData.sellingPrice) * 100
      : 0;
    
    const updated = {
      ...formData,
      profitMargin: Number(margin.toFixed(1)),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    onUpdateProduct(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        id="product-detail-modal"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-400/30">
                  {product.sku}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    product.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : product.status === 'Needs Review'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-md">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                id="edit-product-btn"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Specs</span>
              </button>
            ) : (
              <button
                id="save-product-btn"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Key Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Cost Price</span>
              {isEditing ? (
                <div className="relative mt-1">
                  <span className="absolute left-2 top-1.5 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-5 pr-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>
              ) : (
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  ${product.costPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Selling Price</span>
              {isEditing ? (
                <div className="relative mt-1">
                  <span className="absolute left-2 top-1.5 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-5 pr-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>
              ) : (
                <span className="text-sm font-bold text-indigo-700 mt-0.5 block">
                  ${product.sellingPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Gross Profit Margin</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-emerald-700">
                  {product.profitMargin.toFixed(1)}%
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                  Healthy
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Current Stock</span>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white mt-1"
                />
              ) : (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-sm font-bold ${product.currentStock <= product.reorderThreshold ? 'text-rose-600' : 'text-slate-900'}`}>
                    {product.currentStock} units
                  </span>
                  {product.currentStock <= product.reorderThreshold && (
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">
                      Low
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form Fields & Product Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Product Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-xs text-slate-900 font-medium p-2 bg-slate-50 rounded-lg border border-slate-100">
                  {product.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Category
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-xs text-slate-900 font-medium p-2 bg-slate-50 rounded-lg border border-slate-100">
                  {product.category}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Supplier
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-xs text-slate-900 font-medium p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <span>{product.supplierName}</span>
                  <span className="text-[10px] text-indigo-600 font-medium">Verified Partner</span>
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Status
              </label>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductStatus })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Needs Review">Needs Review</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              ) : (
                <p className="text-xs text-slate-900 font-medium p-2 bg-slate-50 rounded-lg border border-slate-100">
                  {product.status} (Listing: {product.listingStatus})
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Product Description & Key Bullet Points
            </label>
            {isEditing ? (
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />
            ) : (
              <p className="text-xs text-slate-700 p-3 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Listing Channels & Velocity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                Active Listing Channels
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.listingChannels.map((channel) => (
                  <span
                    key={channel}
                    className="text-[11px] font-medium bg-white text-slate-700 px-2 py-1 rounded border border-slate-200 shadow-2xs"
                  >
                    ✓ {channel}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-semibold text-slate-700 block mb-1">
                Monthly Sales Velocity & Reorder Trigger
              </span>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-slate-600">Velocity: <strong>{product.salesVelocity} units/mo</strong></span>
                <span className="text-slate-600">Reorder Threshold: <strong>{product.reorderThreshold} units</strong></span>
              </div>
            </div>
          </div>

          {/* Notes & VA Log */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Virtual Assistant Operational Notes
            </label>
            {isEditing ? (
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg text-xs text-indigo-950">
                <span className="font-semibold text-indigo-900">VA Note (Catherine Ngina): </span>
                {product.notes}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Last modified: <strong>{product.lastUpdated}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
