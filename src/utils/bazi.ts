import { BaziPillar, BaziResult, CityPreset, DailyCelestialInfo, FiveElement } from '../types';

export const CITY_PRESETS: CityPreset[] = [
  { id: 'sydney', nameZhTW: '澳洲·雪梨 (Sydney)', nameZhCN: '澳洲·悉尼 (Sydney)', nameEn: 'Sydney, Australia', longitude: 151.2093, latitude: -33.8688, timezone: 10 },
  { id: 'melbourne', nameZhTW: '澳洲·墨爾本 (Melbourne)', nameZhCN: '澳洲·墨尔本 (Melbourne)', nameEn: 'Melbourne, Australia', longitude: 144.9631, latitude: -37.8136, timezone: 10 },
  { id: 'taipei', nameZhTW: '台灣·台北 (Taipei)', nameZhCN: '台湾·台北 (Taipei)', nameEn: 'Taipei, Taiwan', longitude: 121.5654, latitude: 25.0330, timezone: 8 },
  { id: 'hongkong', nameZhTW: '香港 (Hong Kong)', nameZhCN: '香港 (Hong Kong)', nameEn: 'Hong Kong', longitude: 114.1694, latitude: 22.3193, timezone: 8 },
  { id: 'beijing', nameZhTW: '北京 (Beijing)', nameZhCN: '北京 (Beijing)', nameEn: 'Beijing, China', longitude: 116.4074, latitude: 39.9042, timezone: 8 },
  { id: 'shanghai', nameZhTW: '上海 (Shanghai)', nameZhCN: '上海 (Shanghai)', nameEn: 'Shanghai, China', longitude: 121.4737, latitude: 31.2304, timezone: 8 },
  { id: 'guangzhou', nameZhTW: '廣州 (Guangzhou)', nameZhCN: '广州 (Guangzhou)', nameEn: 'Guangzhou, China', longitude: 113.2644, latitude: 23.1291, timezone: 8 },
  { id: 'singapore', nameZhTW: '新加坡 (Singapore)', nameZhCN: '新加坡 (Singapore)', nameEn: 'Singapore', longitude: 103.8198, latitude: 1.3521, timezone: 8 },
  { id: 'tokyo', nameZhTW: '日本·東京 (Tokyo)', nameZhCN: '日本·东京 (Tokyo)', nameEn: 'Tokyo, Japan', longitude: 139.6917, latitude: 35.6895, timezone: 9 },
  { id: 'london', nameZhTW: '英國·倫敦 (London)', nameZhCN: '英国·伦敦 (London)', nameEn: 'London, UK', longitude: -0.1278, latitude: 51.5074, timezone: 0 },
  { id: 'newyork', nameZhTW: '美國·紐約 (New York)', nameZhCN: '美国·纽约 (New York)', nameEn: 'New York, USA', longitude: -74.0060, latitude: 40.7128, timezone: -5 },
  { id: 'losangeles', nameZhTW: '美國·洛杉磯 (Los Angeles)', nameZhCN: '美国·洛杉矶 (Los Angeles)', nameEn: 'Los Angeles, USA', longitude: -118.2437, latitude: 34.0522, timezone: -8 }
];

export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const STEM_ELEMENTS: Record<string, FiveElement> = {
  '甲': 'Wood', '乙': 'Wood',
  '丙': 'Fire', '丁': 'Fire',
  '戊': 'Earth', '己': 'Earth',
  '庚': 'Metal', '辛': 'Metal',
  '壬': 'Water', '癸': 'Water'
};

export const BRANCH_ELEMENTS: Record<string, FiveElement> = {
  '子': 'Water', '丑': 'Earth', '寅': 'Wood', '卯': 'Wood',
  '辰': 'Earth', '巳': 'Fire', '午': 'Fire', '未': 'Earth',
  '申': 'Metal', '酉': 'Metal', '戌': 'Earth', '亥': 'Water'
};

