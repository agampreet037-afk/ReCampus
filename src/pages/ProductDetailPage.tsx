import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfferModal } from '../components/products/OfferModal';
import { ProductCard } from '../components/products/ProductCard';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  MessageSquare,
  Tag,
  ShieldCheck,
  MapPin,
  Clock,
  Eye,
  Star,
  CheckCircle2,
  AlertTriangle,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    navigate,
    toggleWishlist,
    isWishlisted,
    addToCart,
    startChatWithSeller,
    showToast,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const wishlisted = isWishlisted(product.id);

  // Similar products in same category
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to your clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Item</span>
        </button>
      </div>

      {/* Main PDP Grid: Gallery Left + Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
              }}
            />

            {/* Condition overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-white">
              Condition: {product.condition}
            </div>

            {product.isSold && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center">
                <span className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-lg">
                  This Item Has Been Sold
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail row if multiple images */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 shadow-sm'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Safety & Meeting Point notice */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Campus Safety Guidelines</span>
            </div>
            <p className="leading-relaxed">
              Recommended pickup spot for this item:{' '}
              <strong className="text-slate-800">
                {product.pickupSpot || 'Campus Central Library or Student Union Lounge'}
              </strong>
              . Always inspect the item in person before completing peer transactions.
            </p>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Title & Metadata */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.dateListed}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3 h-3" />
                  {product.views || 48} views
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {product.title}
              </h1>

              {/* Price row */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.isSold}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                    product.isSold
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-300" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => setIsOfferModalOpen(true)}
                  disabled={product.isSold}
                  className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <span>Make an Offer</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => startChatWithSeller(product.sellerId, product.id)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex items-center justify-center gap-2 transition-colors border border-emerald-200"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Chat with Seller</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border ${
                    wishlisted
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{wishlisted ? 'Saved' : 'Save to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Product Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Seller profile card */}
            <div className="pt-4 border-t border-slate-100">
              <div
                onClick={() => navigate('seller-profile', { sellerId: product.sellerId })}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200/80 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.sellerAvatar}
                    alt={product.sellerName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {product.sellerName}
                    </h3>
                    <p className="text-[11px] text-slate-500">{product.college}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>4.9 (16 campus ratings)</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-800 group-hover:underline">
                  Profile →
                </span>
              </div>
            </div>

            {/* Disclaimer notice */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900 leading-relaxed">
                <strong>Demonstration Notice:</strong> All product listings and student accounts are
                fictional demo records for presentation. No real payments are processed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Row */}
      {similarProducts.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Similar Campus Essentials</h2>
            <button
              onClick={() => navigate('explore')}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Browse more in {product.category}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Offer Modal */}
      <OfferModal
        product={product}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
    </div>
  );
};
