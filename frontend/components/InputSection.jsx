'use client';

import { ChevronDown, Gem, Filter } from 'lucide-react';
import { PURITY_FACTORS, CATEGORIES, SUBCATEGORIES } from '@/lib/constants';
import { getThemeStyles } from '@/lib/utils';

export const InputSection = ({ inputs, onInputChange, isDarkMode }) => {
  const styles = getThemeStyles(isDarkMode);

  return (
    <section
      className={`rounded-3xl border shadow-2xl p-6 md:p-10 mb-16 transition-all duration-500 ${styles.cardBg} ${styles.borderColor}`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`h-8 w-1 rounded-full ${isDarkMode ? 'bg-cyan-500' : 'bg-amber-500'}`}></div>
        <h2 className="text-2xl font-serif font-medium">Configure Purchase</h2>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Weight Input */}
        <div className="group">
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${styles.textMuted}`}>
            Gold Weight
          </label>
          <div
            className={`flex items-center border rounded-xl overflow-hidden transition-all duration-300 group-hover:border-stone-400 ${styles.borderColor} ${styles.inputBg}`}
          >
            <input
              type="number"
              name="weight"
              value={inputs.weight}
              onChange={onInputChange}
              className="w-full p-4 outline-none font-serif text-lg bg-transparent"
              aria-label="Gold weight in grams"
            />
            <span className={`px-4 font-medium text-sm ${styles.textMuted}`}>grams</span>
          </div>
        </div>

        {/* Purity Select */}
        <div className="group relative">
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${styles.textMuted}`}>
            Purity
          </label>
          <div
            className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-300 group-hover:border-stone-400 ${styles.borderColor} ${styles.inputBg}`}
          >
            <select
              name="purity"
              value={inputs.purity}
              onChange={onInputChange}
              className="w-full p-4 pr-10 outline-none font-serif text-lg bg-transparent appearance-none cursor-pointer z-10"
              aria-label="Gold purity"
            >
              {Object.keys(PURITY_FACTORS).map((k) => (
                <option key={k} value={k} className={isDarkMode ? 'bg-stone-900' : 'bg-white'}>
                  {k}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-4 pointer-events-none ${styles.textMuted}`} size={18} />
          </div>
        </div>

        {/* Category Select */}
        <div className="group relative">
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${styles.textMuted}`}>
            Jewellery Type
          </label>
          <div
            className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-300 group-hover:border-stone-400 ${styles.borderColor} ${styles.inputBg}`}
          >
            <select
              name="category"
              value={inputs.category}
              onChange={onInputChange}
              className="w-full p-4 pr-10 outline-none font-serif text-lg bg-transparent appearance-none cursor-pointer z-10"
              aria-label="Jewellery category"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id} className={isDarkMode ? 'bg-stone-900' : 'bg-white'}>
                  {c.label}
                </option>
              ))}
            </select>
            <Gem className={`absolute right-4 pointer-events-none ${styles.textMuted}`} size={18} />
          </div>
        </div>

        {/* Sub-Category Select */}
        <div className="group relative">
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${styles.textMuted}`}>
            Complexity / Style
          </label>
          <div
            className={`relative flex items-center border rounded-xl overflow-hidden transition-all duration-300 group-hover:border-stone-400 ${styles.borderColor} ${styles.inputBg}`}
          >
            <select
              name="subcategory"
              value={inputs.subcategory}
              onChange={onInputChange}
              className="w-full p-4 pr-10 outline-none font-serif text-lg bg-transparent appearance-none cursor-pointer z-10"
              aria-label="Jewellery style"
            >
              {SUBCATEGORIES[inputs.category]?.map((s) => (
                <option key={s.id} value={s.id} className={isDarkMode ? 'bg-stone-900' : 'bg-white'}>
                  {s.label}
                </option>
              ))}
            </select>
            <Filter className={`absolute right-4 pointer-events-none ${styles.textMuted}`} size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};
