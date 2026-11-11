import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Leaf,
  BookOpen,
  RefreshCw,
  Trees,
  Droplets,
  DollarSign,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const SustainabilityPage: React.FC = () => {
  const { navigate } = useApp();

  // Interactive Calculator State
  const [calcBooks, setCalcBooks] = useState<number>(4);
  const [calcElectronics, setCalcElectronics] = useState<number>(1);
  const [calcLabGear, setCalcLabGear] = useState<number>(2);

  // Formulas for calculations:
  // 1 textbook ~ 2.5 kg CO2, 120 liters water, ₹450 savings
  // 1 electronic ~ 18 kg CO2, 350 liters water, ₹1200 savings
  // 1 lab coat / gear ~ 5 kg CO2, 800 liters water, ₹350 savings
  const calcTrees = ((calcBooks * 2.5 + calcElectronics * 18 + calcLabGear * 5) / 20).toFixed(1);
  const calcWater = (calcBooks * 120 + calcElectronics * 350 + calcLabGear * 800).toLocaleString('en-IN');
  const calcSavings = (calcBooks * 450 + calcElectronics * 1200 + calcLabGear * 350).toLocaleString('en-IN');
  const calcCarbon = (calcBooks * 2.5 + calcElectronics * 18 + calcLabGear * 5).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold text-emerald-300">
            <Leaf className="w-3.5 h-3.5" />
            <span>Campus Circular Economy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Reuse Impact Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every textbook passed down across semesters and every pre-owned calculator recirculated
            directly diverts waste from campus landfills while putting money back into student
            pockets.
          </p>
        </div>
      </div>

      {/* Aggregate Impact Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">860+</p>
          <p className="text-xs font-bold text-slate-800">Textbooks Recirculated</p>
          <p className="text-[11px] text-slate-500">Prevented new paper pulp production</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <RefreshCw className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">310+</p>
          <p className="text-xs font-bold text-slate-800">Peer Swaps Completed</p>
          <p className="text-[11px] text-slate-500">Zero-cash direct exchanges</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <Trees className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">4.8 Tons</p>
          <p className="text-xs font-bold text-slate-800">Estimated CO₂ Avoided</p>
          <p className="text-[11px] text-slate-500">Emissions saved from logistics & manufacturing</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">₹3,40,000+</p>
          <p className="text-xs font-bold text-slate-800">Student Money Saved</p>
          <p className="text-[11px] text-slate-500">Retained in student wallets</p>
        </div>
      </div>

      {/* Interactive Student Impact Calculator */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Personal Reuse Calculator</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Estimate how much money and environmental resource you can conserve throughout your
            college degree by buying and selling second-hand on ReCampus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span>Textbooks passed down or bought pre-owned:</span>
                <span className="font-bold text-slate-900 font-mono">{calcBooks} books</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={calcBooks}
                onChange={(e) => setCalcBooks(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span>Calculators / Electronics reused:</span>
                <span className="font-bold text-slate-900 font-mono">{calcElectronics} items</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={calcElectronics}
                onChange={(e) => setCalcElectronics(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span>Lab coats, drafters & sports gear reused:</span>
                <span className="font-bold text-slate-900 font-mono">{calcLabGear} items</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={calcLabGear}
                onChange={(e) => setCalcLabGear(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Calculated Output (6 cols) */}
          <div className="lg:col-span-6 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-6 sm:p-8 space-y-4">
            <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Your Projected Degree Savings
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <p className="text-[11px] font-semibold text-slate-500">Financial Savings</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-900 font-mono mt-0.5">
                  ₹{calcSavings}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <p className="text-[11px] font-semibold text-slate-500">CO₂ Abated</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-900 font-mono mt-0.5">
                  {calcCarbon} kg
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <p className="text-[11px] font-semibold text-slate-500">Water Conserved</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-900 font-mono mt-0.5">
                  {calcWater} L
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs">
                <p className="text-[11px] font-semibold text-slate-500">Equivalent Trees</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-900 font-mono mt-0.5">
                  {calcTrees} trees
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
              Passing down books and equipment ensures nothing goes to waste when seniors graduate.
            </p>
          </div>
        </div>
      </section>

      {/* Category Resource Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Textbooks & Notes</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Paper and publishing account for significant deforestation. Second-hand books retain 100%
            of the knowledge value with 0% additional tree harvesting.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Calculators & Electronics</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Scientific calculators and desktop tech contain microchips, lithium batteries, and LCDs
            that are durable for 10+ years. Reselling extends their lifecycle by semesters.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Lab Coats & Instruments</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cotton lab coats and brass drawing sets usually survive semesters with no wear and tear.
            Passing them to juniors cuts campus expenditure significantly.
          </p>
        </div>
      </div>

      {/* Disclaimer Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <p className="font-bold">Illustrative Demonstration Notice</p>
          <p className="leading-relaxed">
            All environmental and sustainability metrics displayed on this page are illustrative
            demonstration figures designed for hackathon evaluation and conceptual modeling, rather
            than independently audited commercial environmental measurements.
          </p>
        </div>
      </div>
    </div>
  );
};
