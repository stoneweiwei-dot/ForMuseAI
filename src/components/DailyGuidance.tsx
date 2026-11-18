import { useEffect, useState } from 'react';
import { useI18n } from '../utils/i18n';
import { getSydneyCelestialInfo } from '../utils/bazi';
import { DailyCelestialInfo } from '../types';
import { Compass, CheckCircle2, XCircle, Palette } from 'lucide-react';

export default function DailyGuidance() {
  const { t } = useI18n();
  const [daily, setDaily] = useState<DailyCelestialInfo>(() => getSydneyCelestialInfo());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaily(getSydneyCelestialInfo());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="daily-guidance" className="py-12 lg:py-16 bg-[#F6F1E7] border-b border-[#E5DDCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#70847C] font-semibold mb-1">
            CELESTIAL CHRONOMETER · SYDNEY
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-song font-semibold text-[#142A24]">
            {t.dailyTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E625A] font-song">
            {t.dailySubtitle}
          </p>
        </div>

        {/* Content Split: Left Astrolabe Art & Right Daily Guidance Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left: Song Dynasty Astrolabe Painting */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative border border-[#DFD5C0] p-2 bg-[#FBF9F4] rounded-xl shadow-xs max-w-sm w-full">
              <div className="aspect-square rounded-lg overflow-hidden bg-[#EFE8D8]">
                <img
                  src="/src/assets/images/zhaowu_astrolabe_1794146276076.jpg"
                  alt="宋代渾天儀與二十四節氣圖 · 昭梧原創"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:rotate-3"
                />
              </div>
              <div className="pt-3 px-2 text-center">
                <div className="text-xs font-song font-semibold text-[#1C3831]">
                  《宋代渾天星度儀象圖》
                </div>
                <div className="text-[11px] text-[#697B74] font-song mt-0.5">
                  二十四節氣 · 紫微太微天市三垣 · STONE 原創
                </div>
              </div>
            </div>
          </div>

          {/* Right: Daily Celestial Readout */}
          <div className="lg:col-span-7 space-y-5">
            {/* Real-time Stems/Branches Strip */}
            <div className="bg-[#FFFFFF] border border-[#E0D7C4] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#A3372E]" />
                  <span className="text-xs font-semibold text-[#2B433B]">澳洲雪梨 (Sydney) 即時天時</span>
                </div>
                <span className="text-xs font-mono text-[#6A7D76]">{daily.sydneyTime}</span>
              </div>

              {/* Four Current Pillars in Sydney */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-md p-2.5">
                  <div className="text-[11px] text-[#71857D]">歲次</div>
                  <div className="text-base font-song font-bold text-[#142A24] mt-0.5">{daily.stemBranchYear}</div>
                </div>
                <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-md p-2.5">
                  <div className="text-[11px] text-[#71857D]">月建</div>
                  <div className="text-base font-song font-bold text-[#142A24] mt-0.5">{daily.stemBranchMonth}</div>
                </div>
                <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-md p-2.5">
                  <div className="text-[11px] text-[#71857D]">日辰</div>
                  <div className="text-base font-song font-bold text-[#A3372E] mt-0.5">{daily.stemBranchDay}</div>
                </div>
                <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-md p-2.5">
                  <div className="text-[11px] text-[#71857D]">時辰</div>
                  <div className="text-base font-song font-bold text-[#142A24] mt-0.5">{daily.stemBranchHour}</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#5E726A] flex items-center justify-between font-song">
                <span>當前氣候：{daily.solarTerm}</span>
                <span>五行主令：{daily.elementDay}</span>
              </div>
            </div>

            {/* Auspicious & Inauspicious Guide (Clean Unboxed Zero-Pill) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Auspicious */}
              <div className="bg-[#FFFFFF] border border-[#E0D7C4] rounded-xl p-4 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#235848] mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.auspiciousLabel}</span>
                </div>
                <div className="text-xs text-[#3C5249] space-y-1 font-song">
                  {daily.auspicious.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#235848]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inauspicious */}
              <div className="bg-[#FFFFFF] border border-[#E0D7C4] rounded-xl p-4 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A3372E] mb-2.5">
                  <XCircle className="w-4 h-4" />
                  <span>{t.inauspiciousLabel}</span>
                </div>
                <div className="text-xs text-[#4F3E3D] space-y-1 font-song">
                  {daily.inauspicious.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#A3372E]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Color Harmony Guidance */}
            <div className="bg-[#FAF7F0] border border-[#E0D7C4] rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg border border-black/10 shrink-0 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: daily.luckyColor.hex }}
                >
                  <Palette className="w-5 h-5 text-white/90" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C3831]">
                    今日天時應色：{daily.luckyColor.name}
                  </div>
                  <div className="text-[11px] text-[#556961] mt-0.5">
                    {daily.luckyColor.advice}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
