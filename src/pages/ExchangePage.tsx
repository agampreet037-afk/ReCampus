import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExchangeListing } from '../types';
import { CATEGORIES, COLLEGES } from '../data/mockData';
import { ExchangeRequestModal } from '../components/exchange/ExchangeRequestModal';
import { CreateExchangeModal } from '../components/exchange/CreateExchangeModal';
import {
  RefreshCw,
  PlusCircle,
  ArrowRightLeft,
  Search,
  CheckCircle2,
  MapPin,
  Sparkles,
  Info,
} from 'lucide-react';

export const ExchangePage: React.FC = () => {
  const { exchangeListings, selectedCampus, setSelectedCampus, navigate } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeExchangeForModal, setActiveExchangeForModal] = useState<ExchangeListing | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredExchanges = exchangeListings.filter((item) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesWanted = item.wantedItems.toLowerCase().includes(q);
      const matchesDesc = item.description.toLowerCase().includes(q);
      if (!matchesTitle && !matchesWanted && !matchesDesc) return false;
    }

    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    if (selectedCampus !== 'All Campuses' && item.college !== selectedCampus) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold text-emerald-300">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Zero-Cash Campus Barter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ReCampus Exchange
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Swap textbooks, calculators, and lab tools directly with peers. No wallets, no payments
            — just direct peer-to-peer exchanges for the items you need this semester.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List an Item to Swap</span>
            </button>
          </div>
        </div>

        {/* Decorative corner graphic */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-25 pointer-events-none">
          <img
            src="/images/student_exchange_handshake.jpg"
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items to swap or wanted items (e.g. Python, badminton, drafter)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 shadow-2xs"
          />
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 shadow-2xs focus:outline-none"
          >
            {COLLEGES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            selectedCategory === 'All'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          All Swaps ({exchangeListings.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exchange Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExchanges.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Top Image + Condition */}
            <div>
              <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-[11px] font-medium text-white">
                  {listing.condition}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>{listing.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{listing.dateListed}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                  {listing.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {listing.description}
                </p>

                {/* Wanted items highlight box */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Seller Wants In Exchange:</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                    {listing.wantedItems}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="p-5 pt-0 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div
                  onClick={() => navigate('seller-profile', { sellerId: listing.sellerId })}
                  className="flex items-center gap-2 cursor-pointer hover:text-emerald-800"
                >
                  <img
                    src={listing.sellerAvatar}
                    alt={listing.sellerName}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-medium truncate">{listing.sellerName}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] truncate max-w-[140px]">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{listing.college}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveExchangeForModal(listing)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                <span>Propose Item Exchange</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredExchanges.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No swap listings match your search.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Propose Exchange Modal */}
      {activeExchangeForModal && (
        <ExchangeRequestModal
          exchange={activeExchangeForModal}
          isOpen={!!activeExchangeForModal}
          onClose={() => setActiveExchangeForModal(null)}
        />
      )}

      {/* List an Exchange Item Modal */}
      <CreateExchangeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
