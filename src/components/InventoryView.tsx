import React, { useState, useMemo } from 'react';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Truck,
  Check
} from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onRestock: (sku: string, qty: number) => void;
  onOpenQuickAction: (actionType: string) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  onRestock,
  onOpenQuickAction,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [restockedSku, setRestockedSku] = useState<string | null>(null);

  // Status metrics
  const inStockCount = inventory.filter((i) => i.unitsAvailable > i.reorderThreshold).length;
  const lowStockCount = inventory.filter((i) => i.unitsAvailable <= i.reorderThreshold && i.unitsAvailable > 0).length;
  const outOfStockCount = inventory.filter((i) => i.unitsAvailable === 0).length;
  const reorderRequiredCount = inventory.filter((i) => i.unitsAvailable <= i.reorderThreshold || i.reorderStatus === 'Critical Shortage').length;

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return inventory.filter((item) => {
      const matchesSearch =
        !q ||
        item.productName.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.supplierName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'In Stock' && item.unitsAvailable > item.reorderThreshold) ||
        (statusFilter === 'Low Stock' && item.unitsAvailable <= item.reorderThreshold && item.unitsAvailable > 0) ||
        (statusFilter === 'Out of Stock' && item.unitsAvailable === 0) ||
        (statusFilter === 'Reorder Required' && item.unitsAvailable <= item.reorderThreshold);

      return matchesSearch && matchesStatus;
    });
  }, [inventory, search, statusFilter]);

  const handleQuickRestock = (sku: string) => {
    onRestock(sku, 50);
    setRestockedSku(sku);
    setTimeout(() => setRestockedSku(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards (4 Status summaries as requested) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => setStatusFilter('In Stock')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'In Stock' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">In Stock</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{inStockCount} Items</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Healthy buffer &gt; 14 days supply</p>
        </div>

        <div
          onClick={() => setStatusFilter('Low Stock')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Low Stock' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Low Stock</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">{lowStockCount} Items</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Approaching minimum threshold</p>
        </div>

        <div
          onClick={() => setStatusFilter('Out of Stock')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Out of Stock' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Out of Stock</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2">{outOfStockCount} Item</div>
          <p className="text-[11px] text-rose-700 font-medium mt-1">100 units incoming in transit</p>
        </div>

        <div
          onClick={() => setStatusFilter('Reorder Required')}
          className={`bg-white rounded-xl border p-4 shadow-xs transition-all cursor-pointer ${
            statusFilter === 'Reorder Required' ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Reorder Required</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-indigo-600 mt-2">{reorderRequiredCount} Items</div>
          <p className="text-[11px] text-indigo-700 font-medium mt-1">POs assigned to Catherine Ngina</p>
        </div>
      </div>

      {/* Professional Low-Stock Alert Banner Panel */}
      <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-rose-600 text-white rounded-lg flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                Virtual Assistant Replenishment Protocol Active
              </h3>
              <p className="text-xs text-rose-900 mt-0.5 leading-relaxed">
                <strong>Active Noise Cancelling Headphones (ANCH-BT5-BLK)</strong> has only 6 units remaining with an average velocity of 55 units/month. Supplier lead time is 14 days. Draft PO prepared for 50 units.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenQuickAction('task')}
            className="self-start sm:self-auto px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            Authorize Purchase Order
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory by SKU, product, supplier..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="All">All Stock Levels</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Reorder Required">Reorder Required</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Product & SKU</th>
                <th className="py-3 px-3">Supplier</th>
                <th className="py-3 px-3">Stock Level & Progress</th>
                <th className="py-3 px-3">Units Available</th>
                <th className="py-3 px-3">Units Sold</th>
                <th className="py-3 px-3">Reorder Threshold</th>
                <th className="py-3 px-3">Reorder Status</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.map((item) => {
                const stockPercent = Math.min(100, Math.round((item.unitsAvailable / (item.reorderThreshold * 2.5)) * 100));
                const isCritical = item.unitsAvailable <= item.reorderThreshold;
                const isRestocked = restockedSku === item.sku;

                return (
                  <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product & SKU */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{item.productName}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded text-slate-700">{item.sku}</span>
                        <span>•</span>
                        <span>{item.category}</span>
                      </div>
                    </td>

                    {/* Supplier */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {item.supplierName}
                    </td>

                    {/* Stock Level Progress */}
                    <td className="py-3 px-3 min-w-[140px]">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span>{item.daysOfSupply} days supply</span>
                        <span>{item.unitsAvailable} / {item.reorderThreshold * 2}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            item.unitsAvailable === 0
                              ? 'bg-slate-300 w-0'
                              : isCritical
                              ? 'bg-rose-500'
                              : stockPercent < 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.max(5, stockPercent)}%` }}
                        />
                      </div>
                    </td>

                    {/* Units Available */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`font-bold ${isCritical ? 'text-rose-600' : 'text-slate-900'}`}>
                        {item.unitsAvailable} units
                      </span>
                      {item.incomingStock > 0 && (
                        <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
                          +{item.incomingStock} incoming
                        </div>
                      )}
                    </td>

                    {/* Units Sold */}
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-700">
                      {item.unitsSold} units
                    </td>

                    {/* Threshold */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                      {item.reorderThreshold} units
                    </td>

                    {/* Reorder Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.reorderStatus === 'Critical Shortage'
                            ? 'bg-rose-100 text-rose-800'
                            : item.reorderStatus === 'Low Stock Alert'
                            ? 'bg-amber-100 text-amber-800'
                            : item.reorderStatus === 'Order Placed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.reorderStatus}
                      </span>
                    </td>

                    {/* Quick Restock button */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleQuickRestock(item.sku)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                          isRestocked
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isRestocked ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Restocked +50</span>
                          </>
                        ) : (
                          <span>+ Restock 50</span>
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
