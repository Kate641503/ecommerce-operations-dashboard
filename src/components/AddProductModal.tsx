import React, { useState } from 'react';
import { X, Package, Plus } from 'lucide-react';
import { Product, ProductStatus } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Desk Accessories',
    supplierName: 'Urban Supply Co.',
    costPrice: 15.0,
    sellingPrice: 45.0,
    currentStock: 50,
    reorderThreshold: 15,
    status: 'Active' as ProductStatus,
    description: '',
    notes: 'Catalog draft initialized by Catherine Ngina (VA). Sourced from verified supplier.',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim()) return;

    const profitMargin = formData.sellingPrice > 0
      ? ((formData.sellingPrice - formData.costPrice) / formData.sellingPrice) * 100
      : 0;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      category: formData.category,
      supplierId: 'sup-001',
      supplierName: formData.supplierName,
      costPrice: Number(formData.costPrice),
      sellingPrice: Number(formData.sellingPrice),
      profitMargin: Number(profitMargin.toFixed(1)),
      currentStock: Number(formData.currentStock),
      reorderThreshold: Number(formData.reorderThreshold),
      status: formData.status,
      listingStatus: 'Published',
      description: formData.description.trim() || 'High quality retail e-commerce item with verified quality specifications.',
      listingChannels: ['Shopify Store', 'Amazon US'],
      salesVelocity: 25,
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: formData.notes,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        id="add-product-modal"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add New Catalog Product</h3>
              <p className="text-xs text-slate-300">Create SKU specifications and listing data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Product Title *
              </label>
              <input
                id="new-product-name"
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ergonomic Memory Foam Cushion"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                SKU Code *
              </label>
              <input
                id="new-product-sku"
                required
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g. EMFC-BLK-01"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Computer Peripherals">Computer Peripherals</option>
                <option value="Office Furniture">Office Furniture</option>
                <option value="Bags & Accessories">Bags & Accessories</option>
                <option value="Audio Electronics">Audio Electronics</option>
                <option value="Desk Accessories">Desk Accessories</option>
                <option value="Drinkware & Lifestyle">Drinkware & Lifestyle</option>
                <option value="Home & Office Lighting">Home & Office Lighting</option>
                <option value="Mobile Accessories">Mobile Accessories</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Supplier
              </label>
              <select
                value={formData.supplierName}
                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Urban Supply Co.">Urban Supply Co.</option>
                <option value="PrimeGoods Distribution">PrimeGoods Distribution</option>
                <option value="Metro Office Imports">Metro Office Imports</option>
                <option value="GreenCart Wholesale">GreenCart Wholesale</option>
                <option value="Apex Home Supplies">Apex Home Supplies</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Cost Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Selling Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Initial Stock Units
              </label>
              <input
                type="number"
                min="0"
                value={formData.currentStock}
                onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Reorder Threshold
              </label>
              <input
                type="number"
                min="0"
                value={formData.reorderThreshold}
                onChange={(e) => setFormData({ ...formData, reorderThreshold: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Description & Specifications
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key product highlights, dimensions, and materials..."
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-add-product-btn"
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Catalog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
