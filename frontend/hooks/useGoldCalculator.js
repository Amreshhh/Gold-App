'use client';

import { useMemo } from 'react';
import { PURITY_FACTORS, CATEGORIES, SUBCATEGORIES, BRANDS } from '@/lib/constants';

/**
 * Hook that calculates gold pricing across all brands.
 * Returns sorted results by total price (lowest first).
 */
export const useGoldCalculator = (inputs) => {
  return useMemo(() => {
    const selectedCategory = CATEGORIES.find((c) => c.id === inputs.category);
    const categoryMod = selectedCategory ? selectedCategory.baseChargeMod : 0;
    const selectedSub = SUBCATEGORIES[inputs.category]?.find(
      (s) => s.id === inputs.subcategory
    );
    const subMod = selectedSub ? selectedSub.chargeMod : 0;
    const purityFactor = PURITY_FACTORS[inputs.purity];
    const goldValue = inputs.rate * inputs.weight * purityFactor;

    const calculatedData = BRANDS.map((brand) => {
      const actualMakingPercent = brand.baseMaking + categoryMod + subMod;
      const makingCharges = goldValue * actualMakingPercent;
      const wastageCharges = goldValue * brand.baseWastage;
      const hallmarkCharge = 45;
      const subtotal = goldValue + makingCharges + wastageCharges + hallmarkCharge;
      const gst = subtotal * 0.03;
      const total = subtotal + gst;

      return {
        ...brand,
        breakdown: {
          goldValue,
          makingCharges,
          makingPercent: actualMakingPercent,
          wastageCharges,
          hallmarkCharge,
          subtotal,
          gst,
          total,
        },
      };
    });

    return calculatedData.sort((a, b) => a.breakdown.total - b.breakdown.total);
  }, [inputs]);
};
