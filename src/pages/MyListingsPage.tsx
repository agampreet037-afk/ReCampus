import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import {
  Package,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';

export const MyListingsPage: React.FC = () => {
  const { products, currentUser, updateProduct, deleteProduct, toggleMarkSold, navigate } =
    useApp();

  // Find user's listings (or listings matching currentUser id or isUserListing flag)
  const myListings = products.filter(
    (p) => p.isUserListing || p.sellerId === currentUser.id
  );

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const activeCount = myListings.filter((p) => !p.isSold).length;
  const soldCount = myListings.filter((p) => p.isSold).length;

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setEditTitle(p.title);
    setEditPrice(p.price.toString());
    setEditDesc(p.description);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      title: editTitle.trim(),
      price: Number(editPrice),
      description: editDesc.trim(),
    });
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Campus Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your active items for sale, update prices, or mark products as sold.
          </p>
        </div>

        <button
          onClick={() => navigate('sell')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-emerald-300" />
          <span>Create New Listing</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Listings</p>
          <p className="text-2xl font-bold text-slate-900 font-mono mt-1">{myListings.length}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-emerald-700">Active Live</p>
          <p className="text-2xl font-bold text-emerald-800 font-mono mt-1">{activeCount}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-amber-600">Marked Sold</p>
          <p className="text-2xl font-bold text-slate-700 font-mono mt-1">{soldCount}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Value</p>
          <p className="text-2xl font-bold text-slate-900 font-mono mt-1">
            ₹{myListings.reduce((sum, p) => sum + p.price, 0).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Listings List */}
      {myListings.length > 0 ? (
        <div className="space-y-4">
          {myListings.map((product) => (
            <div
              key={product.id}
              className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        product.isSold
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {product.isSold ? 'Sold' : 'Active'}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{product.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">{product.title}</h3>
                  <p className="text-sm font-bold text-slate-900 font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => toggleMarkSold(product.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    product.isSold
                      ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {product.isSold ? 'Mark Active' : 'Mark as Sold'}
                </button>

                <button
                  onClick={() => handleOpenEdit(product)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Edit listing details"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('product-detail', { productId: product.id })}
                  className="p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                  title="View live page"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this listing?')) {
                      deleteProduct(product.id);
                    }
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-slate-800">You haven&apos;t listed any items yet</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Free up hostel room space and help peers on campus by listing your previous semester
            textbooks, calculator, or essentials.
          </p>
          <button
            onClick={() => navigate('sell')}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Create Your First Listing
          </button>
        </div>
      )}

      {/* Edit Listing Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Edit Listing</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Price (₹ INR)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
