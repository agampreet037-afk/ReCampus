import React from 'react';
import { useApp } from '../../context/AppContext';
import { Leaf, ShieldCheck, RotateCcw, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, resetDemoData } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                <Leaf className="w-4 h-4 text-emerald-200" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Re<span className="text-emerald-400">Campus</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The student-exclusive marketplace designed for college and university communities.
              Empowering students to buy smart, sell easy, and keep resources circulating.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Campus Verified Peer-to-Peer Demo</span>
            </div>
          </div>

          {/* Marketplace links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('explore')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Explore All Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('exchange')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  ReCampus Exchange (Swap)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('sell')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sell an Item
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('wishlist')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Student Hub */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Student Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('my-listings')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  My Listings & Sales
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('my-orders')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  My Orders History
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('messages')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Campus Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('sustainability')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Reuse Impact Metrics
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Safety & Hackathon Demo */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Campus Safety
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Always arrange item handoffs in well-lit public campus locations such as the Central
              Library, Student Union lounge, or main quad canteen during daylight hours.
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 ReCampus. Built for college & university communities. Demonstration prototype.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Buy Smart. Sell Easy. Reuse More.</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5" />
              Eco-Friendly Reuse
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
