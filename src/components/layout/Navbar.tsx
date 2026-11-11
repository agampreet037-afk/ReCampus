import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLLEGES } from '../../data/mockData';
import {
  ShoppingBag,
  Heart,
  MessageSquare,
  Sparkles,
  Menu,
  X,
  PlusCircle,
  Building2,
  RefreshCw,
  User,
  Package,
  Layers,
  Leaf,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigate,
    selectedCampus,
    setSelectedCampus,
    cart,
    wishlist,
    conversations,
    currentUser,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const unreadMessagesCount = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  const navLinks = [
    { label: 'Explore', view: 'explore' as const },
    { label: 'Exchange', view: 'exchange' as const },
    { label: 'Reuse Impact', view: 'sustainability' as const },
    { label: 'Dashboard', view: 'dashboard' as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                navigate('landing');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-900 transition-colors">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-emerald-950 whitespace-nowrap">
                  Re<span className="text-emerald-700">Campus</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean 4-5 Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => navigate(link.view)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-emerald-900 font-semibold'
                      : 'hover:text-emerald-800 text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Campus Filter & Interactive Student Affordances */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Campus selector */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100/80 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 border border-slate-200/80 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="bg-transparent text-slate-800 text-xs font-medium focus:outline-none cursor-pointer max-w-[155px] truncate"
                aria-label="Filter by college campus"
              >
                {COLLEGES.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            {/* Sell CTA button */}
            <button
              onClick={() => navigate('sell')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm ${
                activeView === 'sell'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-emerald-800 hover:bg-emerald-900 text-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span className="whitespace-nowrap">Sell Item</span>
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => navigate('wishlist')}
              className={`relative p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/60 transition-colors ${
                activeView === 'wishlist' ? 'bg-emerald-50 text-emerald-800' : ''
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Messages button */}
            <button
              onClick={() => navigate('messages')}
              className={`relative p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/60 transition-colors ${
                activeView === 'messages' ? 'bg-emerald-50 text-emerald-800' : ''
              }`}
              title="Campus Messages"
              aria-label="Messages"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              onClick={() => navigate('cart')}
              className={`relative p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/60 transition-colors ${
                activeView === 'cart' ? 'bg-emerald-50 text-emerald-800' : ''
              }`}
              title="Demo Shopping Bag"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-slate-200 hover:border-emerald-500 focus:outline-none transition-all"
                aria-label="User profile options"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover"
                />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.college}</p>
                    <span className="inline-block mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Demo Student Active
                    </span>
                  </div>

                  <button
                    onClick={() => navigate('dashboard')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Student Dashboard
                  </button>

                  <button
                    onClick={() => navigate('my-listings')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    My Listings & Sales
                  </button>

                  <button
                    onClick={() => navigate('my-orders')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                    My Orders
                  </button>

                  <button
                    onClick={() => navigate('seller-profile', { sellerId: currentUser.id })}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    View Public Profile
                  </button>

                  <button
                    onClick={() => navigate('exchange')}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    ReCampus Exchange
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-2 animate-in slide-in-from-top-2">
            <div className="px-2 pb-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Filter Campus
              </label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
              >
                {COLLEGES.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 px-2 pt-1">
              <button
                onClick={() => {
                  navigate('sell');
                  setMobileMenuOpen(false);
                }}
                className="col-span-2 py-2 px-3 bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-emerald-300" />
                Sell an Item
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => {
                    navigate(link.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 text-xs font-medium rounded-lg text-left transition-colors ${
                    activeView === link.view
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  navigate('my-listings');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 text-xs font-medium rounded-lg text-left text-slate-700 hover:bg-slate-100"
              >
                My Listings
              </button>
              <button
                onClick={() => {
                  navigate('my-orders');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 text-xs font-medium rounded-lg text-left text-slate-700 hover:bg-slate-100"
              >
                My Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
