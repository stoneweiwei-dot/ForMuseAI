import { useEffect, useState } from 'react';
import { useI18n } from '../utils/i18n';
import { calculateBazi, CITY_PRESETS } from '../utils/bazi';
import { BaziResult, CityPreset, FiveElement } from '../types';
import { Calendar, Clock, MapPin, Compass, ImageDown } from 'lucide-react';
import BaziShareModal from './BaziShareModal';

const ELEMENT_COLORS: Record<FiveElement, { text: string; bg: string; border: string }> = {
  Wood: { text: 'text-[#235848]', bg: 'bg-[#EBF3EF]', border: 'border-[#BDD6CB]' },
  Fire: { text: 'text-[#A3372E]', bg: 'bg-[#F9ECEB]', border: 'border-[#ECC2BF]' },
  Earth: { text: 'text-[#826744]', bg: 'bg-[#F6EFE5]', border: 'border-[#DFCBB3]' },
  Metal: { text: 'text-[#475C66]', bg: 'bg-[#EEF3F6]', border: 'border-[#C8D6DF]' },
  Water: { text: 'text-[#1D4468]', bg: 'bg-[#E8F0F7]', border: 'border-[#B6D0E5]' }
};

const ELEMENT_NAMES_ZH: Record<FiveElement, string> = {
  Wood: '木 (Wood)',
  Fire: '火 (Fire)',
  Earth: '土 (Earth)',
  Metal: '金 (Metal)',
  Water: '水 (Water)'
};

interface BaziCalculatorProps {
  result: BaziResult;
  onResultChange: (nextResult: BaziResult) => void;
}

