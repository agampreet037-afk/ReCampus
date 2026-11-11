import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { orders, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Campus Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your scheduled campus pickups, past handoffs, and receipts.
        </p>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            let statusBadge = (
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                {order.status}
              </span>
            );

            if (order.status === 'Order Placed') {
              statusBadge = (
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                  {order.status}
                </span>
              );
            } else if (order.status === 'Awaiting Confirmation') {
              statusBadge = (
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                  {order.status}
                </span>
              );
            } else if (order.status === 'Cancelled') {
              statusBadge = (
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
                  {order.status}
                </span>
              );
            }

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 font-mono">#{order.id}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{order.orderDate}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Demo Order
                    </span>
                  </div>
                  <div>{statusBadge}</div>
                </div>

                {/* Items in Order */}
                <div className="space-y-3">
                  {order.items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-4 py-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-100"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Seller: {product.sellerName} ({product.college}) · Qty: {quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-mono shrink-0">
                        ₹{product.price * quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pickup details and Total */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1 text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>
                        Handoff: <strong className="text-slate-800">{order.pickupLocation}</strong>
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>
                        Slot: <strong className="text-slate-800">{order.pickupSlot}</strong>
                      </span>
                    </p>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-slate-500 mr-2">Total Due at Handoff:</span>
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-slate-800">No order history yet</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            When you arrange a campus pickup for any item, your simulated confirmation receipt will
            appear here.
          </p>
          <button
            onClick={() => navigate('explore')}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Browse Marketplace
          </button>
        </div>
      )}
    </div>
  );
};
