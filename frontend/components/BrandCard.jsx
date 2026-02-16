'use client';

import { BadgeIndianRupee, Info, ArrowRight } from 'lucide-react';
import { formatCurrency, formatPercent, getThemeStyles } from '@/lib/utils';

export const BrandCard = ({ item, isDarkMode, onSelect }) => {
  const styles = getThemeStyles(isDarkMode);

  if (!item.breakdown) {
    return null;
  }

  return (
    <div
      className="group h-[480px] w-full [perspective:1000px] cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* --- FRONT OF CARD --- */}
        <div
          className={`absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden] border flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${styles.cardBg} ${item.borderColor}`}
        >
          {/* Subtle Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${item.accentColor}`}></div>

          <div className="relative z-10 flex flex-col h-full p-6">
            {/* Brand Header */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner ${
                  isDarkMode ? 'bg-stone-900' : 'bg-white'
                } ${item.iconColor}`}
              >
                <BadgeIndianRupee size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-medium text-3xl mb-3 tracking-tight">{item.name}</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                {item.tagline}
              </p>
            </div>

            {/* Price Display */}
            <div className={`py-8 border-t ${isDarkMode ? 'border-stone-800' : 'border-stone-200/60'}`}>
              <div className="flex justify-between items-end mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${styles.textMuted}`}>
                  Estimate
                </span>
                <span className={`text-lg font-bold ${item.iconColor}`}>
                  {formatPercent(item.breakdown.makingPercent)}
                </span>
              </div>
              <div className="text-4xl font-sans font-normal tracking-tight">
                {formatCurrency(item.breakdown.total)}
              </div>
            </div>

            {/* Hover Hint */}
            <div className={`flex items-center justify-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.textMuted}`}>
              <span>View Breakdown</span> <ArrowRight size={12} />
            </div>
          </div>
        </div>

        {/* --- BACK OF CARD --- */}
        <div
          className={`absolute inset-0 h-full w-full rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] border overflow-hidden flex flex-col ${styles.bgMain} ${styles.borderColor}`}
        >
          <div
            className={`p-4 text-center font-bold tracking-widest uppercase text-[10px] border-b ${styles.borderColor} ${styles.textMuted}`}
          >
            Official Estimate Slip
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center gap-4 text-sm">
            {/* Gold Value */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 relative group/tooltip cursor-help">
                <span className={`text-xs uppercase tracking-wide ${styles.textMuted}`}>
                  Gold Value
                </span>
                <Info size={12} className={styles.textMuted} />
                <div
                  className={`absolute bottom-full left-0 mb-2 hidden group-hover/tooltip:block w-max max-w-[200px] p-2 rounded text-[10px] shadow-lg z-20 ${
                    isDarkMode ? 'bg-stone-800 text-stone-200' : 'bg-stone-800 text-stone-100'
                  }`}
                >
                  weight × purity × rate per gram
                </div>
              </div>
              <span className="font-mono text-base">{formatCurrency(item.breakdown.goldValue)}</span>
            </div>

            {/* Making Charges */}
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wide text-rose-500">
                Making ({formatPercent(item.breakdown.makingPercent)})
              </span>
              <span className="font-mono text-base text-rose-500">
                +{formatCurrency(item.breakdown.makingCharges)}
              </span>
            </div>

            {/* Wastage */}
            <div className="flex justify-between items-center">
              <span className={`text-xs uppercase tracking-wide ${styles.textMuted}`}>Wastage</span>
              <span className={`font-mono text-base ${styles.textMuted}`}>
                +{formatCurrency(item.breakdown.wastageCharges)}
              </span>
            </div>

            {/* Divider */}
            <div className={`h-px w-full my-1 ${styles.borderColor}`}></div>

            {/* Price Before GST */}
            <div className="flex justify-between items-center">
              <span className={`text-xs uppercase tracking-wide ${styles.textMuted}`}>Before GST</span>
              <span className={`font-mono text-base ${styles.textMuted}`}>
                {formatCurrency(item.breakdown.subtotal)}
              </span>
            </div>

            {/* GST */}
            <div className="flex justify-between items-center">
              <span className={`text-xs uppercase tracking-wide ${styles.textMuted}`}>GST (3%)</span>
              <span className={`font-mono text-base ${styles.textMuted}`}>
                +{formatCurrency(item.breakdown.gst)}
              </span>
            </div>

            {/* Total */}
            <div className={`mt-auto pt-4 border-t ${styles.borderColor} flex justify-between items-end`}>
              <span className="text-xs font-bold uppercase">Total</span>
              <span className="font-mono text-xl font-bold">
                {formatCurrency(item.breakdown.total)}
              </span>
            </div>
          </div>

          <div
            className={`p-3 text-center text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isDarkMode ? 'bg-stone-900 text-stone-400' : 'bg-stone-100 text-stone-500'
            }`}
          >
            Click for Details
          </div>
        </div>
      </div>
    </div>
  );
};
