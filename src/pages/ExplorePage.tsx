import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, COLLEGES } from '../data/mockData';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCondition } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  X,
  PackageSearch,
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCampus,
    setSelectedCampus,
  } = useApp();

  // Local filter states
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSeller = product.sellerName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesSeller) return false;
      }

      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Campus
      if (selectedCampus !== 'All Campuses' && product.college !== selectedCampus) {
        return false;
      }

      // Condition
      if (selectedCondition !== 'All' && product.condition !== selectedCondition) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
      // default: newest
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedCampus, selectedCondition, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCampus('All Campuses');
    setSelectedCondition('All');
    setMaxPrice(1000);
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedCampus !== 'All Campuses' ||
    selectedCondition !== 'All' ||
    maxPrice < 1000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Search Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse pre-owned essentials listed by verified students across campus.
            </p>
          </div>

          {/* Quick Stats or Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold self-start sm:self-auto transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Search Bar & Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by book name, equipment, calculator model, seller..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <div className="relative flex-1">
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-400 shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-800 text-xs font-semibold focus:outline-none cursor-pointer w-full"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 shadow-2xs"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
            </button>
          </div>
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'All'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            All Categories ({products.length})
          </button>
          {CATEGORIES.map((category) => {
            const count = products.filter((p) => p.category === category).length;
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {category} <span className="opacity-70 font-mono text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`lg:block ${
            showFiltersMobile ? 'block' : 'hidden'
          } bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 shadow-xs`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">Filter Listings</h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Campus Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
              Campus / College
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              {COLLEGES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
              Product Condition
            </label>
            <div className="space-y-1.5">
              {['All', 'Like New', 'Good', 'Fair', 'Needs Repair'].map((cond) => (
                <label
                  key={cond}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-emerald-800"
                >
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === cond}
                    onChange={() => setSelectedCondition(cond)}
                    className="text-emerald-700 focus:ring-emerald-700"
                  />
                  <span>{cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-800 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-slate-900 font-mono">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹100</span>
              <span>₹500</span>
              <span>₹1000+</span>
            </div>
          </div>

          {/* Quick Note */}
          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed border border-slate-100">
            All prices are in Indian Rupees (₹). ReCampus charges zero platform commission on student
            transactions.
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results count & status */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800 font-mono">{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1 ? 'item' : 'items'}
              {selectedCampus !== 'All Campuses' && ` on ${selectedCampus}`}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <PackageSearch className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No matching campus listings</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find items matching your search criteria. Try relaxing your filters
                or search for broader terms like &quot;math&quot;, &quot;calculator&quot;, or
                &quot;lab&quot;.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
