'use client';

import { useState, useRef } from 'react';
import {
  ThemeToggle,
  Header,
  HeroSection,
  InputSection,
  BrandGrid,
  BrandModal,
  Disclaimer,
} from '@/components';
import { useGoldCalculator } from '@/hooks/useGoldCalculator';
import { SUBCATEGORIES } from '@/lib/constants';
import { getThemeStyles } from '@/lib/utils';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [inputs, setInputs] = useState({
    weight: 10,
    purity: '22K',
    category: 'chains',
    subcategory: 'machine',
    rate: 14620,
  });

  const [selectedBrand, setSelectedBrand] = useState(null);
  const estimatorRef = useRef(null);

  const results = useGoldCalculator(inputs);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const scrollToEstimator = () => {
    estimatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      setInputs((prev) => ({
        ...prev,
        category: value,
        subcategory: SUBCATEGORIES[value] ? SUBCATEGORIES[value][0].id : '',
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: name === 'weight' || name === 'rate' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const styles = getThemeStyles(isDarkMode);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${styles.bgMain} ${styles.textMain}`}>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />

      <HeroSection isDarkMode={isDarkMode} onScrollToEstimator={scrollToEstimator} />

      <div ref={estimatorRef} className="relative z-20">
        <Header
          isDarkMode={isDarkMode}
          currentRate={inputs.rate}
          onToggleTheme={toggleTheme}
        />

        <main className="max-w-7xl mx-auto px-4 py-12">
          <InputSection inputs={inputs} onInputChange={handleInputChange} isDarkMode={isDarkMode} />
          <BrandGrid results={results} isDarkMode={isDarkMode} onBrandSelect={setSelectedBrand} />
          <Disclaimer isDarkMode={isDarkMode} />
        </main>
      </div>

      <BrandModal selectedBrand={selectedBrand} isDarkMode={isDarkMode} onClose={() => setSelectedBrand(null)} />
    </div>
  );
}
