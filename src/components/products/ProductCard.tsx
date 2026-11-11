import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Eye, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, toggleWishlist, isWishlisted, addToCart } = useApp();
  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    navigate('product-detail', { productId: product.id });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image Container with 4:3 Aspect Ratio */}
      <div
        onClick={handleCardClick}
        className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // graceful fallback
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Condition tag - clean unboxed overlay with subtle dark scrim */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] font-medium text-white shadow-xs">
          {product.condition}
        </div>

        {/* Sold overlay if marked sold */}
        {product.isSold && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md">
              Sold
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div onClick={handleCardClick} className="cursor-pointer space-y-1.5">
          {/* Metadata clean text with dot separator */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{product.dateListed}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="text-xs font-semibold text-emerald-700">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Campus Location */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{product.college}</span>
          </div>
        </div>

        {/* Footer info & Quick Add */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Seller preview */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate('seller-profile', { sellerId: product.sellerId });
            }}
            className="flex items-center gap-1.5 min-w-0 cursor-pointer group/seller"
          >
            <img
              src={product.sellerAvatar}
              alt={product.sellerName}
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
            <span className="text-xs text-slate-600 group-hover/seller:text-emerald-800 truncate">
              {product.sellerName}
            </span>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              disabled={product.isSold}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                product.isSold
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-800 hover:text-white'
              }`}
              title="Add to Demo Cart"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
