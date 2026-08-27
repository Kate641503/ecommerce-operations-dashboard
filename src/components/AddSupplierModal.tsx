import React, { useState } from 'react';
import { X, Building2, Plus } from 'lucide-react';
import { Supplier } from '../types';

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier: (supplier: Supplier) => void;
}

export const AddSupplierModal: React.FC<AddSupplierModalProps> = ({
  isOpen,
  onClose,
  onAddSupplier,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Consumer Electronics & Peripherals');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [leadTimeDays, setLeadTimeDays] = useState(10);
  const [minimumOrderQty, setMinimumOrderQty] = useState(25);
  const [paymentTerms, setPaymentTerms] = useState('Net 30');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSupplier: Supplier = {
      id: `sup-${Date.now()}`,
      name: name.trim(),
      category: category.trim(),
      productCount: 1,
      contactPerson: contactPerson.trim() || 'Account Manager',
      email: email.trim() || `orders@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      phone: phone.trim() || '+1 (555) 019-2834',
      leadTimeDays: Number(leadTimeDays) || 10,
      status: 'Active',
      lastOrderDate: new Date().toISOString().split('T')[0],
      performanceScore: 95,
      rating: 4.8,
      minimumOrderQty: Number(minimumOrderQty) || 25,
      paymentTerms: paymentTerms,
    };

    onAddSupplier(newSupplier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add New Supplier</h3>
              <p className="text-xs text-slate-300">Register manufacturing partner and logistics terms</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Supplier Company Name *</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Zenith Wholesale Goods"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Product Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Lead Time (Days)</label>
              <input
                type="number"
                min="1"
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(parseInt(e.target.value) || 7)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Representative</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Elena Ramos (Sales)"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wholesale@zenith.com"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Minimum Order Qty (MOQ)</label>
              <input
                type="number"
                min="1"
                value={minimumOrderQty}
                onChange={(e) => setMinimumOrderQty(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
                <option value="50% Advance, 50% on B/L">50% Advance, 50% on B/L</option>
              </select>
            </div>
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
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Supplier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
