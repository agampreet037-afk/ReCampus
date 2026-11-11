import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, placeOrder, navigate, currentUser } =
    useApp();

  const [pickupLocation, setPickupLocation] = useState(
    'Central Library Lawn benches (Zone A)'
  );
  const [pickupSlot, setPickupSlot] = useState('Tomorrow, 4:30 PM - 5:00 PM');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const originalSubtotal = cart.reduce((acc, curr) => {
    const orig = curr.product.originalPrice || curr.product.price;
    return acc + orig * curr.quantity;
  }, 0);
  const totalSavings = originalSubtotal - subtotal;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const res = placeOrder(pickupLocation, pickupSlot);
    if (res.success && res.orderId) {
      setConfirmedOrderId(res.orderId);
    }
  };

  if (confirmedOrderId) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Simulated Campus Order Placed!
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Order #{confirmedOrderId} Confirmed
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Your meetup has been scheduled. No credit card was charged. Connect with the sellers
            on campus chat to coordinate the handoff.
          </p>
        </div>

        {/* Pickup Summary Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Designated Meeting Hub</p>
              <p className="text-slate-600">{pickupLocation}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Estimated Handoff Slot</p>
              <p className="text-slate-600">{pickupSlot}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate('my-orders')}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            View in My Orders
          </button>
          <button
            onClick={() => navigate('explore')}
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your campus bag is empty</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Looks like you haven&apos;t added any student textbooks, calculators, or dorm gear yet.
        </p>
        <button
          onClick={() => navigate('explore')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <span>Explore Campus Listings</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your selected items and schedule a campus meetup.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-600 transition-colors"
        >
          Empty Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Item List */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="min-w-0 space-y-1">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.college}</span>
                  </div>
                  <h3
                    onClick={() => navigate('product-detail', { productId: product.id })}
                    className="text-sm font-bold text-slate-900 truncate hover:text-emerald-800 cursor-pointer"
                  >
                    {product.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity steppers & remove button */}
              <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-bold text-slate-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-sm font-bold text-slate-900 font-mono w-16 text-right">
                  ₹{product.price * quantity}
                </span>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Student Savings Banner */}
          {totalSavings > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>
                  You are saving <strong className="font-mono">₹{totalSavings}</strong> compared to
                  buying brand new!
                </span>
              </div>
              <span className="font-bold text-emerald-800 font-mono">Eco Smart</span>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Campus Checkout */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Campus Pickup & Summary
          </h2>

          <form onSubmit={handleCheckout} className="space-y-4">
            {/* Campus Meetup Location */}
            <div>
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                Designated Campus Pickup Spot
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="Central Library Lawn benches (Zone A)">
                  Central Library Lawn benches (Zone A)
                </option>
                <option value="Student Union Main Cafeteria Steps">
                  Student Union Main Cafeteria Steps
                </option>
                <option value="Engineering Block 3 Foyer / Atrium">
                  Engineering Block 3 Foyer / Atrium
                </option>
                <option value="Hostel Block A Main Gate Common Area">
                  Hostel Block A Main Gate Common Area
                </option>
                <option value="North Campus Open-Air Amphitheatre">
                  North Campus Open-Air Amphitheatre
                </option>
              </select>
            </div>

            {/* Time slot */}
            <div>
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                Preferred Handoff Time Slot
              </label>
              <select
                value={pickupSlot}
                onChange={(e) => setPickupSlot(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="Tomorrow, 1:15 PM - 1:45 PM (Post Lunch Break)">
                  Tomorrow, 1:15 PM - 1:45 PM (Post Lunch Break)
                </option>
                <option value="Tomorrow, 4:30 PM - 5:00 PM (After Labs)">
                  Tomorrow, 4:30 PM - 5:00 PM (After Labs)
                </option>
                <option value="Friday, 11:30 AM - 12:00 PM">Friday, 11:30 AM - 12:00 PM</option>
                <option value="Weekend Saturday, 3:00 PM - 4:00 PM">
                  Weekend Saturday, 3:00 PM - 4:00 PM
                </option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-mono text-slate-900 font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Campus Delivery / Pickup</span>
                <span className="font-mono text-emerald-700 font-bold">₹0 (Free)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Commission</span>
                <span className="font-mono text-emerald-700 font-bold">₹0 (Free)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Amount Due on Handoff</span>
                <span className="font-mono text-base text-emerald-900">₹{subtotal}</span>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-normal flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Simulated Checkout:</strong> Clicking below confirms your demo order without
                processing real money.
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Schedule Campus Handoff (Place Order)</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
