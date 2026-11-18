export type SupportedLanguage = 'zh-TW' | 'zh-CN' | 'en';

export type FiveElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export interface CityPreset {
  id: string;
  nameZhTW: string;
  nameZhCN: string;
  nameEn: string;
  longitude: number;
  latitude: number;
  timezone: number; // Base UTC offset
}

export interface BaziPillar {
  stem: string;
  branch: string;
  elementStem: FiveElement;
  elementBranch: FiveElement;
  stemTenGod: string;
  hiddenStems: { stem: string; god: string; element: FiveElement }[];
  nayin: string;
}

export interface BaziResult {
  birthDateTime: string;
  trueSolarTime: string;
  timeOffsetMinutes: number;
  equationOfTimeMinutes: number;
  longitudeOffsetMinutes: number;
  gender: 'male' | 'female';
  solarDate: string;
  yearPillar: BaziPillar;
  monthPillar: BaziPillar;
  dayPillar: BaziPillar;
  hourPillar: BaziPillar;
  dayMaster: {
    stem: string;
    element: FiveElement;
    nature: string;
  };
  elementCounts: Record<FiveElement, number>;
  elementPercentages: Record<FiveElement, number>;
  fortuneDirection: 'forward' | 'backward';
  startingAge: number;
  luckyColor: {
    name: string;
    hex: string;
    element: FiveElement;
    desc: string;
  };
}

export interface DailyCelestialInfo {
  sydneyTime: string;
  sydneyDate: string;
  stemBranchYear: string;
  stemBranchMonth: string;
  stemBranchDay: string;
  stemBranchHour: string;
  elementDay: FiveElement;
  solarTerm: string;
  auspicious: string[];
  inauspicious: string[];
  luckyColor: {
    name: string;
    hex: string;
    secondaryHex: string;
    advice: string;
  };
}
