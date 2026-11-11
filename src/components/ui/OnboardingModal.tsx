import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLLEGES } from '../../data/mockData';
import { X, UserCheck, Sparkles, Building2, GraduationCap } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUser } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [college, setCollege] = useState(currentUser.college);
  const [department, setDepartment] = useState(currentUser.department);
  const [academicYear, setAcademicYear] = useState(currentUser.academicYear);
  const [bio, setBio] = useState(currentUser.bio);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: name.trim(),
      college,
      department: department.trim(),
      academicYear,
      bio: bio.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">Student Profile & Campus</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600/30"
            />
            <div>
              <p className="text-xs font-semibold text-slate-900">Demo Student Mode</p>
              <p className="text-[11px] text-slate-500">
                You are currently browsing with a preconfigured student profile. No password
                required.
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Campus / College
            </label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
            >
              {COLLEGES.filter((c) => c !== 'All Campuses').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Academic Year</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              >
                <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                <option value="4th Year (Senior)">4th Year (Senior)</option>
                <option value="Postgraduate / Masters">Postgraduate / Masters</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Short Bio</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 resize-none"
            />
          </div>

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
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
