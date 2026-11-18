import { useState } from 'react';
import { useI18n } from '../utils/i18n';
import { BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  readingTime: string;
  excerpt: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'true-solar-time',
    category: '天文曆算',
    title: '為什麼真太陽時是八字排盤的科學底線？',
    readingTime: '5 分鐘閱讀',
    excerpt: '現代鐘錶時間（平太陽時）是由人為劃分之時區平均值，而真正決定天干地支交接的，乃是地球繞日公轉之真實幾何角度。',
    content: [
      '許多初學者常困惑：為什麼出生證明上寫著 13:05，排盤時卻必須校準為 12:47？',
      '這是因為我們日常生活所使用的標準時（如東八區、澳洲東部標準時等），是以某一條基準經線為準。若出生地不在基準線上，每偏離 1 度經度，真太陽升落就產生整整 4 分鐘的時間差。',
      '更關鍵的是「均時差（Equation of Time）」。由於地球公轉軌道為橢圓形，且赤道與黃道存在夾角，地球運行的真太陽時在一年之中會有最大約 ±16 分鐘的自然擺動。',
      '若忽視這兩項誤差，處在時辰交界（如子丑交界 01:00、午未交界 13:00）出生的人，極易排錯時柱，甚至錯移日柱，導致全盤皆謬。昭梧堅守古法天文嚴謹推算，將真太陽時校準列為系統第一底線。'
    ]
  },
  {
    id: 'song-dynasty-astronomy',
    category: '學脈源流',
    title: '宋代理學與子平干支之學的融匯昇華',
    readingTime: '6 分鐘閱讀',
    excerpt: '從唐代以年柱祿命為主的古法，到北宋徐子平確立以「日元」為核心，命理學完成了從宿命神煞到格物致知的理性躍遷。',
    content: [
      '宋代是中華文明天文曆法與哲學思辨的極盛時期。沈括所著《夢溪筆談》記載了當時極具創見的「十二氣曆」，蘇頌主持建造了名垂青史的水運儀象台。',
      '正是在宋代理學「格物致知、天人一理」的文化氛圍下，徐子平創立了現代意義上的八字命理學。他摒棄了漢唐以前龐雜繁複的神煞怪論，確立了以「出生日天干（日元）」代表自我本命的清爽典範。',
      '昭梧之視覺美學與研究準則，正是繼承宋代文人「質樸、內斂、嚴謹、溫潤」之風骨。我們拒絕市面上廉價刺眼的符咒感，讓命理回歸知命立命的清正學問。'
    ]
  },
  {
    id: 'one-time-report-philosophy',
    category: '昭梧準則',
    title: '一次性付費深度報告與訂閱制模版運算的根本分野',
    readingTime: '4 分鐘閱讀',
    excerpt: '命運不是可以按月扣款消耗的商品，深度的命局剖析需要嚴格的演算校對與終身珍藏的重量。',
    content: [
      '市面多數命理應用為了持續獲利，往往將零碎的幾句心理學話術包裝成每週、每月的自動續費訂閱，內容重複、語焉不詳。',
      '昭梧旗幟鮮明地拒絕訂閱制套路：基礎八字排盤、真太陽時校準、今日天時天象完全免費公開；而付費的深度命書，採取「一次性付費、終生珍藏」的形式。',
      '每一份昭梧深度報告，均經過精密演算法計算大運流年，再由專業命理師逐字審校五萬餘字的十篇章體系，為命主建立一份專屬、詳實且充滿溫度的生命決策導航。'
    ]
  }
];

export default function KnowledgeBase() {
  const { t } = useI18n();
  const [expandedId, setExpandedId] = useState<string>('true-solar-time');

  return (
    <section id="knowledge-base" className="py-12 lg:py-16 bg-[#FBF9F4] border-b border-[#E8E1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#70847C] font-semibold mb-1">
            ZHAOWU ESSAYS & KNOWLEDGE BASE
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-song font-semibold text-[#142A24]">
            昭梧命理文庫 · 格物窮理
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E625A] font-song">
            以嚴謹天象與人文哲思，釐清真太陽時、八字源流與正統命學知見
          </p>
        </div>

        {/* Articles Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {ARTICLES.map(art => {
            const isExpanded = expandedId === art.id;
            return (
              <div
                key={art.id}
                className="bg-[#FFFFFF] border border-[#E3DAC8] rounded-xl shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? '' : art.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-[#FAF8F2] transition-colors"
                >
                  <div className="space-y-1.5">
                    {/* Unboxed Metadata Discipline */}
                    <div className="flex items-center gap-2 text-xs text-[#6B7D76]">
                      <span className="font-semibold text-[#1C3831]">{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readingTime}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-song font-bold text-[#142A24]">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E625A] font-song">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="p-2 rounded-md bg-[#F4EFE6] text-[#1C3831] shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Full Essay Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F0EAE0] bg-[#FAF8F2] space-y-3">
                    {art.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-[#2E433B] font-song leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
