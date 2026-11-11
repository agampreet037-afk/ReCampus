import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/products/ProductCard';
import {
  Search,
  ArrowRight,
  Sparkles,
  RefreshCw,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Cpu,
  PenTool,
  FlaskConical,
  Home,
  Dumbbell,
  Shirt,
  Armchair,
  PackageCheck,
  Leaf,
  Users,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    navigate,
    products,
    exchangeListings,
    setSearchQuery,
    setSelectedCategory,
    selectedCampus,
  } = useApp();

  const [heroSearchInput, setHeroSearchInput] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setSearchQuery(heroSearchInput.trim());
      navigate('explore');
    } else {
      navigate('explore');
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate('explore');
  };

  // Filter products by selected campus if not "All Campuses"
  const filteredProducts =
    selectedCampus === 'All Campuses'
      ? products
      : products.filter((p) => p.college === selectedCampus);

  // Featured Deals (high discount items)
  const featuredDeals = [...filteredProducts]
    .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
    .slice(0, 4);

  // Recently listed
  const recentlyListed = [...filteredProducts].slice(0, 4);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Textbooks and Academic Books': <BookOpen className="w-5 h-5" />,
    Electronics: <Cpu className="w-5 h-5" />,
    Stationery: <PenTool className="w-5 h-5" />,
    'Lab Equipment': <FlaskConical className="w-5 h-5" />,
    'Hostel Essentials': <Home className="w-5 h-5" />,
    'Sports Equipment': <Dumbbell className="w-5 h-5" />,
    'Clothing and Accessories': <Shirt className="w-5 h-5" />,
    Furniture: <Armchair className="w-5 h-5" />,
    Miscellaneous: <PackageCheck className="w-5 h-5" />,
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-emerald-50/60 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-xs font-semibold text-emerald-900">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Student-Exclusive Campus Marketplace</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                Your Campus Marketplace. <br className="hidden sm:inline" />
                <span className="text-emerald-800">Smarter, Cheaper, Greener.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl text-balance">
                Buy, sell and exchange everyday essentials with students from your own college
                community. Save up to 75% on semester textbooks, calculators, lab gear, and dorm
                living.
              </p>

              {/* Integrated Search Bar */}
              <form onSubmit={handleHeroSearch} className="max-w-xl">
                <div className="relative flex items-center shadow-md rounded-2xl bg-white border border-slate-200/90 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all p-1.5">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder="Search engineering math, Casio calculator, lab coat, racket..."
                    className="w-full px-3 py-2.5 text-sm text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('explore')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-md transition-all group"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('sell')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl border border-slate-300 shadow-xs transition-all"
                >
                  <span>Start Selling</span>
                </button>
                <button
                  onClick={() => navigate('exchange')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 text-sm font-semibold rounded-xl border border-emerald-200 transition-all"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-700" />
                  <span>Item Swap (Exchange)</span>
                </button>
              </div>

              {/* Campus Trust markers */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Campus Meetups</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Commission Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant Peer Messaging</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-950/10 shadow-xl bg-slate-100 group">
                <img
                  src="/images/hero_campus_marketplace.jpg"
                  alt="College students connecting and exchanging books on campus lawn"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                {/* Subtle scrim & floating campus proof card */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-slate-900 shadow-lg border border-white/40 space-y-1 max-w-xs">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-800">
                      <span>Live on Campus</span>
                      <span className="font-mono tabular-nums text-slate-500">
                        {filteredProducts.length} Items Available
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700">
                      &ldquo;Sold my engineering drawing set in 20 minutes to a freshman in my
                      hostel!&rdquo;
                    </p>
                    <p className="text-[10px] text-slate-500">Priya S. · Electrical Eng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Popular Categories</h2>
            <p className="text-sm text-slate-500 mt-1">
              Find exactly what you need for this semester from senior students.
            </p>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.slice(0, 5).map((category) => {
            const count = products.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="flex flex-col items-start p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-600/40 hover:shadow-md transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  {categoryIcons[category] || <PackageCheck className="w-5 h-5" />}
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {category}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
                  {count} listings
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED DEALS (Up to 75% OFF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Pocket-Friendly
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Featured Campus Deals
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-rated pre-owned essentials with maximum student discounts.
            </p>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
          >
            <span>See More Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. RECENTLY LISTED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recently Listed</h2>
            <p className="text-sm text-slate-500 mt-1">
              Fresh additions from students across college dorms and campus departments.
            </p>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
          >
            <span>Explore All ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyListed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. HOW RECAMPUS WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How ReCampus Works on Your Campus
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed specifically around campus geography so students can exchange and pick up
              items right between lectures with zero delivery wait times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">Snap & List in 60s</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Take a quick photo of your unused textbook, calculator, or dorm gear. Set an
                affordable price or mark it open for an item exchange.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Chat & Negotiate</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect via direct peer messaging. Negotiate prices, make counter-offers, or propose
                swaps without exposing your phone number.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Meet at Campus Hub</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hand off the item at a designated campus hotspot like the Central Library, Student
                Union, or North Canteen. Fast, safe, and zero shipping fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECAMPUS EXCHANGE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero-Cash Peer Swap</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ReCampus Exchange: Don&apos;t Spend, Just Swap.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Have last semester&apos;s calculus guide or extra sports equipment? Swap it directly
                with peers for the programming books, badminton rackets, or drawing boards you need
                now.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('exchange')}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
                >
                  Browse {exchangeListings.length} Available Swaps
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-emerald-900/10">
                <img
                  src="/images/student_exchange_handshake.jpg"
                  alt="Students trading textbooks in university student lounge"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SUSTAINABILITY & REUSE IMPACT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-4 h-4" />
              <span>Campus Circular Economy</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Saving Money While Reducing College Waste
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every reused textbook saves trees, paper pulp, and transport emissions. Here is the
              collective impact created by students reusing items through ReCampus.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono tabular-nums">
                1,420+
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">Items Reused</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Kept out of campus dorm dumpsters</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono tabular-nums">
                860+
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">Textbooks Recirculated</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Passed down across semesters</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono tabular-nums">
                ₹3.4L+
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">Student Savings</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Kept in student bank accounts</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-mono tabular-nums">
                4.8 Tons
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">CO₂ Emissions Avoided</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Illustrative demo calculation</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              *All environmental metrics are illustrative demonstration figures showcasing campus
              reuse potential.
            </p>
            <button
              onClick={() => navigate('sustainability')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 shrink-0"
            >
              <span>Explore Detailed Impact Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
