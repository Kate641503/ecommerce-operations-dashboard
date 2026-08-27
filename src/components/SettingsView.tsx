import React, { useState } from 'react';
import {
  Settings,
  User,
  Store,
  Bell,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Save,
  ShieldCheck,
  Mail,
  Award,
  Sparkles
} from 'lucide-react';

interface SettingsViewProps {
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetData }) => {
  const [storeName, setStoreName] = useState('Apex Commerce Global');
  const [vaName, setVaName] = useState('Catherine Ngina');
  const [vaRole, setVaRole] = useState('Virtual Assistant — E-Commerce & Administrative Operations');
  const [vaEmail, setVaEmail] = useState('catherine.ngina.va@portfolio.example');
  const [currency, setCurrency] = useState('USD ($)');
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [defaultThreshold, setDefaultThreshold] = useState(15);
  const [autoEmailSuppliers, setAutoEmailSuppliers] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Operations Hub Settings & VA Profile Configuration
            </h2>
            <p className="text-xs text-slate-500">
              Configure store defaults, threshold triggers, and portfolio demonstration preferences
            </p>
          </div>
        </div>

        {savedSuccess && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Preferences saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
        {/* Virtual Assistant Profile Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-sm text-slate-900">Virtual Assistant Portfolio Profile</h3>
            </div>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Lead Operations Specialist
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Professional Name</label>
              <input
                type="text"
                value={vaName}
                onChange={(e) => setVaName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Portfolio Title / Role</label>
              <input
                type="text"
                value={vaRole}
                onChange={(e) => setVaRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Email</label>
              <input
                type="email"
                value={vaEmail}
                onChange={(e) => setVaEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Timezone / Operating Hours</label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Store & Inventory Operational Defaults */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Store className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">E-Commerce Store & Logistics Defaults</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Store / Business Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Default Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CAD ($)">CAD ($)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Low Stock Trigger (Units)</label>
              <input
                type="number"
                min="5"
                max="100"
                value={defaultThreshold}
                onChange={(e) => setDefaultThreshold(parseInt(e.target.value) || 15)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lowStockAlerts}
                onChange={(e) => setLowStockAlerts(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700">
                Trigger visual notifications when inventory level falls below reorder threshold
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoEmailSuppliers}
                onChange={(e) => setAutoEmailSuppliers(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-slate-700">
                Auto-generate replenishment purchase order drafts for Catherine Ngina review
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all demo catalog, orders, and inventory data back to original state?')) {
                onResetData();
              }
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Initial State</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
