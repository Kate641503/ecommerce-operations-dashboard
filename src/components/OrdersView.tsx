import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Eye,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  ArrowUpDown
} from 'lucide-react';
import { Order, OrderFulfillmentStatus, OrderPaymentStatus } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onOpenOrderDetail: (order: Order) => void;
  onOpenCreateOrder: () => void;
  searchQuery: string;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onOpenOrderDetail,
  onOpenCreateOrder,
  searchQuery: globalSearch,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [fulfillmentFilter, setFulfillmentFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filteredOrders = useMemo(() => {
    const q = (localSearch || globalSearch).toLowerCase().trim();
    return orders.filter((order) => {
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerEmail.toLowerCase().includes(q) ||
        order.items.some((i) => i.productName.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q));

      const matchesFulfillment =
        fulfillmentFilter === 'All' || order.fulfillmentStatus === fulfillmentFilter;

      const matchesPayment =
        paymentFilter === 'All' || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesFulfillment && matchesPayment;
    });
  }, [orders, localSearch, globalSearch, fulfillmentFilter, paymentFilter]);

  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.amount : 0), 0);
  }, [filteredOrders]);

  const exportOrdersCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Items Count', 'Amount', 'Payment Status', 'Fulfillment Status', 'Priority', 'Date', 'Carrier', 'Tracking Number'];
    const rows = filteredOrders.map(o => [
      `"${o.id}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerEmail}"`,
      o.itemsCount,
      o.amount.toFixed(2),
      o.paymentStatus,
      o.fulfillmentStatus,
      o.priority,
      `"${o.date}"`,
      `"${o.carrier || ''}"`,
      `"${o.trackingNumber || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orders_manifest_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Orders Management & Dispatch Queue ({filteredOrders.length} Orders)
            </h2>
            <p className="text-xs text-slate-500">
              Filtered Volume: <strong>${totalRevenue.toFixed(2)}</strong> • 37 Queue Items managed by Catherine Ngina
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportOrdersCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Manifest</span>
          </button>
          <button
            id="orders-create-btn"
            onClick={onOpenCreateOrder}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Order</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by Order ID, customer, product..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
          />
        </div>

        <div>
          <select
            value={fulfillmentFilter}
            onChange={(e) => setFulfillmentFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option value="All">Fulfillment: All Statuses</option>
            <option value="New">New</option>
            <option value="Processing">Processing</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option value="All">Payment: All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table id="orders-table" className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Products</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Payment Status</th>
                <th className="py-3 px-3">Fulfillment Status</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onOpenOrderDetail(order)}
                  >
                    {/* Order ID */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 group-hover:text-blue-600">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{order.customerName}</div>
                      <div className="text-[10px] text-slate-400">{order.customerEmail}</div>
                    </td>

                    {/* Products */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800 truncate max-w-[200px]">
                        {order.items.map((i) => i.productName).join(', ')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {order.itemsCount} total items
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap text-[11px]">
                      {order.date}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      ${order.amount.toFixed(2)}
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.paymentStatus === 'Refunded'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Fulfillment Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.fulfillmentStatus === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.fulfillmentStatus === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.fulfillmentStatus === 'Packed'
                            ? 'bg-purple-100 text-purple-800'
                            : order.fulfillmentStatus === 'Processing'
                            ? 'bg-amber-100 text-amber-800'
                            : order.fulfillmentStatus === 'New'
                            ? 'bg-cyan-100 text-cyan-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          order.priority === 'Rush'
                            ? 'bg-rose-100 text-rose-700'
                            : order.priority === 'VIP'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {order.priority}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onOpenOrderDetail(order)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded text-xs font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
