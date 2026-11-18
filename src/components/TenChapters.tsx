import { useState } from 'react';
import { useI18n } from '../utils/i18n';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Chapter {
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  quote: string;
}

const CHAPTERS: Chapter[] = [
  {
    index: '第一章',
    title: '先天格局 · 元亨利貞',
    subtitle: '八字主格、日元本性與命盤清濁',
    summary: '深入辨析日主五行與月令司令之深淺，確立建祿、食神、正官等八正格或特殊變格，審視全局氣象之清純與駁雜。',
    quote: '「命之所在，如原木之種。識其材器，方知松柏耐歲寒，藤蘿藉倚託。」'
  },
  {
    index: '第二章',
    title: '形勢樞機 · 五行通變',
    subtitle: '干支生剋、調候用神與氣息平衡',
    summary: '以氣候冷暖、燥濕之調候為先導，通盤審查天干相合相衝、地支刑衝破害，精確鎖定扶抑用神與通關樞紐。',
    quote: '「寒冬之木喜向陽，盛夏之金愛清泉。五行非求均分，貴在順氣而和。」'
  },
  {
    index: '第三章',
    title: '十神司命 · 心性賦稟',
    subtitle: '思維特質、行為偏好與內在潛能',
    summary: '解構比劫之意志、食傷之才思、財星之務實、官殺之紀律、印星之仁厚，刻畫最真實立體的內在心性藍圖。',
    quote: '「心生種種法生。知己之性，始能處世不尤，因勢利導。」'
  },
  {
    index: '第四章',
    title: '大運推移 · 歲月浮沉',
    subtitle: '十年一步大運，辨清天時進退節奏',
    summary: '推演起運歲數及六步主流大運之順逆轉換，標註人生發力、蓄勢、守成或避險之關鍵時序節點。',
    quote: '「時來天地皆同力，運去英雄不自由。得時者進，失時者藏。」'
  },
  {
    index: '第五章',
    title: '事業功名 · 官祿之途',
    subtitle: '職場軌跡、領導權柄與創業機遇',
    summary: '探尋官印與傷官駕殺等事業格局，明確專業深耕、體制發展或獨立開拓的最佳賽道與合適夥伴類型。',
    quote: '「審量器量，求事當如良工操舟，隨波而不隨流。」'
  },
  {
    index: '第六章',
    title: '財帛府庫 · 富貴生發',
    subtitle: '財富源流、財庫開合與積聚智慧',
    summary: '詳論食傷生財之智、身財兩停之富，查驗辰戌丑未四庫之藏伏，指明長期資產配置之防守與開拓邊界。',
    quote: '「君子愛財取之有道，知藏而不露，方保長久之富。」'
  },
  {
    index: '第七章',
    title: '紅鸞天喜 · 知己姻緣',
    subtitle: '夫妻宮位、親密關係與伴侶和合',
    summary: '從日支夫妻宮之喜忌及配偶星之純雜出發，破除盲目婚配玄談，給予真誠溝通、彼此涵容之現實建言。',
    quote: '「同聲相應，同氣相求。良緣非偶然之合，乃心魂之修為。」'
  },
  {
    index: '第八章',
    title: '父母骨肉 · 六親照映',
    subtitle: '家族源流、父母庇蔭與子嗣緣分',
    summary: '檢驗年月日時所對應之長輩恩澤與後代因緣，釐清原生家庭之能量影響，化解親緣糾葛，安立天倫秩序。',
    quote: '「根深則枝繁葉茂。念祖德而敬父母，自得延綿之蔭。」'
  },
  {
    index: '第九章',
    title: '地支藏伏 · 安康壽數',
    subtitle: '五行平衡與身心安頓之日常修為',
    summary: '依據五行金木水火土在臟腑氣血之對應，提示先天偏旺偏弱之調理方向，配合節氣作息實現內外和諧。',
    quote: '「神清則氣和，氣和則體泰。上醫醫未病，在知五行損益。」'
  },
  {
    index: '第十章',
    title: '知命立命 · 知行合一',
    subtitle: '超越宿命羈絆，活出圓滿開闊人生',
    summary: '昭梧體系之最高歸宿：命理非牢不可破之鐵律，乃助君趨吉避凶之導航。以修身立志為本，把握自性力量。',
    quote: '「造命者天，立命者我。盡人事而順天時，無往而不泰。」'
  }
];

export default function TenChapters() {
  const { t } = useI18n();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedChapter = CHAPTERS[selectedIdx];

  return (
    <section id="ten-chapters" className="py-12 lg:py-16 bg-[#F6F1E7] border-b border-[#E5DDCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#70847C] font-semibold mb-1">
            ZHAOWU LIFE DOSSIER FRAMEWORK
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-song font-semibold text-[#142A24]">
            {t.tenChaptersTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E625A] font-song">
            {t.tenChaptersSubtitle}
          </p>
        </div>

        {/* Chapters Browser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-start">
          
          {/* Chapter Selector List (Left Column) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E0D7C4] rounded-xl p-3 shadow-xs space-y-1">
            <div className="text-xs font-semibold text-[#4A5D56] px-3 py-2 border-b border-[#EFE8D8]">
              章節目錄 · 點選查看精要
            </div>
            <div className="max-h-[460px] overflow-y-auto space-y-1 pr-1">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between min-h-[44px] ${
                    selectedIdx === idx
                      ? 'bg-[#1C3831] text-[#FBF9F4] font-semibold'
                      : 'text-[#3D524A] hover:bg-[#FAF8F2]'
                  }`}
                >
                  <div className="truncate">
                    <span className="font-mono opacity-80 mr-2">{ch.index}</span>
                    <span>{ch.title.split(' · ')[0]}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedIdx === idx ? 'opacity-100' : 'opacity-40'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Detail Excerpt (Right Column) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E0D7C4] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#EFE8D8] pb-4">
              <span className="text-xs font-mono font-semibold text-[#8C7A62]">{selectedChapter.index}</span>
              <h3 className="text-2xl font-song font-bold text-[#142A24] mt-1">
                {selectedChapter.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C7068] mt-1 font-song">
                {selectedChapter.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-[#2E433B] font-song leading-relaxed">
                {selectedChapter.summary}
              </div>

              {/* Classical Quote Callout */}
              <blockquote className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-lg p-4 italic text-xs sm:text-sm text-[#3E524A] font-song leading-relaxed">
                {selectedChapter.quote}
              </blockquote>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#73877F] border-t border-[#EFE8D8]">
              <span>昭梧原創體系 · 深度命書十篇章完整版覆蓋五萬餘字</span>
              <span className="font-semibold text-[#1C3831]">STONE 原創</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
