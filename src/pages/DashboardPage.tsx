import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import { OnboardingModal } from '../components/ui/OnboardingModal';
import {
  Layers,
  Sparkles,
  ShoppingBag,
  Heart,
  MessageSquare,
  Package,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Leaf,
  Building2,
  GraduationCap,
  Edit,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    products,
    wishlist,
    orders,
    conversations,
    navigate,
    selectedCampus,
  } = useApp();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const myListings = products.filter(
    (p) => p.isUserListing || p.sellerId === currentUser.id
  );
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const recommendedProducts = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/30 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Welcome back, {currentUser.name.split(' ')[0]}!
              </h1>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                Active Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {currentUser.department} · {currentUser.academicYear} · {currentUser.college}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => navigate('sell')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>Sell New Item</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => navigate('my-listings')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/40 cursor-pointer shadow-2xs transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>My Listings</span>
            <Package className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">{myListings.length}</p>
          <p className="text-[11px] text-slate-400">Items posted for sale</p>
        </div>

        <div
          onClick={() => navigate('wishlist')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-rose-400 cursor-pointer shadow-2xs transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Wishlist Saved</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">{wishlist.length}</p>
          <p className="text-[11px] text-slate-400">Items tracked</p>
        </div>

        <div
          onClick={() => navigate('messages')}
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/40 cursor-pointer shadow-2xs transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Conversations</span>
            <MessageSquare className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono">
            {conversations.length}
          </p>
          <p className="text-[11px] text-slate-400">Campus inquiries</p>
        </div>

        <div
          onClick={() => navigate('sustainability')}
          className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 hover:border-emerald-500 cursor-pointer shadow-2xs transition-all space-y-1"
        >
          <div className="flex items-center justify-between text-emerald-800 text-xs font-medium">
            <span>Reuse Impact</span>
            <Leaf className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-mono">18 kg</p>
          <p className="text-[11px] text-emerald-700 font-medium">CO₂ emissions saved</p>
        </div>
      </div>

      {/* Grid of Content: My Active Listings & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: My Active Listings preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              My Active Listings
            </h2>
            <button
              onClick={() => navigate('my-listings')}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {myListings.length > 0 ? (
            <div className="space-y-3">
              {myListings.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('product-detail', { productId: item.id })}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.images[0]}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 font-mono shrink-0">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No active listings yet. Click &quot;Sell New Item&quot; to list your first textbook!
            </div>
          )}
        </div>

        {/* Right column: Recent Messages preview (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recent Inquiries
            </h2>
            <button
              onClick={() => navigate('messages')}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Open Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {conversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => navigate('messages', { conversationId: conv.id })}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors"
              >
                <img
                  src={conv.participantAvatar}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {conv.participantName}
                    </p>
                    <span className="text-[10px] text-slate-400">{conv.lastTimestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended For You on Campus */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recommended For You</h2>
          <button
            onClick={() => navigate('explore')}
            className="text-xs font-semibold text-emerald-800 hover:underline"
          >
            See all items
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Onboarding / Profile edit modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
};
