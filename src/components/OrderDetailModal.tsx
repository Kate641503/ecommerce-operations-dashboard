import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Truck,
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  Edit2,
  Save,
  Package
} from 'lucide-react';
import { Order, OrderFulfillmentStatus, OrderPaymentStatus } from '../types';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrder: (updated: Order) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateOrder,
}) => {
  if (!isOpen || !order) return null;

  const [fulfillmentStatus, setFulfillmentStatus] = useState<OrderFulfillmentStatus>(order.fulfillmentStatus);
  const [carrier, setCarrier] = useState(order.carrier || 'USPS Priority');
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const updated: Order = {
      ...order,
      fulfillmentStatus,
      carrier,
      trackingNumber,
    };
    onUpdateOrder(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        id="order-detail-modal"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  {order.id}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  Priority: {order.priority}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Order for {order.customerName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-xs">
          {/* Order Summary banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div>
              <span className="text-slate-500 block font-medium">Order Date</span>
              <span className="font-semibold text-slate-900 mt-0.5 block">{order.date}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Total Amount</span>
              <span className="font-bold text-slate-900 mt-0.5 block text-sm">${order.amount.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Payment Status</span>
              <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] mt-0.5 ${
                order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {order.paymentStatus}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Fulfillment</span>
              <span className="inline-block font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[11px] mt-0.5">
                {order.fulfillmentStatus}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-2">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Customer Information</span>
              </div>
              <p className="font-medium text-slate-800">{order.customerName}</p>
              <p className="text-slate-500 mt-0.5">{order.customerEmail}</p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Shipping Destination</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{order.shippingAddress}</p>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-500" />
              <span>Line Items ({order.items.length})</span>
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold text-[11px]">
                  <tr>
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5">SKU</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium text-slate-900">{item.productName}</td>
                      <td className="p-2.5 font-mono text-slate-500">{item.sku}</td>
                      <td className="p-2.5">{item.quantity}</td>
                      <td className="p-2.5 text-right font-semibold text-slate-900">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VA Fulfillment Controls */}
          <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3">
            <h4 className="font-semibold text-indigo-950 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>VA 3PL Fulfillment Dispatch Control</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Fulfillment Status
                </label>
                <select
                  value={fulfillmentStatus}
                  onChange={(e) => setFulfillmentStatus(e.target.value as OrderFulfillmentStatus)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-slate-800"
                >
                  <option value="New">New</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Carrier
                </label>
                <input
                  type="text"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. 1Z9999999999"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                {savedSuccess ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Updated successfully!
                  </span>
                ) : (
                  'Changes will sync with customer notification email queue'
                )}
              </span>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Dispatch Info</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Packing Slip</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
