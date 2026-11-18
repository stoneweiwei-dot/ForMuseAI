import { useEffect, useState } from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { useI18n } from '../utils/i18n';
import { getSydneyCelestialInfo } from '../utils/bazi';
import { DailyCelestialInfo } from '../types';
import { Compass, ArrowDown } from 'lucide-react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const { t } = useI18n();
  const [dailyInfo, setDailyInfo] = useState<DailyCelestialInfo | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setDailyInfo(getSydneyCelestialInfo());
    const interval = setInterval(() => {
      setDailyInfo(getSydneyCelestialInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const leftContainerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.11,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const fadeUpItemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const pillarsGridVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const pillarCardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const scrollFrameVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        delay: shouldReduceMotion ? 0 : 0.18,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const scrollArtworkVariants: Variants = {
    hidden: {
      scale: shouldReduceMotion ? 1 : 1.04,
      opacity: shouldReduceMotion ? 1 : 0.85,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        delay: shouldReduceMotion ? 0 : 0.22,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#FBF9F4] border-b border-[#E8E1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Essence & Editorial Narrative */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={leftContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Live Sydney Celestial Bar (Zero-pill text metadata) */}
            <motion.div
              variants={fadeUpItemVariants}
              className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#576A62]"
            >
              <span className="font-semibold text-[#1C3831]">{t.sydneyTimeTag}</span>
              <span aria-hidden="true">·</span>
              <span>Australia / Sydney</span>
              <span aria-hidden="true">·</span>
              <span>{dailyInfo?.sydneyDate || '2026年天時'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-[#1C3831] font-semibold">{dailyInfo?.sydneyTime || '12:00'}</span>
            </motion.div>

            {/* Main Headline with text-wrap balance */}
            <motion.div variants={fadeUpItemVariants} className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-song font-semibold text-[#142A24] tracking-tight leading-tight [text-wrap:balance]">
                讓天時有形，讓命理可讀
              </h1>
              <p className="text-base sm:text-lg text-[#3E524A] font-song leading-relaxed max-w-2xl">
                昭梧承續宋代理學天文與正統子平干支之學，融合現代地理經度與太陽均時差精密校正。破除市面模糊宿命套語，以清正、透明、理性之筆，助君洞察命局樞機與歲月起伏。
              </p>
            </motion.div>

            {/* Core Pillars Overview Strip */}
            <motion.div
              variants={pillarsGridVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2"
            >
              <motion.div
                variants={pillarCardVariants}
                className="bg-[#F4EFE6] border border-[#E2DAC8] rounded-md p-3.5"
              >
                <div className="text-xs text-[#5D7068]">{dailyInfo?.stemBranchYear || '丙午年'}</div>
                <div className="text-lg font-song font-semibold text-[#1C3831] mt-0.5">真太陽時校準</div>
                <div className="text-xs text-[#6B7D76] mt-1">經度誤差與均時差秒級補正</div>
              </motion.div>

              <motion.div
                variants={pillarCardVariants}
                className="bg-[#F4EFE6] border border-[#E2DAC8] rounded-md p-3.5"
              >
                <div className="text-xs text-[#5D7068]">{dailyInfo?.stemBranchDay || '流日干支'}</div>
                <div className="text-lg font-song font-semibold text-[#1C3831] mt-0.5">人生十篇章</div>
                <div className="text-xs text-[#6B7D76] mt-1">事業·財帛·姻緣·歲運全覽</div>
              </motion.div>

              <motion.div
                variants={pillarCardVariants}
                className="col-span-2 sm:col-span-1 bg-[#F4EFE6] border border-[#E2DAC8] rounded-md p-3.5"
              >
                <div className="text-xs text-[#5D7068]">宋式正統色譜</div>
                <div className="text-lg font-song font-semibold text-[#1C3831] mt-0.5">五行色氣調和</div>
                <div className="text-xs text-[#6B7D76] mt-1">松綠、宣白、硃砂日常應用</div>
              </motion.div>
            </motion.div>

            {/* Primary Action Button */}
            <motion.div
              variants={fadeUpItemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#bazi-calculator"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-md bg-[#1C3831] hover:bg-[#122822] text-[#FBF9F4] text-sm font-medium transition-colors shadow-xs whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4 mr-2" />
                <span>免費排盤 · 啟動真太陽時測算</span>
              </a>

              <a
                href="#daily-guidance"
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-md border border-[#D5CBB5] bg-[#FAF7F0] hover:bg-[#EFE9DC] text-[#24423A] text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <span>查看今日黃曆指引</span>
                <ArrowDown className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Song Dynasty Scroll Painting */}
          <motion.div
            className="lg:col-span-5"
            variants={scrollFrameVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative border border-[#DFD6C2] bg-[#F5F0E6] rounded-lg p-2 shadow-sm overflow-hidden">
              <div className="relative aspect-16/10 rounded overflow-hidden bg-[#ECE4D4]">
                <motion.img
                  variants={scrollArtworkVariants}
                  src="/src/assets/images/zhaowu_hero_scroll_1794146261895.jpg"
                  alt="宋代山水天象古卷 · 昭梧原創"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle scrim for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#142A24]/70 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
                  <div className="text-xs text-[#EAE2D2] font-song">宋式高古意境 · 渾天儀象</div>
                  <div className="text-sm font-song font-medium text-[#FBF9F4] flex items-center justify-between">
                    <span>讓天時有形 · 讓命理可讀</span>
                    <span className="text-xs text-[#DCD1BA] border border-[#DCD1BA]/40 px-1.5 py-0.5 rounded">STONE 原創</span>
                  </div>
                </div>
              </div>
              <div className="px-2 pt-2 pb-1 text-center">
                <span className="text-[11px] font-song text-[#72857D] italic">
                  《昭梧天時圖卷》· 宣紙沉香底色 · 融匯天象干支
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
