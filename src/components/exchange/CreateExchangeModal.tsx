import React, { useState } from 'react';
import { ProductCategory, ProductCondition } from '../../types';
import { CATEGORIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { X, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';

interface CreateExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateExchangeModal: React.FC<CreateExchangeModalProps> = ({ isOpen, onClose }) => {
  const { createExchange, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Textbooks and Academic Books');
  const [condition, setCondition] = useState<ProductCondition>('Good');
  const [wantedItems, setWantedItems] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImagePreset, setSelectedImagePreset] = useState(
    '/images/student_textbooks_calculators.jpg'
  );

  if (!isOpen) return null;

  const presets = [
    {
      label: 'Textbooks & Study Material',
      url: '/images/student_textbooks_calculators.jpg',
    },
    {
      label: 'Electronics & Tech Gear',
      url: '/images/campus_tech_electronics.jpg',
    },
    {
      label: 'Stationery & Drawing Kit',
      url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'Sports Equipment',
      url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !wantedItems.trim() || !description.trim()) return;

    createExchange({
      title: title.trim(),
      category,
      condition,
      wantedItems: wantedItems.trim(),
      description: description.trim(),
      images: [selectedImagePreset, '/images/student_exchange_handshake.jpg'],
      college: currentUser.college,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">List an Item for Swap</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Item You Want to Swap
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Higher Engineering Math (B.S. Grewal 44th Edition)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              required
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ProductCondition)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
            </div>
          </div>

          {/* Wanted Items */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              What do you want in return?
            </label>
            <input
              type="text"
              value={wantedItems}
              onChange={(e) => setWantedItems(e.target.value)}
              placeholder="e.g. Algorithms (CLRS) / Badminton Racket / Drawing board"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              required
            />
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Be specific about subjects, authors, equipment, or alternative acceptable items.
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State the item's condition, edition, markings, or semester requirements..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none"
              required
            />
          </div>

          {/* Photo Preset Selection */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1.5">
              Select Cover Image
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  key={p.url}
                  type="button"
                  onClick={() => setSelectedImagePreset(p.url)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border text-left text-xs transition-all ${
                    selectedImagePreset === p.url
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={p.url}
                    alt={p.label}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded object-cover shrink-0"
                  />
                  <span className="truncate">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Campus Tag */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            Posting from <span className="font-semibold text-slate-900">{currentUser.college}</span>{' '}
            as <span className="font-semibold text-slate-900">{currentUser.name}</span>.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              Publish Swap Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
