import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import { Heart, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigate, addToCart, toggleWishlist } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Wishlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {wishlistedProducts.length} saved essentials you&apos;re keeping an eye on.
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={() => {
              wishlistedProducts.forEach((p) => addToCart(p));
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Bag</span>
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Your wishlist is empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Save interesting textbooks, lab tools, calculators, or dorm essentials by tapping the
            heart icon on any listing.
          </p>
          <button
            onClick={() => navigate('explore')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
