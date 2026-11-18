import { useState } from 'react';
import { useI18n } from '../utils/i18n';
import { BaziResult, FiveElement } from '../types';
import { Sparkles } from 'lucide-react';
import FiveElementsRadar from './FiveElementsRadar';

interface ElementColorProfile {
  element: FiveElement;
  nameZh: string;
  pinyin: string;
  season: string;
  organ: string;
  colors: { name: string; hex: string; desc: string }[];
  application: string;
}

const FIVE_ELEMENTS_DATA: ElementColorProfile[] = [
  {
    element: 'Wood',
    nameZh: '木 · 東方生發',
    pinyin: 'MÙ',
    season: '春陽和煦',
    organ: '肝膽調達',
    colors: [
      { name: '松花綠 (Pine Green)', hex: '#2D5A4C', desc: '深山青松之色，寧靜深遠，滋養清神' },
      { name: '翡翠青 (Jade Verdigris)', hex: '#3E7B68', desc: '草木抽芽之色，生機勃發，去浮躁氣' }
    ],
    application: '宜於書房几案陳設青松盆栽、穿著素綠麻織物，生旺創意思維與仁和心量。'
  },
  {
    element: 'Fire',
    nameZh: '火 · 南方盛陽',
    pinyin: 'HUǑ',
    season: '夏日炎炎',
    organ: '心血宣通',
    colors: [
      { name: '硃砂絳 (Cinnabar Red)', hex: '#A3372E', desc: '金石硃砂天然礦色，光華端方，闢陰邪之沉' },
      { name: '胭脂茜 (Madder Crimson)', hex: '#8C2B24', desc: '典雅含蓄之絳紅，提振精神，溫暖心房' }
    ],
    application: '可於空間點綴硃砂印章、深紅陶器，面試或重大會談時適度配戴，加強氣場與主導力。'
  },
  {
    element: 'Earth',
    nameZh: '土 · 中央敦厚',
    pinyin: 'TǓ',
    season: '長夏化育',
    organ: '脾胃安康',
    colors: [
      { name: '沉香赭 (Agarwood Ochre)', hex: '#876D49', desc: '古木沉香之本色，敦厚端凝，納福藏氣' },
      { name: '柘黃金 (Imperial Ochre)', hex: '#A68452', desc: '熟稻田土之色，包容萬類，穩健有守' }
    ],
    application: '宜選用原木家具、土陶泥器，常著大地色系以固元氣，平定焦躁不安與飄忽思緒。'
  },
  {
    element: 'Metal',
    nameZh: '金 · 西方肅清',
    pinyin: 'JĪN',
    season: '秋露凝結',
    organ: '肺腑清潤',
    colors: [
      { name: '月白霜 (Moonlight Frost)', hex: '#D6DEE2', desc: '清秋月光映霜之色，孤高純淨，收束心神' },
      { name: '宣紙暖白 (Warm Xuan Alabaster)', hex: '#F5EFE4', desc: '宋代宣紙溫潤之素白，澄明開朗，立規成方' }
    ],
    application: '几案保持極簡留白，常著素白襯衫或配戴銀飾，有助於梳理繁雜資訊、決斷事物。'
  },
  {
    element: 'Water',
    nameZh: '水 · 北方涵潤',
    pinyin: 'SHUǏ',
    season: '冬藏幽深',
    organ: '腎水充盈',
    colors: [
      { name: '深黛墨 (Deep Slate Ink)', hex: '#1C2E3D', desc: '松煙古墨濃研之色，深邃淵博，涵養萬象' },
      { name: '遠山青 (Horizon Azure)', hex: '#2A4354', desc: '雨後遠山之深藍，流動通達，滋長深思' }
    ],
    application: '宜置流動水景、墨寶字畫，處事秉持柔順不爭而無所不至之德，蓄積長遠智慧。'
  }
];

interface FiveElementsColorProps {
  baziResult: BaziResult;
}

export default function FiveElementsColor({ baziResult }: FiveElementsColorProps) {
  useI18n();
  const [activeTab, setActiveTab] = useState<FiveElement>('Wood');

  const activeElement = FIVE_ELEMENTS_DATA.find(e => e.element === activeTab) || FIVE_ELEMENTS_DATA[0];

  return (
    <section id="five-elements" className="py-12 lg:py-16 bg-[#FBF9F4] border-b border-[#E8E1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#70847C] font-semibold mb-1">
            FIVE ELEMENTS CHROMATOLOGY & AESTHETICS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-song font-semibold text-[#142A24]">
            五行色彩美學 · 天時賦形
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E625A] font-song">
            取法宋代文人礦物顏料與草木染色，以五行色氣調和命盤偏枯，將天道哲思化為日常生活之具象修養
          </p>
        </div>

        {/* Dynamic D3.js Five Elements Radar Chart */}
        <FiveElementsRadar
          baziResult={baziResult}
          activeElement={activeTab}
          onSelectElement={setActiveTab}
        />

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FIVE_ELEMENTS_DATA.map(item => (
            <button
              key={item.element}
              type="button"
              onClick={() => setActiveTab(item.element)}
              className={`min-h-[44px] px-5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === item.element
                  ? 'bg-[#1C3831] text-[#FBF9F4] shadow-xs'
                  : 'bg-[#F2ECE1] border border-[#DDD3BF] text-[#3D524A] hover:bg-[#EAE2D2]'
              }`}
            >
              {item.nameZh}
            </button>
          ))}
        </div>

        {/* Active Element Detail Card */}
        <div className="bg-[#FFFFFF] border border-[#E3DAC8] rounded-xl shadow-xs p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#EFE8D8] pb-5 mb-6 gap-3">
            <div>
              <div className="text-xs font-mono text-[#8C7A62]">{activeElement.pinyin} · {activeElement.season}</div>
              <h3 className="text-2xl font-song font-bold text-[#142A24] mt-0.5">
                {activeElement.nameZh}
              </h3>
            </div>
            <div className="text-xs text-[#62776E] bg-[#FAF8F2] border border-[#E4DCB] px-3 py-1.5 rounded-md font-song">
              內應藏象：{activeElement.organ}
            </div>
          </div>

          {/* Color Swatches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {activeElement.colors.map((c, idx) => (
              <div
                key={idx}
                className="border border-[#E4DCB] rounded-lg p-4 bg-[#FAF8F2] flex items-center gap-4 shadow-xs"
              >
                <div
                  className="w-14 h-14 rounded-md border border-black/10 shrink-0 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1C3831]">{c.name}</span>
                    <span className="text-xs font-mono text-[#7A6B54]">{c.hex}</span>
                  </div>
                  <p className="text-xs text-[#52665F] font-song">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Application Advice */}
          <div className="bg-[#FAF7F0] border border-[#E3DAC8] rounded-lg p-4">
            <div className="text-xs font-semibold text-[#1C3831] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A3372E]" />
              <span>日常起居與空間五行調和指引</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3E524A] font-song leading-relaxed">
              {activeElement.application}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
