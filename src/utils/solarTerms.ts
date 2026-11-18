import { SupportedLanguage } from '../types';

export interface SolarTermDefinition {
  longitude: number; // 0, 15, 30, ... 345
  zhTW: string;
  zhCN: string;
  en: string;
  poeticTW: string;
  poeticCN: string;
  poeticEN: string;
}

export const SOLAR_TERMS: SolarTermDefinition[] = [
  { longitude: 0, zhTW: '春分', zhCN: '春分', en: 'Vernal Equinox', poeticTW: '晝夜均分 · 陰陽相半', poeticCN: '昼夜均分 · 阴阳相半', poeticEN: 'Equal day and night' },
  { longitude: 15, zhTW: '清明', zhCN: '清明', en: 'Pure Brightness', poeticTW: '氣清景明 · 萬物皆顯', poeticCN: '气清景明 · 万物皆显', poeticEN: 'Clear air and bright sky' },
  { longitude: 30, zhTW: '穀雨', zhCN: '谷雨', en: 'Grain Rain', poeticTW: '雨生百穀 · 潤物清和', poeticCN: '雨生百谷 · 润物清和', poeticEN: 'Spring rain nourishing grain' },
  { longitude: 45, zhTW: '立夏', zhCN: '立夏', en: 'Start of Summer', poeticTW: '長風化育 · 萬物並秀', poeticCN: '长风化育 · 万物并秀', poeticEN: 'Growth enters full bloom' },
  { longitude: 60, zhTW: '小滿', zhCN: '小满', en: 'Grain Buds', poeticTW: '物致於此 · 小得盈滿', poeticCN: '物致于此 · 小得盈满', poeticEN: 'Grains begin to plump' },
  { longitude: 75, zhTW: '芒種', zhCN: '芒种', en: 'Grain in Ear', poeticTW: '有芒之稼 · 時至收種', poeticCN: '有芒之稼 · 时至收种', poeticEN: 'Time of ripened awns' },
  { longitude: 90, zhTW: '夏至', zhCN: '夏至', en: 'Summer Solstice', poeticTW: '日北至極 · 一陰初生', poeticCN: '日北至极 · 一阴初生', poeticEN: 'Solstice turning point' },
  { longitude: 105, zhTW: '小暑', zhCN: '小暑', en: 'Minor Heat', poeticTW: '溫風漸至 · 伏日將臨', poeticCN: '温风渐至 · 伏日将临', poeticEN: 'Warm winds rise gently' },
  { longitude: 120, zhTW: '大暑', zhCN: '大暑', en: 'Major Heat', poeticTW: '盛極涵養 · 靜氣自涼', poeticCN: '盛极涵养 · 静气自凉', poeticEN: 'Peak brilliance and stillness' },
  { longitude: 135, zhTW: '立秋', zhCN: '立秋', en: 'Start of Autumn', poeticTW: '涼風至庭 · 白露初凝', poeticCN: '凉风至庭 · 白露初凝', poeticEN: 'First crisp autumn breeze' },
  { longitude: 150, zhTW: '處暑', zhCN: '处暑', en: 'End of Heat', poeticTW: '暑氣止息 · 天高氣爽', poeticCN: '暑气止息 · 天高气爽', poeticEN: 'Heat recedes into clarity' },
  { longitude: 165, zhTW: '白露', zhCN: '白露', en: 'White Dew', poeticTW: '陰氣漸重 · 露凝而白', poeticCN: '阴气渐重 · 露凝而白', poeticEN: 'Morning dew turns silver' },
  { longitude: 180, zhTW: '秋分', zhCN: '秋分', en: 'Autumn Equinox', poeticTW: '日夜再均 · 清肅和平', poeticCN: '日夜再均 · 清肃和平', poeticEN: 'Balance of autumn light' },
  { longitude: 195, zhTW: '寒露', zhCN: '寒露', en: 'Cold Dew', poeticTW: '露寒將凝 · 草木黃落', poeticCN: '露寒将凝 · 草木黄落', poeticEN: 'Dew cools toward frost' },
  { longitude: 210, zhTW: '霜降', zhCN: '霜降', en: 'Frost’s Descent', poeticTW: '氣肅而凝 · 露結為霜', poeticCN: '气肃而凝 · 露结为霜', poeticEN: 'Crisp air and early frost' },
  { longitude: 225, zhTW: '立冬', zhCN: '立冬', en: 'Start of Winter', poeticTW: '水始冰凝 · 萬物收藏', poeticCN: '水始冰凝 · 万物收藏', poeticEN: 'Energy turns inward' },
  { longitude: 240, zhTW: '小雪', zhCN: '小雪', en: 'Minor Snow', poeticTW: '虹藏不見 · 天地閉藏', poeticCN: '虹藏不见 · 天地闭藏', poeticEN: 'Quiet sky and deep stillness' },
  { longitude: 255, zhTW: '大雪', zhCN: '大雪', en: 'Major Snow', poeticTW: '仲冬極靜 · 蓄養元陽', poeticCN: '仲冬极静 · 蓄养元阳', poeticEN: 'Deep stillness nourishes renewal' },
  { longitude: 270, zhTW: '冬至', zhCN: '冬至', en: 'Winter Solstice', poeticTW: '陰極之至 · 一陽來復', poeticCN: '阴极之至 · 一阳来复', poeticEN: 'Return of the first light' },
  { longitude: 285, zhTW: '小寒', zhCN: '小寒', en: 'Minor Cold', poeticTW: '歲寒雖深 · 梅意漸動', poeticCN: '岁寒虽深 · 梅意渐动', poeticEN: 'Quiet endurance before spring' },
  { longitude: 300, zhTW: '大寒', zhCN: '大寒', en: 'Major Cold', poeticTW: '歲序將終 · 靜候東風', poeticCN: '岁序将终 · 静候东风', poeticEN: 'Final stillness of the cycle' },
  { longitude: 315, zhTW: '立春', zhCN: '立春', en: 'Start of Spring', poeticTW: '東風解凍 · 歲首更始', poeticCN: '东风解冻 · 岁首更始', poeticEN: 'Beginning of the solar year' },
  { longitude: 330, zhTW: '雨水', zhCN: '雨水', en: 'Rain Water', poeticTW: '東風散雪 · 潤澤萌動', poeticCN: '东风散雪 · 润泽萌动', poeticEN: 'Gentle rains awaken earth' },
  { longitude: 345, zhTW: '驚蟄', zhCN: '惊蛰', en: 'Awakening of Insects', poeticTW: '春雷初動 · 生機破土', poeticCN: '春雷初动 · 生机破土', poeticEN: 'Vitality stirs beneath soil' }
];

