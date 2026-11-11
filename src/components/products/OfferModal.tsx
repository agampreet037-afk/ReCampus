import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Tag, Send, Sparkles } from 'lucide-react';

interface OfferModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({ product, isOpen, onClose }) => {
  const { makeOffer } = useApp();
  const [offeredPrice, setOfferedPrice] = useState<number>(
    Math.round(product.price * 0.85) // default 15% discount offer
  );
  const [message, setMessage] = useState<string>(
    `Hi ${product.sellerName.split(' ')[0]}, can you do ₹${Math.round(
      product.price * 0.85
    )}? I can pick it up today on campus!`
  );

  if (!isOpen) return null;

  const handlePercentageClick = (percent: number) => {
    const discounted = Math.round(product.price * (1 - percent / 100));
    setOfferedPrice(discounted);
    setMessage(
      `Hi ${product.sellerName.split(' ')[0]}, would you accept ₹${discounted} (${percent}% off)? Ready for quick pickup at ${
        product.college.includes('Apex') ? 'Student Union' : 'Library'
      }.`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offeredPrice <= 0) return;
    makeOffer(product.id, offeredPrice, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">Make an Offer</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Summary */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <img
              src={product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">{product.title}</p>
              <p className="text-xs text-slate-500">
                Listing Price:{' '}
                <span className="font-bold text-slate-800 font-mono">₹{product.price}</span>
              </p>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1.5">
              Quick Counter Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handlePercentageClick(pct)}
                  className="py-1.5 px-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
                >
                  -{pct}% (₹{Math.round(product.price * (1 - pct / 100))})
                </button>
              ))}
            </div>
          </div>

          {/* Custom Price */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Your Offer Amount (₹ INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 font-mono font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="10"
                max={product.price * 2}
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                required
              />
            </div>
          </div>

          {/* Message to Seller */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Message to Seller ({product.sellerName})
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none"
              placeholder="Suggest a campus meetup location or timing..."
              required
            />
          </div>

          {/* Demo disclaimer */}
          <p className="text-[11px] text-slate-500 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 leading-normal">
            This is a simulated offer. It will be sent to the seller in the local campus messaging
            system for peer negotiation.
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
