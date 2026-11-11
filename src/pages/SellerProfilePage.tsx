import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Building2,
  GraduationCap,
  Calendar,
  AlertTriangle,
  Flag,
} from 'lucide-react';

export const SellerProfilePage: React.FC = () => {
  const { selectedSellerId, getStudentById, products, startChatWithSeller, showToast } =
    useApp();

  const student = (selectedSellerId && getStudentById(selectedSellerId)) || getStudentById('student-1')!;

  const sellerProducts = products.filter(
    (p) => p.sellerId === student.id || (student.isCurrentUser && p.isUserListing)
  );

  const handleReport = () => {
    showToast(
      'Report Submitted',
      'Thank you for keeping campus safe. Our student moderation team will review this report.',
      'info'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={student.avatar}
              alt={student.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-600/40 shadow-xs"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {student.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Verified Student
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {student.college}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  {student.department}
                </span>
                <span aria-hidden="true">·</span>
                <span>{student.academicYear}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-slate-900">{student.rating}</span>
                  <span className="text-slate-500 font-normal">
                    ({student.reviewsCount} campus ratings)
                  </span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">
                  Joined {student.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!student.isCurrentUser && (
              <button
                onClick={() => startChatWithSeller(student.id)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Contact Student</span>
              </button>
            )}
            <button
              onClick={handleReport}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
              title="Report Seller"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bio */}
        {student.bio && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              About Student
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {student.bio}
            </p>
          </div>
        )}

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 max-w-lg">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Listings</p>
            <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
              {sellerProducts.filter((p) => !p.isSold).length}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Handoffs Completed</p>
            <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
              {student.completedSales}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Response Rate</p>
            <p className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
              &lt; 30 mins
            </p>
          </div>
        </div>
      </div>

      {/* Seller's Listings */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Listings by {student.name} ({sellerProducts.length})
        </h2>

        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellerProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No active listings currently from this student.
          </div>
        )}
      </div>
    </div>
  );
};
