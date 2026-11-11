import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ProductCategory, ProductCondition } from '../types';
import {
  PlusCircle,
  Upload,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  Eye,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const SellPage: React.FC = () => {
  const { createProduct, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Textbooks and Academic Books');
  const [condition, setCondition] = useState<ProductCondition>('Good');
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [pickupSpot, setPickupSpot] = useState('Central Library Foyer or North Lawn');
  const [selectedImagePreset, setSelectedImagePreset] = useState(
    '/images/student_textbooks_calculators.jpg'
  );
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);

  const presets = [
    {
      label: 'Textbooks & Study Notes',
      url: '/images/student_textbooks_calculators.jpg',
    },
    {
      label: 'Electronics & Dorm Tech',
      url: '/images/campus_tech_electronics.jpg',
    },
    {
      label: 'Engineering Graphics & Drawing',
      url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'Lab Coat & Biology Gear',
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'Badminton & Sports Gear',
      url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'Dorm Table & Chair Accessories',
      url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const activeImage = customImagePreview || selectedImagePreset;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = Number(sellingPrice);
    const origPriceNum = originalPrice ? Number(originalPrice) : undefined;

    if (!title.trim() || priceNum <= 0) return;

    createProduct({
      title: title.trim(),
      category,
      condition,
      price: priceNum,
      originalPrice: origPriceNum,
      description: description.trim(),
      images: [activeImage],
      college: currentUser.college,
      pickupSpot: pickupSpot.trim(),
    });
  };

  const discountPreview =
    originalPrice && Number(originalPrice) > Number(sellingPrice)
      ? Math.round(((Number(originalPrice) - Number(sellingPrice)) / Number(originalPrice)) * 100)
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          List an Item for Sale
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Turn your unused semester books, electronics, or dorm gear into campus cash.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                Item Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Casio FX-991EX ClassWiz Scientific Calculator"
                maxLength={90}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block text-right font-mono">
                {title.length}/90
              </span>
            </div>

            {/* Category and Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ProductCondition)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                >
                  <option value="Like New">Like New (barely used, zero flaws)</option>
                  <option value="Good">Good (minor signs of wear, fully working)</option>
                  <option value="Fair">Fair (functional with visible wear)</option>
                  <option value="Needs Repair">Needs Repair (for parts/fixers)</option>
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                  Selling Price (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold font-mono">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="250"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                  Original Purchase Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold font-mono">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="750"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention semester usage, editions, included accessories, or reasons for selling..."
                maxLength={500}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none"
                required
              />
              <span className="text-[11px] text-slate-400 mt-1 block text-right font-mono">
                {description.length}/500
              </span>
            </div>

            {/* Product Image Preset or Custom Upload */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                Item Photo (Select Preset or Upload)
              </label>

              {/* Upload button */}
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors">
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span>Upload Custom Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {customImagePreview && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Custom photo loaded
                  </span>
                )}
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {presets.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      setCustomImagePreview(null);
                      setSelectedImagePreset(preset.url);
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      !customImagePreview && selectedImagePreset === preset.url
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-700'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-[11px] truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Meetup spot */}
            <div>
              <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
                Preferred Campus Meetup Spot
              </label>
              <input
                type="text"
                value={pickupSpot}
                onChange={(e) => setPickupSpot(e.target.value)}
                placeholder="e.g. Central Library Lawn, Tech Park Canteen, Hostel 1"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            {/* Publishing details */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p>
                Posting to:{' '}
                <strong className="text-slate-900">{currentUser.college}</strong> as{' '}
                <strong className="text-slate-900">{currentUser.name}</strong>.
              </p>
              <p className="text-[11px] text-slate-500">
                Your listing will be instantly visible in the marketplace and can be edited or
                deleted anytime from &ldquo;My Listings&rdquo;.
              </p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Publish Listing to ReCampus</span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Card Preview */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-emerald-700" />
            <span>Live Card Preview</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-sm">
            <div className="relative aspect-[4/3] bg-slate-100">
              <img
                src={activeImage}
                alt="Listing preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-[11px] font-medium text-white">
                {condition}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>{category}</span>
                <span aria-hidden="true">·</span>
                <span>Just now</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                {title || 'Untitled Campus Listing'}
              </h3>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-bold text-slate-900 font-mono">
                  ₹{sellingPrice ? Number(sellingPrice).toLocaleString('en-IN') : '0'}
                </span>
                {originalPrice && Number(originalPrice) > 0 && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    ₹{Number(originalPrice).toLocaleString('en-IN')}
                  </span>
                )}
                {discountPreview && discountPreview > 0 && (
                  <span className="text-xs font-semibold text-emerald-700">
                    {discountPreview}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{currentUser.college}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>By {currentUser.name}</span>
                <span className="text-emerald-800 font-medium">Ready to Publish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
