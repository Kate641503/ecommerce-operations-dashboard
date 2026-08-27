import React, { useState } from 'react';
import {
  Menu,
  Search,
  Plus,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Package,
  Boxes,
  ShoppingBag,
  Building2,
  FileText,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { NavSection } from '../types';

interface HeaderProps {
  currentSection: NavSection;
  onOpenMobileSidebar: () => void;
  onOpenQuickAction: (actionType?: string) => void;
  onNavigate: (section: NavSection) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onOpenMobileSidebar,
  onOpenQuickAction,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const sectionTitles: Record<NavSection, { title: string; subtitle: string }> = {
    dashboard: { title: 'Executive Operations Dashboard', subtitle: 'Real-time overview of catalog, inventory, orders, and VA tasks' },
    products: { title: 'Product Catalog Management', subtitle: 'Manage SKUs, channels, pricing, listing status, and item metadata' },
    inventory: { title: 'Inventory & Stock Control', subtitle: 'Monitor stock levels, reorder thresholds, supplier lead times, and shortages' },
    orders: { title: 'Order Processing & Fulfillment', subtitle: 'Track customer orders, payment validations, 3PL dispatch, and tracking numbers' },
    suppliers: { title: 'Supplier Directory & Logistics', subtitle: 'Manage manufacturer contacts, lead times, MOQ thresholds, and performance' },
    research: { title: 'Product Research & Sourcing', subtitle: 'Analyze market demand, competitor benchmarks, search volumes, and profit margins' },
    pricing: { title: 'Pricing Strategy & Margin Hub', subtitle: 'Competitor price benchmarking, target margin calculations, and dynamic recommendations' },
    tasks: { title: 'VA Task Management & Action Queue', subtitle: 'Daily administrative, operational, and catalog workflow task tracking' },
    reports: { title: 'E-Commerce Analytics & Performance Reports', subtitle: 'Monthly sales metrics, category breakdown, inventory turnover, and profitability' },
    settings: { title: 'Operations Settings & Preferences', subtitle: 'Store configurations, VA operational rules, channel sync, and demo data controls' },
  };

  const currentInfo = sectionTitles[currentSection] || { title: 'Operations Hub', subtitle: 'E-Commerce Workspace' };

  return (
    <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Section Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="mobile-sidebar-toggle"
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                {currentInfo.title}
              </h2>
              <p className="text-xs text-slate-500 hidden sm:block truncate">
                {currentInfo.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Global Search Bar */}
            <div className="relative hidden md:block w-52 lg:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, orders, tasks..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <button
                id="header-quick-action-btn"
                onClick={() => setShowQuickMenu(!showQuickMenu)}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Quick Action</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showQuickMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowQuickMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Create / Record New
                    </div>
                    <button
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenQuickAction('product');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors"
                    >
                      <Package className="w-4 h-4 text-indigo-500" />
                      <span>+ Add Product</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenQuickAction('supplier');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <span>+ Add Supplier</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenQuickAction('order');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-blue-500" />
                      <span>+ Create Order</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenQuickAction('task');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      <span>+ Add VA Task</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenQuickAction('research');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 transition-colors"
                    >
                      <Search className="w-4 h-4 text-purple-500" />
                      <span>+ Run Product Research</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowQuickMenu(false);
                        onNavigate('reports');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 border-t border-slate-100 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-teal-500" />
                      <span>+ Generate Report</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                id="notifications-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">Operational Alerts</span>
                      <span className="text-[10px] font-medium bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">3 Priority</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                      <div
                        onClick={() => {
                          setShowNotifications(false);
                          onNavigate('inventory');
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors text-xs"
                      >
                        <div className="flex items-center gap-1.5 text-rose-600 font-semibold mb-0.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Critical Low Stock Alert</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          Active Noise Cancelling Headphones down to 6 units. Reorder recommended.
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setShowNotifications(false);
                          onNavigate('orders');
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors text-xs"
                      >
                        <div className="flex items-center gap-1.5 text-blue-600 font-semibold mb-0.5">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>37 Pending Queue Orders</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          2 Rush priority orders require address validation and 3PL packing dispatch.
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setShowNotifications(false);
                          onNavigate('tasks');
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors text-xs"
                      >
                        <div className="flex items-center gap-1.5 text-amber-600 font-semibold mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Supplier Pricing Verification</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          Urgent VA task due tomorrow for Q4 supplier rate confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
