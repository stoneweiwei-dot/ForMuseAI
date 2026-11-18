import { useEffect, useState } from 'react';
import { useI18n } from '../utils/i18n';
import {
  getSolarTermClockSnapshot,
  getSolarTermName,
  getSolarTermPoetic,
  SolarTermClockSnapshot
} from '../utils/solarTerms';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';

export default function SolarTermClock() {
  const { language } = useI18n();
  const [snapshot, setSnapshot] = useState<SolarTermClockSnapshot>(() => getSolarTermClockSnapshot());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setSnapshot(getSolarTermClockSnapshot());
    const timer = window.setInterval(() => {
      setSnapshot(getSolarTermClockSnapshot());
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const currentName = getSolarTermName(snapshot.currentTerm, language);
  const nextName = getSolarTermName(snapshot.nextTerm, language);
  const currentPoetic = getSolarTermPoetic(snapshot.currentTerm, language);

  const labelPrefix =
    language === 'en'
      ? 'Solar Term Clock'
      : language === 'zh-CN'
      ? '节气时钟'
      : '節氣時鐘';

  const nextLabel =
    language === 'en'
      ? `Next: ${nextName} in`
      : language === 'zh-CN'
      ? `距「${nextName}」还有`
      : `距「${nextName}」還有`;

  const dayUnit = language === 'en' ? 'd' : '天';
  const hourUnit = language === 'en' ? 'h' : '小時';
  const minUnit = language === 'en' ? 'm' : '分';

  return (
    <aside
      aria-label={labelPrefix}
      className="bg-[#F5EFE3] border-b border-[#E4DBC8] text-[#283F37]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Main Bar */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          {/* Left: Current Solar Term & Poetic Note */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1C3831]">
              <Clock className="w-3.5 h-3.5 text-[#A3372E]" aria-hidden="true" />
              <span>{labelPrefix}</span>
            </span>
            <span aria-hidden="true" className="text-[#B6AA92]">·</span>
            <span className="font-song font-semibold text-[#142A24]">
              {language === 'en' ? `Now: ${currentName}` : `當令：${currentName}`}
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[#B6AA92]">·</span>
            <span className="hidden sm:inline font-song text-[#5D7068]">
              {currentPoetic}
            </span>
          </div>

          {/* Right: Countdown & Expand Toggle */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#4F635B]">{nextLabel}</span>
              <span className="font-mono tabular-nums font-bold text-[#1C3831]">
                {snapshot.daysRemaining}
              </span>
              <span className="text-[#4F635B]">{dayUnit}</span>
              <span className="font-mono tabular-nums font-bold text-[#1C3831]">
                {String(snapshot.hoursRemaining).padStart(2, '0')}
              </span>
              <span className="text-[#4F635B]">{hourUnit}</span>
              <span className="hidden xs:inline font-mono tabular-nums text-[#5D7068]">
                {String(snapshot.minutesRemaining).padStart(2, '0')}
                {minUnit}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(prev => !prev)}
              aria-expanded={expanded}
              aria-label={expanded ? '收合節氣詳情' : '展開節氣詳情'}
              className="min-h-[36px] px-2 py-1 rounded text-[11px] font-medium text-[#3D524A] hover:text-[#142A24] hover:bg-[#EAE1CF] transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <span className="font-mono tabular-nums text-[#74654F]">{snapshot.progressPercent}%</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Hairline Progress Bar */}
        <div className="h-[2px] w-full bg-[#E3DAC6] overflow-hidden">
          <div
            className="h-full bg-[#2D5A4C] transition-[width] duration-500"
            style={{ width: `${snapshot.progressPercent}%` }}
          />
        </div>

        {/* Optional Expanded Astronomical Detail */}
        {expanded && (
          <div className="py-2.5 text-[11px] sm:text-xs text-[#51655D] flex flex-wrap items-center justify-between gap-2 border-t border-[#EAE1CF] font-song">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>
                {language === 'en'
                  ? `Apparent Solar Longitude: ${snapshot.solarLongitude}°`
                  : `太陽視黃經：${snapshot.solarLongitude}°`}
              </span>
              <span aria-hidden="true" className="text-[#B6AA92]">·</span>
              <span>
                {language === 'en'
                  ? `Transition (Sydney): ${snapshot.nextTermSydneyFormatted}`
                  : `交節時刻（雪梨時間）：${snapshot.nextTermSydneyFormatted}`}
              </span>
            </div>
            <div className="text-[#6F7E77]">
              {language === 'en'
                ? 'Cycle progress across 15° ecliptic arc'
                : `本節氣 15° 黃經已行進 ${snapshot.progressPercent}%`}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
