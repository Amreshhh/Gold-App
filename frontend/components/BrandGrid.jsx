'use client';

import { BrandCard } from './BrandCard';

export const BrandGrid = ({ results, isDarkMode, onBrandSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {results.map((item) => (
        <BrandCard
          key={item.id}
          item={item}
          isDarkMode={isDarkMode}
          onSelect={onBrandSelect}
        />
      ))}
    </div>
  );
};