function normalizeDeg(deg: number): number {
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}

/**
 * Apparent Solar Ecliptic Longitude (degrees [0, 360)) via Jean Meeus algorithm
 */
export function getApparentSolarLongitude(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;

  const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T) * (Math.PI / 180);

  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);

  const trueLon = L0 + C;
  const omega = (125.04 - 1934.136 * T) * (Math.PI / 180);
  return normalizeDeg(trueLon - 0.00569 - 0.00478 * Math.sin(omega));
}

function signedAngleDiff(currentDeg: number, targetDeg: number): number {
  let diff = normalizeDeg(currentDeg) - normalizeDeg(targetDeg);
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}

function findSolarLongitudeInstant(targetDeg: number, startMs: number, endMs: number): Date {
  let lo = startMs;
  let hi = endMs;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const lon = getApparentSolarLongitude(new Date(mid));
    if (signedAngleDiff(lon, targetDeg) < 0) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return new Date((lo + hi) / 2);
}

export interface SolarTermClockSnapshot {
  solarLongitude: number;
  currentTerm: SolarTermDefinition;
  nextTerm: SolarTermDefinition;
  currentTermAt: Date;
  nextTermAt: Date;
  nextTermSydneyFormatted: string;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  progressPercent: number;
}

export function getSolarTermClockSnapshot(now: Date = new Date()): SolarTermClockSnapshot {
  const lon = getApparentSolarLongitude(now);
  const currentIdx = Math.floor(lon / 15) % 24;
  const nextIdx = (currentIdx + 1) % 24;

  const currentTerm = SOLAR_TERMS[currentIdx];
  const nextTerm = SOLAR_TERMS[nextIdx];

  const nowMs = now.getTime();
  const twentyDaysMs = 20 * 24 * 60 * 60 * 1000;

  const currentTermAt = findSolarLongitudeInstant(currentTerm.longitude, nowMs - twentyDaysMs, nowMs);
  const nextTermAt = findSolarLongitudeInstant(nextTerm.longitude, nowMs, nowMs + twentyDaysMs);

  const remainingMs = Math.max(0, nextTermAt.getTime() - nowMs);
  const totalSpanMs = Math.max(1, nextTermAt.getTime() - currentTermAt.getTime());
  const elapsedMs = Math.max(0, nowMs - currentTermAt.getTime());

  const totalMinutes = Math.floor(remainingMs / 60000);
  const daysRemaining = Math.floor(totalMinutes / (60 * 24));
  const hoursRemaining = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutesRemaining = totalMinutes % 60;

  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedMs / totalSpanMs) * 1000) / 10));

  const nextTermSydneyFormatted = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Australia/Sydney',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(nextTermAt);

  return {
    solarLongitude: Math.round(lon * 10) / 10,
    currentTerm,
    nextTerm,
    currentTermAt,
    nextTermAt,
    nextTermSydneyFormatted,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    progressPercent
  };
}

export function getSolarTermName(term: SolarTermDefinition, lang: SupportedLanguage): string {
  if (lang === 'zh-CN') return term.zhCN;
  if (lang === 'en') return term.en;
  return term.zhTW;
}

export function getSolarTermPoetic(term: SolarTermDefinition, lang: SupportedLanguage): string {
  if (lang === 'zh-CN') return term.poeticCN;
  if (lang === 'en') return term.poeticEN;
  return term.poeticTW;
}
