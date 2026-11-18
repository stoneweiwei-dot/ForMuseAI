import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SupportedLanguage } from '../types';

export interface Translations {
  brandName: string;
  brandTagline: string;
  navHome: string;
  navBazi: string;
  navSolarTime: string;
  navDaily: string;
  navColors: string;
  navChapters: string;
  navKnowledge: string;
  navReport: string;
  sydneyTimeTag: string;
  baziTitle: string;
  baziSubtitle: string;
  inputBirthDate: string;
  inputBirthTime: string;
  inputGender: string;
  inputCity: string;
  genderMale: string;
  genderFemale: string;
  trueSolarToggle: string;
  trueSolarTip: string;
  btnCalculate: string;
  resultTitle: string;
  colYear: string;
  colMonth: string;
  colDay: string;
  colHour: string;
  rowStem: string;
  rowBranch: string;
  rowTenGod: string;
  rowHidden: string;
  rowNayin: string;
  dayMasterLabel: string;
  fiveElementsTitle: string;
  luckyColorTitle: string;
  btnShareChart: string;
  radarTitle: string;
  radarSubtitle: string;
  dailyTitle: string;
  dailySubtitle: string;
  auspiciousLabel: string;
  inauspiciousLabel: string;
  tenChaptersTitle: string;
  tenChaptersSubtitle: string;
  reportTitle: string;
  reportSubtitle: string;
  reportNotice: string;
  reportFeature1: string;
  reportFeature2: string;
  reportFeature3: string;
  btnBookReport: string;
  footerRights: string;
  footerOriginal: string;
}