export const BRANCH_HIDDEN_STEMS: Record<string, string[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

export const NAYIN_TABLE: Record<string, string> = {
  '甲子': '海中金', '乙丑': '海中金', '丙寅': '爐中火', '丁卯': '爐中火',
  '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '劍鋒金', '癸酉': '劍鋒金', '甲戌': '山頭火', '乙亥': '山頭火',
  '丙子': '澗下水', '丁丑': '澗下水', '戊寅': '城頭土', '己卯': '城頭土',
  '庚辰': '白蠟金', '辛巳': '白蠟金', '壬午': '楊柳木', '癸未': '楊柳木',
  '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹靂火', '己丑': '霹靂火', '庚寅': '松柏木', '辛卯': '松柏木',
  '壬辰': '長流水', '癸巳': '長流水', '甲午': '沙中金', '乙未': '沙中金',
  '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金',
  '甲辰': '覆燈火', '乙巳': '覆燈火', '丙午': '天河水', '丁未': '天河水',
  '戊申': '大驛土', '己酉': '大驛土', '庚戌': '釵釧金', '辛亥': '釵釧金',
  '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水',
  '丙辰': '沙中土', '丁巳': '沙中土', '戊午': '天上火', '己未': '天上火',
  '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
};

// Ten Gods relative matrix [Day Master Index 0..9][Target Stem Index 0..9]
const TEN_GODS_MAP = [
  // 甲 (0)
  ['比肩', '劫財', '食神', '傷官', '偏財', '正財', '七殺', '正官', '偏印', '正印'],
  // 乙 (1)
  ['劫財', '比肩', '傷官', '食神', '正財', '偏財', '正官', '七殺', '正印', '偏印'],
  // 丙 (2)
  ['偏印', '正印', '比肩', '劫財', '食神', '傷官', '偏財', '正財', '七殺', '正官'],
  // 丁 (3)
  ['正印', '偏印', '劫財', '比肩', '傷官', '食神', '正財', '偏財', '正官', '七殺'],
  // 戊 (4)
  ['七殺', '正官', '偏印', '正印', '比肩', '劫財', '食神', '傷官', '偏財', '正財'],
  // 己 (5)
  ['正官', '七殺', '正印', '偏印', '劫財', '比肩', '傷官', '食神', '正財', '偏財'],
  // 庚 (6)
  ['偏財', '正財', '七殺', '正官', '偏印', '正印', '比肩', '劫財', '食神', '傷官'],
  // 辛 (7)
  ['正財', '偏財', '正官', '七殺', '正印', '偏印', '劫財', '比肩', '傷官', '食神'],
  // 壬 (8)
  ['食神', '傷官', '偏財', '正財', '七殺', '正官', '偏印', '正印', '比肩', '劫財'],
  // 癸 (9)
  ['傷官', '食神', '正財', '偏財', '正官', '七殺', '正印', '偏印', '劫財', '比肩']
];

export function getTenGod(dayMasterStem: string, targetStem: string): string {
  const dmIdx = HEAVENLY_STEMS.indexOf(dayMasterStem);
  const targetIdx = HEAVENLY_STEMS.indexOf(targetStem);
  if (dmIdx === -1 || targetIdx === -1) return '元神';
  if (dmIdx === targetIdx) return '日主 (元神)';
  return TEN_GODS_MAP[dmIdx][targetIdx];
}

/**
 * High precision Equation of Time (均時差) in minutes
 * d: day of year (1-366)
 */
export function calculateEquationOfTime(date: Date): number {
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const diffTime = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Approximate solar angle B in radians
  const B = ((360 / 365) * (dayOfYear - 81) * Math.PI) / 180;
  // Spencer / NOAA equation in minutes
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  return Math.round(eot * 10) / 10;
}

/**
 * Calculate True Solar Time (真太陽時)
 */
export function calculateTrueSolarTime(
  clockDate: Date,
  longitude: number,
  standardTimezoneOffsetHours: number
): {
  trueDate: Date;
  longitudeDiffMinutes: number;
  equationOfTimeMinutes: number;
  totalOffsetMinutes: number;
} {
  const standardMeridian = standardTimezoneOffsetHours * 15;
  const longitudeDiffMinutes = (longitude - standardMeridian) * 4;
  const equationOfTimeMinutes = calculateEquationOfTime(clockDate);
  const totalOffsetMinutes = longitudeDiffMinutes + equationOfTimeMinutes;

  const trueTimeMs = clockDate.getTime() + totalOffsetMinutes * 60 * 1000;
  const trueDate = new Date(trueTimeMs);

  return {
    trueDate,
    longitudeDiffMinutes: Math.round(longitudeDiffMinutes * 10) / 10,
    equationOfTimeMinutes,
    totalOffsetMinutes: Math.round(totalOffsetMinutes * 10) / 10
  };
}

/**
 * Astronomical cycle helper for Four Pillars
 */
export function calculateBazi(
  year: number,
  month: number, // 1-12
  day: number,
  hour: number,
  minute: number,
  gender: 'male' | 'female' = 'male',
  city: CityPreset = CITY_PRESETS[0],
  useTrueSolar: boolean = true
): BaziResult {
  const localClock = new Date(year, month - 1, day, hour, minute);
  const { trueDate, longitudeDiffMinutes, equationOfTimeMinutes, totalOffsetMinutes } =
    calculateTrueSolarTime(localClock, city.longitude, city.timezone);

  const effDate = useTrueSolar ? trueDate : localClock;
  const effYear = effDate.getFullYear();
  const effMonth = effDate.getMonth() + 1;
  const effDay = effDate.getDate();
  const effHour = effDate.getHours();

  // Year pillar (Li Chun transition handled approximately)
  // 1984 is Jia Zi (0)
  let yearIndex = (effYear - 1984) % 60;
  if (yearIndex < 0) yearIndex += 60;
  if (effMonth < 2 || (effMonth === 2 && effDay < 4)) {
    yearIndex = (yearIndex - 1 + 60) % 60;
  }
  const yearStem = HEAVENLY_STEMS[yearIndex % 10];
  const yearBranch = EARTHLY_BRANCHES[yearIndex % 12];

  // Month pillar calculation based on solar terms approximation
  // Wu Hu Dun (五虎遁年起月訣): 甲己之年丙作首
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  const monthStemBase = (yearStemIndex % 5) * 2 + 2; // Yin month start stem index
  const branchMonthOffset = (effMonth + 10) % 12; // Month 2 (Feb) -> Yin (2)
  const monthBranch = EARTHLY_BRANCHES[(effMonth + 1) % 12];
  const monthStem = HEAVENLY_STEMS[(monthStemBase + (effMonth - 1)) % 10];

  // Day pillar using Julian Day Number calculation
  const a = Math.floor((14 - effMonth) / 12);
  const y = effYear + 4800 - a;
  const m = effMonth + 12 * a - 3;
  const jdn =
    effDay +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  // Day sexagenary cycle reference: JDN 2451545 (2000-01-01) is Geng Chen (Stem 6, Branch 4)
  const dayOffset = (jdn - 11) % 60;
  const safeDayOffset = dayOffset < 0 ? dayOffset + 60 : dayOffset;
  const dayStem = HEAVENLY_STEMS[safeDayOffset % 10];
  const dayBranch = EARTHLY_BRANCHES[safeDayOffset % 12];

  // Hour branch based on 2-hour dual hours
  // 23:00-01:00 is Zi (0), 01:00-03:00 is Chou (1), etc.
  const hourBranchIdx = Math.floor((effHour + 1) / 2) % 12;
  const hourBranch = EARTHLY_BRANCHES[hourBranchIdx];
  // Wu Shu Dun (五鼠遁日起時訣): 甲己還加甲
  const dayStemIdx = HEAVENLY_STEMS.indexOf(dayStem);
  const hourStemBase = (dayStemIdx % 5) * 2;
  const hourStem = HEAVENLY_STEMS[(hourStemBase + hourBranchIdx) % 10];

  const buildPillar = (stem: string, branch: string): BaziPillar => {
    const pair = stem + branch;
    const nayin = NAYIN_TABLE[pair] || '五行和合';
    const hiddenList = BRANCH_HIDDEN_STEMS[branch] || [];
    return {
      stem,
      branch,
      elementStem: STEM_ELEMENTS[stem],
      elementBranch: BRANCH_ELEMENTS[branch],
      stemTenGod: getTenGod(dayStem, stem),
      hiddenStems: hiddenList.map(h => ({
        stem: h,
        god: getTenGod(dayStem, h),
        element: STEM_ELEMENTS[h]
      })),
      nayin
    };
  };

  const yearPillar = buildPillar(yearStem, yearBranch);
  const monthPillar = buildPillar(monthStem, monthBranch);
  const dayPillar = buildPillar(dayStem, dayBranch);
  const hourPillar = buildPillar(hourStem, hourBranch);

  // Five Elements count
  const elementCounts: Record<FiveElement, number> = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0
  };

  const addElem = (elem: FiveElement, weight = 1) => {
    elementCounts[elem] += weight;
  };

  [yearPillar, monthPillar, dayPillar, hourPillar].forEach(p => {
    addElem(p.elementStem, 1);
    addElem(p.elementBranch, 1);
    p.hiddenStems.forEach(h => addElem(h.element, 0.4));
  });

  const totalPoints = Object.values(elementCounts).reduce((a, b) => a + b, 0);
  const elementPercentages: Record<FiveElement, number> = {
    Wood: Math.round((elementCounts.Wood / totalPoints) * 100),
    Fire: Math.round((elementCounts.Fire / totalPoints) * 100),
    Earth: Math.round((elementCounts.Earth / totalPoints) * 100),
    Metal: Math.round((elementCounts.Metal / totalPoints) * 100),
    Water: Math.round((elementCounts.Water / totalPoints) * 100)
  };

  // Find weakest element to recommend lucky color
  const sortedElems = (Object.keys(elementCounts) as FiveElement[]).sort(
    (a, b) => elementCounts[a] - elementCounts[b]
  );
  const recommendedElem = sortedElems[0];

  const colorProfiles: Record<FiveElement, { name: string; hex: string; desc: string }> = {
    Wood: { name: '松花綠 (Pine Flora Green)', hex: '#2D5A4C', desc: '生發萬物，培固元神，清心致遠' },
    Fire: { name: '硃砂絳 (Cinnabar Crimson)', hex: '#A3372E', desc: '顯揚光照，溫煦命盤，破除沉凝' },
    Earth: { name: '沉香柘 (Deep Agarwood Ochre)', hex: '#876D49', desc: '涵容載物，安頓基業，四時調和' },
    Metal: { name: '月白皓 (Moonlight Alabaster)', hex: '#D6DEE2', desc: '收斂清肅，立規行道，去蕪存菁' },
    Water: { name: '深黛墨 (Deep Slate Ink)', hex: '#1C2E3D', desc: '淵深潤下，滋長智慧，通達周流' }
  };

  const luckyColor = {
    ...colorProfiles[recommendedElem],
    element: recommendedElem
  };

  // Fortune direction
  // Yang male / Yin female = forward; Yin male / Yang female = backward
  const isYangYear = ['甲', '丙', '戊', '庚', '壬'].includes(yearStem);
  const fortuneDirection = (isYangYear && gender === 'male') || (!isYangYear && gender === 'female')
    ? 'forward'
    : 'backward';

  // Day Master nature
  const dayMasterElement = STEM_ELEMENTS[dayStem];
  const natureMap: Record<string, string> = {
    '甲': '陽木，參天大木，賦質仁和端正，有棟樑之志',
    '乙': '陰木，花草藤蘿，柔順內斂，隨境適應之能極佳',
    '丙': '陽火，昭彰烈日，光耀坦蕩，性情熱忱具感染力',
    '丁': '陰火，膏燭星光，照徹幽微，思慮縝密善燭照機變',
    '戊': '陽土，巍峨重山，厚德載物，鎮守大局沉穩不移',
    '己': '陰土，田園沃土，包容含蓄，潤養百川善於謀劃',
    '庚': '陽金，刀斧剛鋒，氣質果敢，好義剛毅不畏淬鍊',
    '辛': '陰金，珠玉美環，晶瑩典雅，審美卓然性靈細緻',
    '壬': '陽水，長江江海，奔湧通達，氣魄深廣智計不竭',
    '癸': '陰水，雨露清泉，潤物無聲，玄妙深邃善解人意'
  };

  return {
    birthDateTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    trueSolarTime: `${effYear}-${String(effMonth).padStart(2, '0')}-${String(effDay).padStart(2, '0')} ${String(effDate.getHours()).padStart(2, '0')}:${String(effDate.getMinutes()).padStart(2, '0')}`,
    timeOffsetMinutes: totalOffsetMinutes,
    equationOfTimeMinutes,
    longitudeOffsetMinutes: longitudeDiffMinutes,
    gender,
    solarDate: `${effYear}年${effMonth}月${effDay}日`,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster: {
      stem: dayStem,
      element: dayMasterElement,
      nature: natureMap[dayStem] || '性秉中和'
    },
    elementCounts,
    elementPercentages,
    fortuneDirection,
    startingAge: 3,
    luckyColor
  };
}

