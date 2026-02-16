'use client';

import { X, Info, MapPin } from 'lucide-react';
import { formatCurrency, getThemeStyles } from '@/lib/utils';

export const BrandModal = ({ selectedBrand, isDarkMode, onClose }) => {
  if (!selectedBrand || !selectedBrand.breakdown) {
    return null;
  }

  const styles = getThemeStyles(isDarkMode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border ${styles.bgMain} ${styles.borderColor}`}
      >
        {/* Modal Header */}
        <div className="relative p-8 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${selectedBrand.accentColor}`}></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h3 className="font-serif font-medium text-3xl mb-1">{selectedBrand.name}</h3>
              <p className={`text-sm tracking-wide ${styles.textMuted}`}>{selectedBrand.storeType}</p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'bg-stone-900 hover:bg-stone-800' : 'bg-white hover:bg-stone-100'
              }`}
              aria-label="Close modal"
            >
              <X size={20} className={styles.textMuted} />
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {/* Big Price */}
          <div className={`text-center py-6 border-y ${styles.borderColor}`}>
            <p className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-2 ${styles.textMuted}`}>
              Final Estimated Price
            </p>
            <p className="text-5xl font-serif font-medium">
              {formatCurrency(selectedBrand.breakdown.total)}
            </p>
          </div>

          {/* Tips Section */}
          <div className="space-y-6">
            {/* Negotiation Insight */}
            <div className="flex gap-5">
              <div
                className={`p-3 rounded-2xl h-fit ${
                  isDarkMode ? 'bg-stone-900 text-stone-300' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-serif font-medium text-lg mb-2">Negotiation Insight</h4>
                <p className={`text-sm leading-relaxed ${styles.textMuted}`}>
                  {selectedBrand.id === 1 || selectedBrand.id === 4
                    ? 'Large corporate chains usually have fixed gold rates, but you can often negotiate discounts on diamond value or during seasonal sales.'
                    : 'Making charges here are often flexible. Try asking for a 1-2% discount on the making charges (MC) before finalizing.'}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-5">
              <div
                className={`p-3 rounded-2xl h-fit ${
                  isDarkMode ? 'bg-stone-900 text-stone-300' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-serif font-medium text-lg mb-2">Location</h4>
                <p className={`text-sm leading-relaxed ${styles.textMuted}`}>
                  {selectedBrand.distance} away. <span className="opacity-70">Open until 9:00 PM.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                isDarkMode ? 'bg-stone-100 text-stone-900 hover:bg-white' : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