const DICTIONARY: Record<SupportedLanguage, Translations> = {
  'zh-TW': {
    brandName: '昭梧 ZHAOWU',
    brandTagline: '讓天時有形，讓命理可讀',
    navHome: '天時總覽',
    navBazi: '基礎排盤',
    navSolarTime: '真太陽時',
    navDaily: '今日指引',
    navColors: '五行色彩',
    navChapters: '人生十篇章',
    navKnowledge: '命理文庫',
    navReport: '深度報告',
    sydneyTimeTag: '澳洲雪梨天時錨定',
    baziTitle: '免費基礎八字排盤',
    baziSubtitle: '遵古法均時差與地理經度校正，還原命主降生一刻之真實天機',
    inputBirthDate: '出生日期（西曆）',
    inputBirthTime: '出生時辰',
    inputGender: '命主性別',
    inputCity: '降生城市 / 地理經度',
    genderMale: '乾造（男）',
    genderFemale: '坤造（女）',
    trueSolarToggle: '校正真太陽時（經度與均時差）',
    trueSolarTip: '消除平太陽時誤差，確保子丑寅卯交界時辰精準無訛',
    btnCalculate: '啟動天時排盤',
    resultTitle: '四柱八字先天命造',
    colYear: '年柱（根基）',
    colMonth: '月柱（提綱）',
    colDay: '日柱（元神）',
    colHour: '時柱（歸宿）',
    rowStem: '天干',
    rowBranch: '地支',
    rowTenGod: '主星十神',
    rowHidden: '地支藏干',
    rowNayin: '納音五行',
    dayMasterLabel: '命主日元',
    fiveElementsTitle: '五行形勢樞機分佈',
    luckyColorTitle: '先天五行相生色系',
    btnShareChart: '生成分享圖',
    radarTitle: '本命五行強弱動態雷達圖',
    radarSubtitle: '滑鼠懸停或點擊頂點，檢視各五行旺衰樞機與調和詳解',
    dailyTitle: '今日天時天象指引',
    dailySubtitle: '悉尼天時即時流轉 · 辨天人相應之道',
    auspiciousLabel: '今日宜',
    inauspiciousLabel: '今日忌',
    tenChaptersTitle: '昭梧人生十篇章體系',
    tenChaptersSubtitle: '以十個維度拆解命運脈絡，拒絕模稜兩可的吉凶斷語',
    reportTitle: '一次性付費深度命書報告',
    reportSubtitle: '專業命理演算與人工審校結合，一次購得終身珍藏，絕非自動續費訂閱',
    reportNotice: '非訂閱制 · 一次性完整交付 · 恪守嚴格隱私保護',
    reportFeature1: '全盤六十甲子大運與流年逐年排布推演',
    reportFeature2: '事業官祿、財帛藏庫、婚姻眷屬全面剖析',
    reportFeature3: '附贈專屬五行空間色彩與安康調和建議指南',
    btnBookReport: '了解深度命書範例',
    footerRights: '昭梧 ZHAOWU · 版權所有',
    footerOriginal: 'STONE 原創 · 天時有形，命理可讀'
  },
  'zh-CN': {
    brandName: '昭梧 ZHAOWU',
    brandTagline: '让天时有形，让命理可读',
    navHome: '天时总览',
    navBazi: '基础排盘',
    navSolarTime: '真太阳时',
    navDaily: '今日指引',
    navColors: '五行色彩',
    navChapters: '人生十篇章',
    navKnowledge: '命理文库',
    navReport: '深度报告',
    sydneyTimeTag: '澳洲悉尼天时锚定',
    baziTitle: '免费基础八字排盘',
    baziSubtitle: '遵古法均时差与地理经度校正，还原命主降生一刻之真实天机',
    inputBirthDate: '出生日期（公历）',
    inputBirthTime: '出生时辰',
    inputGender: '命主性别',
    inputCity: '降生城市 / 地理经度',
    genderMale: '乾造（男）',
    genderFemale: '坤造（女）',
    trueSolarToggle: '校正真太阳时（经度与均时差）',
    trueSolarTip: '消除平太阳时误差，确保子丑寅卯交界时辰精准无讹',
    btnCalculate: '启动天时排盘',
    resultTitle: '四柱八字先天命造',
    colYear: '年柱（根基）',
    colMonth: '月柱（提纲）',
    colDay: '日柱（元神）',
    colHour: '时柱（归宿）',
    rowStem: '天干',
    rowBranch: '地支',
    rowTenGod: '主星十神',
    rowHidden: '地支藏干',
    rowNayin: '纳音五行',
    dayMasterLabel: '命主日元',
    fiveElementsTitle: '五行形势枢机分布',
    luckyColorTitle: '先天五行相生色系',
    btnShareChart: '生成分享图',
    radarTitle: '本命五行强弱动态雷达图',
    radarSubtitle: '鼠标悬停或点击顶点，查看各五行旺衰枢机与调和详解',
    dailyTitle: '今日天时天象指引',
    dailySubtitle: '悉尼天时实时流转 · 辨天人相应之道',
    auspiciousLabel: '今日宜',
    inauspiciousLabel: '今日忌',
    tenChaptersTitle: '昭梧人生十篇章体系',
    tenChaptersSubtitle: '以十个维度拆解命运脉络，拒绝模棱两可的吉凶断语',
    reportTitle: '一次性付费深度命书报告',
    reportSubtitle: '专业命理演算与人工审校结合，一次购得终身珍藏，绝非自动续费订阅',
    reportNotice: '非订阅制 · 一次性完整交付 · 恪守严格隐私保护',
    reportFeature1: '全盘六十甲子大运与流年逐年排布推演',
    reportFeature2: '事业官禄、财帛藏库、婚姻眷属全面剖析',
    reportFeature3: '附赠专属五行空间色彩与安康调和建议指南',
    btnBookReport: '了解深度命书范例',
    footerRights: '昭梧 ZHAOWU · 版权所有',
    footerOriginal: 'STONE 原创 · 天时有形，命理可读'
  },
  'en': {
    brandName: 'ZHAOWU',
    brandTagline: 'Give Form to Celestial Cycles, Make Destiny Legible',
    navHome: 'Overview',
    navBazi: 'Bazi Chart',
    navSolarTime: 'Solar Time',
    navDaily: 'Today',
    navColors: 'Five Elements',
    navChapters: 'Ten Chapters',
    navKnowledge: 'Library',
    navReport: 'Report',
    sydneyTimeTag: 'Anchored in Sydney Time',
    baziTitle: 'Complimentary Four Pillars (Bazi) Calculator',
    baziSubtitle: 'Corrected by Equation of Time and geographical longitude to reflect authentic celestial alignment at birth',
    inputBirthDate: 'Date of Birth (Gregorian)',
    inputBirthTime: 'Time of Birth',
    inputGender: 'Gender',
    inputCity: 'Birth City / Longitude',
    genderMale: 'Male',
    genderFemale: 'Female',
    trueSolarToggle: 'Apply True Solar Time (Longitude & EoT)',
    trueSolarTip: 'Eliminates clock standard errors for boundary hour accuracy',
    btnCalculate: 'Calculate Celestial Chart',
    resultTitle: 'Innate Four Pillars Chart',
    colYear: 'Year (Root)',
    colMonth: 'Month (Pillar)',
    colDay: 'Day (Master)',
    colHour: 'Hour (Destiny)',
    rowStem: 'Heavenly Stem',
    rowBranch: 'Earthly Branch',
    rowTenGod: 'Ten Gods',
    rowHidden: 'Hidden Stems',
    rowNayin: 'Nayin Element',
    dayMasterLabel: 'Day Master Element',
    fiveElementsTitle: 'Five Elements Distribution',
    luckyColorTitle: 'Harmonizing Element Color',
    btnShareChart: 'Generate Share Card',
    radarTitle: 'Dynamic Five Elements Radar',
    radarSubtitle: 'Hover or tap any vertex to inspect elemental strength and harmonizing advice',
    dailyTitle: 'Daily Celestial Guidance',
    dailySubtitle: 'Real-time Sydney astrological resonance',
    auspiciousLabel: 'Auspicious For',
    inauspiciousLabel: 'Avoid Today',
    tenChaptersTitle: 'Ten Life Chapters Framework',
    tenChaptersSubtitle: 'Structured dimensions of destiny decoding without ambiguous fortune cliches',
    reportTitle: 'One-Time In-Depth Destiny Dossier',
    reportSubtitle: 'Combining classical computational algorithms with artisan human review. Never a subscription.',
    reportNotice: 'One-time purchase · Lifetime dossier · Strict privacy confidentiality',
    reportFeature1: 'Complete 60-year Da Yun and annual flow progression breakdown',
    reportFeature2: 'Deep strategic analysis of career, wealth treasury, and partnerships',
    reportFeature3: 'Customized Five Elements interior and personal color harmony guide',
    btnBookReport: 'Explore Sample Dossier',
    footerRights: 'ZHAOWU · All Rights Reserved',
    footerOriginal: 'Original by STONE · Celestial Harmony'
  }
};

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

export const I18nContext = createContext<I18nContextType>({
  language: 'zh-TW',
  setLanguage: () => {},
  t: DICTIONARY['zh-TW']
});

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default strictly to zh-TW (Traditional Chinese)
  const [language, setLanguageState] = useState<SupportedLanguage>('zh-TW');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zhaowu_lang') as SupportedLanguage;
      if (saved && (saved === 'zh-TW' || saved === 'zh-CN' || saved === 'en')) {
        setLanguageState(saved);
      } else {
        localStorage.setItem('zhaowu_lang', 'zh-TW');
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('zhaowu_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: DICTIONARY[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