export default function BaziCalculator({ result, onResultChange }: BaziCalculatorProps) {
  const { t, language } = useI18n();

  // Initial demo inputs (approx. standard default)
  const [birthDate, setBirthDate] = useState('1990-06-15');
  const [birthHour, setBirthHour] = useState('14');
  const [birthMinute, setBirthMinute] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedCityId, setSelectedCityId] = useState('sydney');
  const [useTrueSolar, setUseTrueSolar] = useState(true);

  const [isCompassTurning, setIsCompassTurning] = useState(false);
  const [spinNonce, setSpinNonce] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (!isCompassTurning) return;
    const timer = window.setTimeout(() => setIsCompassTurning(false), 920);
    return () => window.clearTimeout(timer);
  }, [isCompassTurning, spinNonce]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const [yStr, mStr, dStr] = birthDate.split('-');
    const year = parseInt(yStr, 10);
    const month = parseInt(mStr, 10);
    const day = parseInt(dStr, 10);
    const hour = parseInt(birthHour, 10);
    const minute = parseInt(birthMinute, 10);
    const city = CITY_PRESETS.find(c => c.id === selectedCityId) || CITY_PRESETS[0];

    const calc = calculateBazi(year, month, day, hour, minute, gender, city, useTrueSolar);
    onResultChange(calc);
    setHasCalculated(true);
    setSpinNonce(n => n + 1);
    setIsCompassTurning(true);
  };

  const getCityName = (city: CityPreset) => {
    if (language === 'zh-CN') return city.nameZhCN;
    if (language === 'en') return city.nameEn;
    return city.nameZhTW;
  };

  const currentCity = CITY_PRESETS.find(c => c.id === selectedCityId) || CITY_PRESETS[0];

  return (
    <section id="bazi-calculator" className="py-12 lg:py-16 bg-[#FBF9F4] border-b border-[#E8E1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#70847C] font-semibold mb-1">
            PRECISION FOUR PILLARS COMPUTATION
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-song font-semibold text-[#142A24]">
            {t.baziTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E625A] font-song">
            {t.baziSubtitle}
          </p>
        </div>

        {/* Input Form & Options Card */}
        <div className="bg-[#FFFFFF] border border-[#E3DAC8] rounded-xl shadow-xs p-5 sm:p-7 max-w-4xl mx-auto mb-10">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Birth Date */}
              <div>
                <label className="block text-xs font-semibold text-[#304840] mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#5F756C]" />
                  <span>{t.inputBirthDate}</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  required
                  className="w-full h-11 px-3 text-sm bg-[#FAF8F2] border border-[#DCD2BF] rounded-md text-[#19322A] focus:outline-none focus:border-[#1C3831] focus:ring-1 focus:ring-[#1C3831]"
                />
              </div>

              {/* Birth Time */}
              <div>
                <label className="block text-xs font-semibold text-[#304840] mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5F756C]" />
                  <span>{t.inputBirthTime}</span>
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={birthHour}
                    onChange={e => setBirthHour(e.target.value)}
                    className="w-1/2 h-11 px-2.5 text-sm bg-[#FAF8F2] border border-[#DCD2BF] rounded-md text-[#19322A] focus:outline-none focus:border-[#1C3831]"
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <option key={i} value={String(i)}>
                        {String(i).padStart(2, '0')} 時
                      </option>
                    ))}
                  </select>
                  <select
                    value={birthMinute}
                    onChange={e => setBirthMinute(e.target.value)}
                    className="w-1/2 h-11 px-2.5 text-sm bg-[#FAF8F2] border border-[#DCD2BF] rounded-md text-[#19322A] focus:outline-none focus:border-[#1C3831]"
                  >
                    {Array.from({ length: 12 }).map((_, i) => {
                      const m = i * 5;
                      return (
                        <option key={m} value={String(m)}>
                          {String(m).padStart(2, '0')} 分
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-[#304840] mb-1.5">
                  {t.inputGender}
                </label>
                <div className="flex items-center h-11 bg-[#FAF8F2] border border-[#DCD2BF] rounded-md p-1">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`flex-1 h-full rounded text-xs font-medium transition-colors ${
                      gender === 'male'
                        ? 'bg-[#1C3831] text-[#FBF9F4] font-semibold'
                        : 'text-[#4A5D56] hover:text-[#1C3831]'
                    }`}
                  >
                    {t.genderMale}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`flex-1 h-full rounded text-xs font-medium transition-colors ${
                      gender === 'female'
                        ? 'bg-[#1C3831] text-[#FBF9F4] font-semibold'
                        : 'text-[#4A5D56] hover:text-[#1C3831]'
                    }`}
                  >
                    {t.genderFemale}
                  </button>
                </div>
              </div>

              {/* Birth City */}
              <div>
                <label className="block text-xs font-semibold text-[#304840] mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5F756C]" />
                  <span>{t.inputCity}</span>
                </label>
                <select
                  value={selectedCityId}
                  onChange={e => setSelectedCityId(e.target.value)}
                  className="w-full h-11 px-3 text-xs sm:text-sm bg-[#FAF8F2] border border-[#DCD2BF] rounded-md text-[#19322A] focus:outline-none focus:border-[#1C3831]"
                >
                  {CITY_PRESETS.map(city => (
                    <option key={city.id} value={city.id}>
                      {getCityName(city)}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* True Solar Time Toggle Notice */}
            <div className="bg-[#F8F5EC] border border-[#E4DCB] rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <input
                  id="trueSolarCheckbox"
                  type="checkbox"
                  checked={useTrueSolar}
                  onChange={e => setUseTrueSolar(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#1C3831] rounded border-[#C8BDAB] focus:ring-[#1C3831]"
                />
                <label htmlFor="trueSolarCheckbox" className="text-xs text-[#2A4139] cursor-pointer">
                  <span className="font-semibold block">{t.trueSolarToggle}</span>
                  <span className="text-[#5B6F67]">{t.trueSolarTip}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-md bg-[#1C3831] hover:bg-[#122822] text-[#FBF9F4] text-sm font-medium transition-colors shadow-xs shrink-0 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Compass
                  key={`btn-compass-${spinNonce}`}
                  className={`w-4 h-4 ${isCompassTurning ? 'animate-compass-turn' : ''}`}
                />
                <span>{t.btnCalculate}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Bazi Results Presentation (Four Pillars Grid) */}
        <div className="bg-[#FFFFFF] border border-[#E3DAC8] rounded-xl shadow-xs overflow-hidden max-w-4xl mx-auto">
          {/* Header of Results */}
          <div className="bg-[#F7F3EA] border-b border-[#E3DAC8] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              {/* Traditional Luopan Compass Dial */}
              <div
                key={`dial-${spinNonce}`}
                aria-hidden="true"
                className={`w-11 h-11 rounded-full border border-[#D4C7AE] bg-[#FBF9F4] flex items-center justify-center shrink-0 shadow-xs ${
                  isCompassTurning ? 'animate-compass-turn' : ''
                }`}
              >
                <svg viewBox="0 0 48 48" className="w-9 h-9 text-[#1C3831]" fill="none">
                  <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />
                  <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
                  <circle cx="24" cy="24" r="6" stroke="#A3372E" strokeWidth="1.2" />
                  <path d="M24 3v5M24 40v5M3 24h5M40 24h5M9.15 9.15l3.5 3.5M35.35 35.35l3.5 3.5M38.85 9.15l-3.5 3.5M12.65 35.35l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <polygon points="24,10 26.5,24 24,22 21.5,24" fill="#A3372E" />
                  <polygon points="24,38 26.5,24 24,26 21.5,24" fill="#1C3831" fillOpacity="0.7" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#63766E]">先天命造 · 子平四柱</div>
                <div className="text-lg font-song font-semibold text-[#142A24]">
                  {result.gender === 'male' ? '乾造' : '坤造'} · {result.solarDate}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs text-[#52665E] space-y-0.5 text-right font-mono tabular-nums">
                <div>鐘錶基準：{result.birthDateTime}</div>
                <div className="font-semibold text-[#1C3831]">
                  真太陽時：{result.trueSolarTime} ({result.timeOffsetMinutes >= 0 ? `+${result.timeOffsetMinutes}` : result.timeOffsetMinutes} 分鐘)
                </div>
              </div>
              {hasCalculated && (
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="min-h-[44px] px-4 py-2 rounded-md bg-[#A3372E] hover:bg-[#872B23] text-[#FBF9F4] text-xs sm:text-sm font-medium transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <ImageDown className="w-4 h-4" />
                  <span>{t.btnShareChart}</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Pillars Table */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[540px]">
              <div className="grid grid-cols-5 text-center text-xs font-medium border-b border-[#E8E1D1] pb-2 text-[#657971]">
                <div className="text-left pl-2">四柱維度</div>
                <div>{t.colHour}</div>
                <div>{t.colDay}</div>
                <div>{t.colMonth}</div>
                <div>{t.colYear}</div>
              </div>

              {/* Ten Gods Row */}
              <div className="grid grid-cols-5 text-center py-2.5 text-xs text-[#697B73] border-b border-[#F0EBE1] items-center">
                <div className="text-left pl-2 font-medium">{t.rowTenGod}</div>
                <div className="font-semibold text-[#1F3D34]">{result.hourPillar.stemTenGod}</div>
                <div className="font-semibold text-[#A3372E]">{result.dayPillar.stemTenGod}</div>
                <div className="font-semibold text-[#1F3D34]">{result.monthPillar.stemTenGod}</div>
                <div className="font-semibold text-[#1F3D34]">{result.yearPillar.stemTenGod}</div>
              </div>

              {/* Heavenly Stems Row (Large prominent characters) */}
              <div className="grid grid-cols-5 text-center py-4 border-b border-[#F0EBE1] items-center bg-[#FAF8F2]">
                <div className="text-left pl-2 text-xs font-medium text-[#657971]">{t.rowStem}</div>
                {[result.hourPillar, result.dayPillar, result.monthPillar, result.yearPillar].map((p, idx) => {
                  const elemStyle = ELEMENT_COLORS[p.elementStem];
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-2xl sm:text-3xl font-song font-bold text-[#142A24]">
                        {p.stem}
                      </span>
                      <span className={`text-[11px] px-1.5 py-0.2 rounded mt-1 font-medium ${elemStyle.bg} ${elemStyle.text}`}>
                        {ELEMENT_NAMES_ZH[p.elementStem]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Earthly Branches Row */}
              <div className="grid grid-cols-5 text-center py-4 border-b border-[#F0EBE1] items-center bg-[#FAF8F2]">
                <div className="text-left pl-2 text-xs font-medium text-[#657971]">{t.rowBranch}</div>
                {[result.hourPillar, result.dayPillar, result.monthPillar, result.yearPillar].map((p, idx) => {
                  const elemStyle = ELEMENT_COLORS[p.elementBranch];
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-2xl sm:text-3xl font-song font-bold text-[#142A24]">
                        {p.branch}
                      </span>
                      <span className={`text-[11px] px-1.5 py-0.2 rounded mt-1 font-medium ${elemStyle.bg} ${elemStyle.text}`}>
                        {ELEMENT_NAMES_ZH[p.elementBranch]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hidden Stems & Ten Gods */}
              <div className="grid grid-cols-5 text-center py-3 text-xs border-b border-[#F0EBE1] items-start">
                <div className="text-left pl-2 font-medium text-[#657971]">{t.rowHidden}</div>
                {[result.hourPillar, result.dayPillar, result.monthPillar, result.yearPillar].map((p, idx) => (
                  <div key={idx} className="space-y-1 text-[11px]">
                    {p.hiddenStems.map((h, hIdx) => (
                      <div key={hIdx} className="text-[#4F645D]">
                        <span className="font-semibold text-[#1C3831]">{h.stem}</span>
                        <span className="text-[#7F9189] ml-1">({h.god})</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Nayin Row */}
              <div className="grid grid-cols-5 text-center py-2.5 text-xs text-[#52665F] items-center">
                <div className="text-left pl-2 font-medium text-[#657971]">{t.rowNayin}</div>
                <div className="font-song">{result.hourPillar.nayin}</div>
                <div className="font-song font-medium text-[#1C3831]">{result.dayPillar.nayin}</div>
                <div className="font-song">{result.monthPillar.nayin}</div>
                <div className="font-song">{result.yearPillar.nayin}</div>
              </div>

            </div>
          </div>

          {/* Day Master Essence & Five Elements Analysis Footer */}
          <div className="bg-[#FAF7F0] border-t border-[#E3DAC8] p-5 sm:p-6 space-y-5">
            {/* Day Master Highlight */}
            <div className="bg-[#FFFFFF] border border-[#E2DAC8] rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="text-sm font-semibold text-[#142A24] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A3372E]"></span>
                  <span>{t.dayMasterLabel}：{result.dayMaster.stem}（{result.dayMaster.element}）</span>
                </div>
                <div className="text-xs text-[#6B7D76]">
                  起運年齡約：{result.startingAge} 歲 · 大運方向：{result.fortuneDirection === 'forward' ? '順行' : '逆行'}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#3E524A] font-song leading-relaxed">
                {result.dayMaster.nature}。日主為整個命局提綱挈領之中心，其強弱榮枯與月令時辰之引化，構成本命之基本性靈與人生器識。
              </p>
            </div>

            {/* Five Elements Proportions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#304840]">{t.fiveElementsTitle}</span>
                <span className="text-xs text-[#6B7D76]">五行生剋權重比率</span>
              </div>
              
              {/* Stacked Progress Bar */}
              <div className="h-4 w-full bg-[#E8E2D2] rounded-full overflow-hidden flex">
                <div style={{ width: `${result.elementPercentages.Wood}%` }} className="bg-[#2D5A4C] h-full" title={`木: ${result.elementPercentages.Wood}%`} />
                <div style={{ width: `${result.elementPercentages.Fire}%` }} className="bg-[#A3372E] h-full" title={`火: ${result.elementPercentages.Fire}%`} />
                <div style={{ width: `${result.elementPercentages.Earth}%` }} className="bg-[#9B7D54] h-full" title={`土: ${result.elementPercentages.Earth}%`} />
                <div style={{ width: `${result.elementPercentages.Metal}%` }} className="bg-[#788E99] h-full" title={`金: ${result.elementPercentages.Metal}%`} />
                <div style={{ width: `${result.elementPercentages.Water}%` }} className="bg-[#224A6F] h-full" title={`水: ${result.elementPercentages.Water}%`} />
              </div>

              {/* Elements Numeric Breakdown */}
              <div className="grid grid-cols-5 text-center text-xs mt-2.5 gap-1 font-mono">
                <div className="text-[#2D5A4C]">木 {result.elementPercentages.Wood}%</div>
                <div className="text-[#A3372E]">火 {result.elementPercentages.Fire}%</div>
                <div className="text-[#9B7D54]">土 {result.elementPercentages.Earth}%</div>
                <div className="text-[#59717D]">金 {result.elementPercentages.Metal}%</div>
                <div className="text-[#224A6F]">水 {result.elementPercentages.Water}%</div>
              </div>
            </div>

            {/* Harmonizing Color Recommendation & Share Action */}
            <div className="bg-[#FFFFFF] border border-[#E2DAC8] rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-md border border-black/10 shrink-0 shadow-xs"
                  style={{ backgroundColor: result.luckyColor.hex }}
                />
                <div>
                  <div className="text-xs font-semibold text-[#1C3831]">
                    {t.luckyColorTitle}：{result.luckyColor.name}
                  </div>
                  <div className="text-[11px] text-[#556961]">
                    {result.luckyColor.desc}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8C7A62] shrink-0">{result.luckyColor.hex}</span>
                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="min-h-[44px] px-4 py-2 rounded-md border border-[#1C3831] bg-[#FAF7F0] hover:bg-[#1C3831] text-[#1C3831] hover:text-[#FBF9F4] text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <ImageDown className="w-4 h-4" />
                  <span>{t.btnShareChart}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      <BaziShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        result={result}
        cityName={getCityName(currentCity)}
      />
    </section>
  );
}
