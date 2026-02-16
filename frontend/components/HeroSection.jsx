'use client';

import { ArrowDown } from 'lucide-react';
import { getThemeStyles } from '@/lib/utils';
import { FeatureRow } from './FeatureRow';

export const HeroSection = ({ isDarkMode, onScrollToEstimator }) => {
  const styles = getThemeStyles(isDarkMode);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[120px] opacity-30 transition-colors duration-700 ${
            isDarkMode ? 'bg-cyan-900/40' : 'bg-amber-200/60'
          }`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 transition-colors duration-700 ${
            isDarkMode ? 'bg-purple-900/20' : 'bg-orange-100'
          }`}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Decorative Line */}
        <div
          className={`w-24 h-[1px] mb-8 transition-colors duration-500 ${
            isDarkMode
              ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent'
              : 'bg-gradient-to-r from-transparent via-amber-600 to-transparent'
          }`}
        ></div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 leading-[1.1]">
          Jewellery Pricing,<br />
          <span className={`italic font-light ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Perfectly Transparent
          </span>
        </h1>

        {/* Subheading */}
        <p className={`text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed ${styles.textMuted}`}>
          Real-time gold estimation across India&apos;s top jewellers. No hidden charges, just pure
          value clarity.
        </p>

        {/* CTA Button */}
        <button
          onClick={onScrollToEstimator}
          className={`group relative px-8 py-4 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-2xl ${
            isDarkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-stone-100'
          }`}
        >
          <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r from-transparent via-stone-400 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000"></div>
          <div className="relative flex items-center gap-3 font-medium tracking-wide">
            Start Estimating{' '}
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </div>
        </button>

        {/* Feature Row */}
        <FeatureRow isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};
