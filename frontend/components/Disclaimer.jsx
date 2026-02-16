'use client';

import { getThemeStyles } from '@/lib/utils';

export const Disclaimer = ({ isDarkMode }) => {
  const styles = getThemeStyles(isDarkMode);

  return (
    <div className="mt-24 text-center pb-12">
      <p className={`text-xs max-w-2xl mx-auto leading-relaxed opacity-60 ${styles.textMuted}`}>
        <span className="font-bold">Disclaimer:</span> Prices are estimates based on standard
        market formulas and may vary due to daily rate fluctuations, specific stone charges, or
        intricate designs. Always verify final invoice details at the store.
      </p>
    </div>
  );
};
