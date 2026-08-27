import React from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Building2,
  Search,
  DollarSign,
  CheckSquare,
  BarChart3,
  Settings,
  PlusCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { NavSection } from '../types';

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenQuickAction?: () => void;
  counts?: {
    lowStock?: number;
    pendingOrders?: number;
    pendingTasks?: number;
    researchCount?: number;
    reviewProducts?: number;
  };
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  lowStockCount?: number;
  pendingOrdersCount?: number;
  pendingTasksCount?: number;
  totalProductsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  onOpenQuickAction,
  counts,
  isMobileOpen,
  onCloseMobile,
  lowStockCount = 0,
  pendingOrdersCount = 0,
  pendingTasksCount = 0,
  totalProductsCount = 0,
}) => {
  const effectiveCounts = {
    lowStock: counts?.lowStock ?? lowStockCount,
    pendingOrders: counts?.pendingOrders ?? pendingOrdersCount,
    pendingTasks: counts?.pendingTasks ?? pendingTasksCount,
    researchCount: counts?.researchCount ?? 0,
    reviewProducts: counts?.reviewProducts ?? 0,
  };

  const navItems: { id: NavSection; label: string; icon: React.ElementType; badge?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Product Catalog', icon: Package, badge: effectiveCounts.reviewProducts, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'inventory', label: 'Inventory', icon: Boxes, badge: effectiveCounts.lowStock, badgeColor: 'bg-rose-100 text-rose-800' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: effectiveCounts.pendingOrders, badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'suppliers', label: 'Suppliers', icon: Building2 },
    { id: 'research', label: 'Product Research', icon: Search, badge: effectiveCounts.researchCount, badgeColor: 'bg-indigo-100 text-indigo-800' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: effectiveCounts.pendingTasks, badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Title */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md font-bold text-lg">
              <Package className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm text-white tracking-tight leading-tight truncate">
                E-Commerce Hub
              </h1>
              <p className="text-[11px] text-slate-400 truncate">
                Operations & Management
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            id="sidebar-quick-action-btn"
            onClick={onOpenQuickAction}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Quick Action</span>
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
          <div className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-slate-700 text-slate-300')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Portfolio Role / VA Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-xs">
                CN
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">
                  Catherine Ngina
                </div>
                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Virtual Assistant</span>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active Duty
              </span>
              <span className="text-indigo-400 font-mono text-[10px]">v2.4 Live</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
