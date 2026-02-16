export const PURITY_FACTORS = {
  '24K': 1.0,
  '22K': 0.916,
  '18K': 0.750,
};

export const CATEGORIES = [
  { id: 'coins', label: 'Gold Coins/Bars', baseChargeMod: 0 },
  { id: 'chains', label: 'Chains (Plain)', baseChargeMod: 0.02 },
  { id: 'bangles', label: 'Bangles', baseChargeMod: 0.03 },
  { id: 'rings', label: 'Rings', baseChargeMod: 0.04 },
  { id: 'necklace', label: 'Intricate Necklace', baseChargeMod: 0.06 },
];

export const SUBCATEGORIES = {
  coins: [
    { id: 'standard', label: 'Standard Round', chargeMod: 0 },
    { id: 'rectangular', label: 'Rectangular Bar', chargeMod: 0.005 },
    { id: 'vedic', label: 'Vedic Collection', chargeMod: 0.02 },
  ],
  chains: [
    { id: 'machine', label: 'Machine Made', chargeMod: 0 },
    { id: 'handmade', label: 'Hand Made', chargeMod: 0.03 },
    { id: 'hollow', label: 'Hollow/Rope', chargeMod: 0.015 },
  ],
  bangles: [
    { id: 'solid', label: 'Solid Plain', chargeMod: 0 },
    { id: 'nakshi', label: 'Nakshi Work', chargeMod: 0.05 },
    { id: 'stone', label: 'Stone Studded', chargeMod: 0.04 },
  ],
  rings: [
    { id: 'plain', label: 'Plain Band', chargeMod: 0 },
    { id: 'casting', label: 'Casting', chargeMod: 0.02 },
    { id: 'couple', label: 'Couple Bands', chargeMod: 0.03 },
  ],
  necklace: [
    { id: 'plain', label: 'Simple Gold', chargeMod: 0 },
    { id: 'antique', label: 'Antique Finish', chargeMod: 0.08 },
    { id: 'temple', label: 'Temple Jewellery', chargeMod: 0.10 },
  ],
};

export const BRANDS = [
  {
    id: 1,
    name: 'Tanishq',
    baseMaking: 0.18,
    baseWastage: 0.02,
    accentColor: 'from-rose-500/20 to-rose-900/5',
    borderColor: 'border-rose-200/50 dark:border-rose-900/30',
    iconColor: 'text-rose-700 dark:text-rose-400',
    tagline: 'Premium Assurance',
    distance: '4.2 km',
    storeType: 'Corporate Showroom',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tanishq_Logo.svg/2560px-Tanishq_Logo.svg.png',
  },
  {
    id: 2,
    name: 'Kalyan',
    baseMaking: 0.14,
    baseWastage: 0.015,
    accentColor: 'from-amber-500/20 to-amber-900/5',
    borderColor: 'border-amber-200/50 dark:border-amber-900/30',
    iconColor: 'text-amber-700 dark:text-amber-400',
    tagline: 'Trusted Legacy',
    distance: '2.8 km',
    storeType: 'Authorized Dealer',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kalyan_Jewellers_Logo.svg/1200px-Kalyan_Jewellers_Logo.svg.png',
  },
  {
    id: 3,
    name: 'Malabar',
    baseMaking: 0.12,
    baseWastage: 0.01,
    accentColor: 'from-orange-500/20 to-orange-900/5',
    borderColor: 'border-orange-200/50 dark:border-orange-900/30',
    iconColor: 'text-orange-700 dark:text-orange-400',
    tagline: 'Fair Price Promise',
    distance: '5.1 km',
    storeType: 'Large Format Store',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Malabar_Gold_and_Diamonds_Logo.jpg',
  },
  {
    id: 4,
    name: 'Joyalukkas',
    baseMaking: 0.13,
    baseWastage: 0.015,
    accentColor: 'from-yellow-500/20 to-yellow-900/5',
    borderColor: 'border-yellow-200/50 dark:border-yellow-900/30',
    iconColor: 'text-yellow-700 dark:text-yellow-400',
    tagline: "World's Favorite",
    distance: '3.5 km',
    storeType: 'Flagship Store',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Joyalukkas_Logo.svg/2560px-Joyalukkas_Logo.svg.png',
  },
];
