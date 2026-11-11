import React, { useState } from 'react';
import { ExchangeListing } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, RefreshCw, Send, Check } from 'lucide-react';

interface ExchangeRequestModalProps {
  exchange: ExchangeListing;
  isOpen: boolean;
  onClose: () => void;
}

export const ExchangeRequestModal: React.FC<ExchangeRequestModalProps> = ({
  exchange,
  isOpen,
  onClose,
}) => {
  const { requestExchange } = useApp();
  const [offeredItemTitle, setOfferedItemTitle] = useState('');
  const [message, setMessage] = useState(
    `Hi ${exchange.sellerName.split(' ')[0]}! I have what you are looking for. Would love to trade on campus!`
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offeredItemTitle.trim()) return;
    requestExchange(exchange.id, offeredItemTitle.trim(), message.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">Propose Item Exchange</h3>
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
          {/* Target Listing */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1.5">
            <p className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider">
              Item to receive:
            </p>
            <p className="text-xs font-bold text-slate-900 line-clamp-1">{exchange.title}</p>
            <div className="text-[11px] text-slate-600">
              <span className="font-semibold text-emerald-800">Seller is looking for:</span>{' '}
              {exchange.wantedItems}
            </div>
          </div>

          {/* Item you are offering */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              What item are you offering to swap?
            </label>
            <input
              type="text"
              value={offeredItemTitle}
              onChange={(e) => setOfferedItemTitle(e.target.value)}
              placeholder="e.g. Java: The Complete Reference / Casio Scientific Calc / Drawing Board"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Proposal Message to {exchange.sellerName}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none"
              required
            />
          </div>

          {/* Info note */}
          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 leading-normal">
            Exchanges are zero-cash peer swaps. Once accepted, you and {exchange.sellerName} can
            agree on a public campus spot (like the library foyer or student union) to inspect each
            other&apos;s items.
          </p>

          {/* Actions */}
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
              <span>Submit Swap Proposal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
