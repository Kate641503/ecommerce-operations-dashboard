import React from 'react';
import {
  Package,
  Boxes,
  ShoppingBag,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  Plus,
  Truck,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Product,
  Order,
  VATask,
  InventoryItem,
  MonthlyMetric,
  NavSection
} from '../types';
import {
  MONTHLY_METRICS,
  DAILY_ORDERS_TREND,
  INVENTORY_STATUS_DATA
} from '../mockData';

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  tasks: VATask[];
  inventory: InventoryItem[];
  onNavigate: (section: NavSection) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenOrderDetail: (order: Order) => void;
  onOpenQuickAction: (actionType: string) => void;
  onToggleTaskStatus: (taskId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  orders,
  tasks,
  inventory,
  onNavigate,
  onOpenProductDetail,
  onOpenOrderDetail,
  onOpenQuickAction,
  onToggleTaskStatus,
}) => {
  // Key Stats as requested
  const stats = [
    {
      id: 'stat-revenue',
      label: 'Monthly Revenue',
      value: '$48,620',
      change: '+14.2% vs last mo.',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-600',
      target: 'reports' as NavSection
    },
    {
      id: 'stat-orders-month',
      label: 'Orders This Month',
      value: '286',
      change: '+8.3% velocity',
      isPositive: true,
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-600',
      target: 'orders' as NavSection
    },
    {
      id: 'stat-total-products',
      label: 'Total Products',
      value: '1,248',
      change: '1,086 Active Listings',
      isPositive: true,
      icon: Package,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-600',
      target: 'products' as NavSection
    },
    {
      id: 'stat-active-listings',
      label: 'Active Listings',
      value: '1,086',
      change: '87% Omnichannel active',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      iconBg: 'bg-teal-600',
      target: 'products' as NavSection
    },
    {
      id: 'stat-pending-orders',
      label: 'Pending Orders',
      value: '37',
      change: '2 Rush fulfillment',
      isPositive: false,
      icon: Clock,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      iconBg: 'bg-cyan-600',
      target: 'orders' as NavSection
    },
    {
      id: 'stat-low-stock',
      label: 'Low Stock Items',
      value: '24',
      change: 'Critical shortage: 8',
      isPositive: false,
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-600',
      target: 'inventory' as NavSection
    },
    {
      id: 'stat-review-products',
      label: 'Products Needing Review',
      value: '16',
      change: 'Pricing / SEO alerts',
      isPositive: false,
      icon: FileCheck2,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: 'bg-amber-600',
      target: 'products' as NavSection
    },
    {
      id: 'stat-suppliers',
      label: 'Suppliers',
      value: '18',
      change: 'Avg Lead: 11.4 days',
      isPositive: true,
      icon: Building2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-600',
      target: 'suppliers' as NavSection
    },
  ];

  // Low stock items from inventory
  const lowStockAlerts = inventory
    .filter((item) => item.reorderStatus === 'Critical Shortage' || item.reorderStatus === 'Low Stock Alert' || item.unitsAvailable <= item.reorderThreshold)
    .slice(0, 4);

  // Top selling products
  const topProducts = [...products]
    .sort((a, b) => b.salesVelocity - a.salesVelocity)
    .slice(0, 5);

  // Recent orders
  const recentOrders = orders.slice(0, 5);

  // VA Pending tasks
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              E-Commerce Operations Center
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Live Synced
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Store operations overview • Managed by <strong className="text-slate-800">Catherine Ngina (Virtual Assistant)</strong>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="dash-add-product-btn"
            onClick={() => onOpenQuickAction('product')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
          <button
            id="dash-create-order-btn"
            onClick={() => onOpenQuickAction('order')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Order</span>
          </button>
          <button
            id="dash-add-task-btn"
            onClick={() => onOpenQuickAction('task')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
          <button
            id="dash-generate-report-btn"
            onClick={() => onNavigate('reports')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <span>View Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid (8 Key metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              onClick={() => onNavigate(item.target)}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-500 truncate block">
                    {item.label}
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                    {item.value}
                  </div>
                </div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-2xs ${item.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`text-[11px] font-medium ${item.isPositive ? 'text-emerald-700 font-semibold' : 'text-rose-600 font-semibold'}`}>
                  {item.change}
                </span>
                <span className="text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-0.5 text-[11px]">
                  View <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row: Sales & Profit Overview + Daily Orders Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue & Profit Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Monthly Revenue & Gross Profit Performance
              </h2>
              <p className="text-xs text-slate-500">
                Tracking $48,620 gross sales and $31,603 estimated gross margin in August
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-indigo-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Revenue
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Gross Profit
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_METRICS} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: number | string | undefined) => [`$${Number(val || 0).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="profit" name="Gross Profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Orders Trend Chart (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-900">
                Recent 7-Day Order Volume
              </h2>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                286 MTD
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Daily dispatch velocity handled by VA fulfillment queue
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DAILY_ORDERS_TREND} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    formatter={(val: number | string | undefined) => [`${val} orders`, 'Volume']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="orders" name="Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Avg AOV: <strong>$170.00</strong></span>
            <button
              onClick={() => onNavigate('orders')}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              Order Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Row: Low Stock Alerts + Pending VA Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-rose-100 text-rose-700 rounded-md">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Critical Low-Stock Alerts (24 Items)
                </h3>
                <p className="text-xs text-slate-500">
                  Requires immediate replenishment purchase orders
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              Full Stock Grid <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {lowStockAlerts.map((item) => (
              <div key={item.sku} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {item.productName}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded text-slate-700">{item.sku}</span>
                    <span>•</span>
                    <span>{item.supplierName}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 flex items-center gap-3">
                  <div>
                    <div className="text-xs font-bold text-rose-600">
                      {item.unitsAvailable} left
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Min threshold: {item.reorderThreshold}
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('inventory')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md transition-colors"
                  >
                    Reorder PO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending VA Tasks Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Pending Virtual Assistant Action Queue
                  </h3>
                  <p className="text-xs text-slate-500">
                    Daily workflow tasks assigned to Catherine Ngina
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                All Tasks <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 flex items-start justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button
                      onClick={() => onToggleTaskStatus(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                      title="Mark as completed"
                    >
                      <div className="w-4 h-4 rounded border border-slate-300 hover:border-emerald-500 flex items-center justify-center" />
                    </button>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-slate-900 leading-tight">
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded text-[10px]">
                          {task.category}
                        </span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      task.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-700'
                        : task.priority === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-xs">
              <strong>{pendingTasks.length}</strong> pending high-priority tasks
            </span>
            <button
              onClick={() => onOpenQuickAction('task')}
              className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs flex items-center gap-1"
            >
              + Create New Task
            </button>
          </div>
        </div>
      </div>

      {/* Row: Top Selling Products & Recent Orders Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Top-Selling Catalog Products
              </h3>
              <p className="text-xs text-slate-500">
                Ranked by monthly sales velocity and customer orders
              </p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Catalog <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-2">Price</th>
                  <th className="py-2.5 px-2">Margin</th>
                  <th className="py-2.5 px-2">Velocity</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {topProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      <div className="truncate max-w-[170px]">{p.name}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{p.sku}</span>
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">
                      ${p.sellingPrice.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
                        {p.profitMargin.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-medium text-slate-800">
                      {p.salesVelocity} /mo
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <button
                        onClick={() => onOpenProductDetail(p)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-xs hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-slate-500">
                Latest transactions queued for 3PL dispatch
              </p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              All Orders <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Amount</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">
                      {o.id}
                    </td>
                    <td className="py-2.5 px-2 text-slate-800">
                      <div className="font-medium truncate max-w-[120px]">{o.customerName}</div>
                      <span className="text-[10px] text-slate-400">{o.itemsCount} items</span>
                    </td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">
                      ${o.amount.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          o.fulfillmentStatus === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : o.fulfillmentStatus === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : o.fulfillmentStatus === 'Packed'
                            ? 'bg-purple-100 text-purple-800'
                            : o.fulfillmentStatus === 'Processing'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {o.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <button
                        onClick={() => onOpenOrderDetail(o)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-xs hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