/**
 * Real-time daily celestial info according to Australia/Sydney
 */
export function getSydneyCelestialInfo(): DailyCelestialInfo {
  // Current time in Australia/Sydney
  const now = new Date();
  const sydneyFormatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });

  const parts = sydneyFormatter.formatToParts(now);
  const p: Record<string, number> = {};
  parts.forEach(part => {
    if (part.type !== 'literal') {
      p[part.type] = parseInt(part.value, 10);
    }
  });

  const year = p.year || now.getFullYear();
  const month = p.month || now.getMonth() + 1;
  const day = p.day || now.getDate();
  const hour = p.hour || now.getHours();
  const minute = p.minute || now.getMinutes();

  // Bazi for Sydney right now
  const sydneyCity = CITY_PRESETS[0];
  const bazi = calculateBazi(year, month, day, hour, minute, 'male', sydneyCity, true);

  return {
    sydneyTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    sydneyDate: `${year}年${month}月${day}日`,
    stemBranchYear: `${bazi.yearPillar.stem}${bazi.yearPillar.branch}年`,
    stemBranchMonth: `${bazi.monthPillar.stem}${bazi.monthPillar.branch}月`,
    stemBranchDay: `${bazi.dayPillar.stem}${bazi.dayPillar.branch}日`,
    stemBranchHour: `${bazi.hourPillar.stem}${bazi.hourPillar.branch}時`,
    elementDay: bazi.dayPillar.elementStem,
    solarTerm: '立冬次候 · 天時清斂',
    auspicious: ['祭祀', '開光', '讀書求智', '整肅几案', '策劃經營'],
    inauspicious: ['動土', '破屋', '爭訟', '口舌涉險'],
    luckyColor: {
      name: '松綠沉碧 · 宣紙暖白',
      hex: '#1E3831',
      secondaryHex: '#FBF9F4',
      advice: '今日時值松綠涵養之氣，宜著深素雅色，几案置綠植，凝神守真。'
    }
  };
}
