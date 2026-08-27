import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { Order, OrderPaymentStatus, OrderFulfillmentStatus, OrderPriority, Product } from '../types';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onCreateOrder: (order: Order) => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  products,
  onCreateOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState<OrderPriority>('Standard');
  const [paymentStatus, setPaymentStatus] = useState<OrderPaymentStatus>('Paid');
  const [fulfillmentStatus, setFulfillmentStatus] = useState<OrderFulfillmentStatus>('New');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !shippingAddress.trim()) return;

    const chosenProduct = products.find((p) => p.id === selectedProductId) || products[0];
    const totalAmount = chosenProduct ? chosenProduct.sellingPrice * quantity : 99.0;

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim() || `${customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      shippingAddress: shippingAddress.trim(),
      items: [
        {
          productId: chosenProduct.id,
          productName: chosenProduct.name,
          sku: chosenProduct.sku,
          quantity: quantity,
          unitPrice: chosenProduct.sellingPrice,
        }
      ],
      itemsCount: quantity,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      amount: Number(totalAmount.toFixed(2)),
      paymentStatus: paymentStatus,
      fulfillmentStatus: fulfillmentStatus,
      priority: priority,
      carrier: 'USPS Priority',
      notes: 'Manually logged by Catherine Ngina (Virtual Assistant).',
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        id="create-order-modal"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create New Order</h3>
              <p className="text-xs text-slate-300">Record customer transaction for fulfillment</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Customer Full Name *</label>
            <input
              required
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Jessica Taylor"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="jessica.t@example.com"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Order Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as OrderPriority)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Standard">Standard</option>
                <option value="Rush">Rush (Expedited)</option>
                <option value="VIP">VIP Account</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Shipping Address *</label>
            <textarea
              required
              rows={2}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="e.g. 520 Sunset Way, Suite 400, Austin, TX 78701"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Product</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.sellingPrice.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as OrderPaymentStatus)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Initial Fulfillment</label>
              <select
                value={fulfillmentStatus}
                onChange={(e) => setFulfillmentStatus(e.target.value as OrderFulfillmentStatus)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="New">New Queue</option>
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
