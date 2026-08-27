import React, { useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  Mail,
  Phone,
  Clock,
  Award,
  Star,
  CheckCircle2,
  ExternalLink,
  Send
} from 'lucide-react';
import { Supplier } from '../types';

interface SuppliersViewProps {
  suppliers: Supplier[];
  onOpenAddSupplier: () => void;
  searchQuery: string;
}

export const SuppliersView: React.FC<SuppliersViewProps> = ({
  suppliers,
  onOpenAddSupplier,
  searchQuery: globalSearch,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [activeContactSupplier, setActiveContactSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter((s) => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return (
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.contactPerson.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Supplier & Logistics Directory ({suppliers.length} Partners)
            </h2>
            <p className="text-xs text-slate-500">
              Lead times, MOQ terms, quality audit ratings, and communication records
            </p>
          </div>
        </div>

        <button
          id="suppliers-add-btn"
          onClick={onOpenAddSupplier}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Supplier</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search suppliers by name, category, representative..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Products</th>
                <th className="py-3 px-3">Contact Person</th>
                <th className="py-3 px-3">Lead Time</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Order</th>
                <th className="py-3 px-3">Performance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSuppliers.map((sup) => (
                <tr key={sup.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Supplier Name */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{sup.name}</div>
                    <div className="text-[10px] text-slate-400">MOQ: {sup.minimumOrderQty} units • {sup.paymentTerms}</div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    {sup.category}
                  </td>

                  {/* Products count */}
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-900">
                    {sup.productCount} active SKUs
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">{sup.contactPerson}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{sup.email}</span>
                    </div>
                  </td>

                  {/* Lead Time */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">{sup.leadTimeDays} days</span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {sup.status}
                    </span>
                  </td>

                  {/* Last Order */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 text-[11px]">
                    {sup.lastOrderDate}
                  </td>

                  {/* Performance */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span>{sup.performanceScore}%</span>
                      <span className="text-amber-500 text-[11px] flex items-center">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {sup.rating}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setActiveContactSupplier(sup)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Contact PO</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Contact / PO Template Drawer / Modal */}
      {activeContactSupplier && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-xs">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">
                  VA Supplier Communication: {activeContactSupplier.name}
                </h3>
                <p className="text-[11px] text-slate-300">To: {activeContactSupplier.email}</p>
              </div>
              <button
                onClick={() => setActiveContactSupplier(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subject</label>
                <input
                  readOnly
                  value={`[Purchase Order & Lead Time Confirmation] - ${activeContactSupplier.name} / Catherine Ngina`}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Message Body (Standard VA Template)</label>
                <textarea
                  readOnly
                  rows={6}
                  value={`Hello ${activeContactSupplier.contactPerson},\n\nHope this message finds you well.\n\nI am following up on behalf of our e-commerce operations team to verify current production lead times (${activeContactSupplier.leadTimeDays} days target) and confirm replenishment stock availability for our upcoming scheduled purchase order under ${activeContactSupplier.paymentTerms} terms.\n\nPlease confirm latest unit pricing and earliest container dispatch cutoffs.\n\nBest regards,\nCatherine Ngina\nVirtual Assistant — E-Commerce & Administrative Operations`}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-700 leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Template generated by VA hub</span>
              <button
                onClick={() => {
                  alert(`Message drafted and logged to communication history for ${activeContactSupplier.name}`);
                  setActiveContactSupplier(null);
                }}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Log & Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
