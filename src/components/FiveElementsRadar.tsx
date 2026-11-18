import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { BaziResult, FiveElement } from '../types';
import { useI18n } from '../utils/i18n';

interface FiveElementsRadarProps {
  baziResult: BaziResult;
  activeElement: FiveElement;
  onSelectElement: (elem: FiveElement) => void;
}

interface RadarAxisInfo {
  element: FiveElement;
  label: string;
  short: string;
  color: string;
  nature: string;
  strongAdvice: string;
  weakAdvice: string;
  balancedAdvice: string;
}

const RADAR_AXES: RadarAxisInfo[] = [
  {
    element: 'Wood',
    label: '木 · 生發',
    short: '木',
    color: '#2D5A4C',
    nature: '主仁和、創發、條達之氣，應肝膽與思維伸展力。',
    strongAdvice: '木氣偏旺，宜以硃砂火色洩秀或月白金色修剪，避免思慮過多而少決斷。',
    weakAdvice: '木氣偏弱，宜親近松花綠、青木意象，培固生機與進取之志。',
    balancedAdvice: '木氣中和，進退有度，具溫潤生發之象。'
  },
  {
    element: 'Fire',
    label: '火 · 明照',
    short: '火',
    color: '#A3372E',
    nature: '主禮明、宣通、感染力，應心脈與外顯光芒。',
    strongAdvice: '火氣偏旺，宜用深黛墨水色或沉香土色涵養收斂，戒急躁。',
    weakAdvice: '火氣偏弱，宜適度點綴硃砂絳紅、多曬晨光，提振溫煦氣場。',
    balancedAdvice: '火氣中和，待人坦蕩明朗而不失沉穩。'
  },
  {
    element: 'Earth',
    label: '土 · 敦厚',
    short: '土',
    color: '#876D49',
    nature: '主信實、承載、轉化樞紐，應脾胃與基業定力。',
    strongAdvice: '土氣偏旺，宜著松綠木色疏土或素白金色洩土，保持變通彈性。',
    weakAdvice: '土氣偏弱，宜親近沉香赭、陶器與大地色系，安頓身心根基。',
    balancedAdvice: '土氣中和，四時調和，處事敦厚有守。'
  },
  {
    element: 'Metal',
    label: '金 · 清肅',
    short: '金',
    color: '#5B707B',
    nature: '主義斷、收斂、原則秩序，應肺腑與裁斷執行力。',
    strongAdvice: '金氣偏旺，宜以深藍水色潤澤或硃砂火色鍛鍊，柔化剛硬之鋒。',
    weakAdvice: '金氣偏弱，宜多用月白霜、宣紙暖白色系，強化條理與決斷力。',
    balancedAdvice: '金氣中和，剛柔並濟，秩序井然。'
  },
  {
    element: 'Water',
    label: '水 · 涵潤',
    short: '水',
    color: '#1F496E',
    nature: '主智謀、流轉、幽深洞察，應腎水與適應靈活度。',
    strongAdvice: '水氣偏旺，宜以沉香土色堤防或松綠木色納水生發，防過度漂泊。',
    weakAdvice: '水氣偏弱，宜親近深黛墨、遠山青色與靜水意境，滋長深沉智慧。',
    balancedAdvice: '水氣中和，靈動通達而不失定見。'
  }
];

function getStrengthStatus(pct: number) {
  if (pct >= 28) return { label: '偏旺', badgeClass: 'text-[#A3372E] bg-[#F9ECEB] border-[#ECC2BF]' };
  if (pct <= 13) return { label: '偏弱', badgeClass: 'text-[#1D4468] bg-[#E8F0F7] border-[#B6D0E5]' };
  return { label: '中和', badgeClass: 'text-[#235848] bg-[#EBF3EF] border-[#BDD6CB]' };
}

export default function FiveElementsRadar({
  baziResult,
  activeElement,
  onSelectElement
}: FiveElementsRadarProps) {
  const { t } = useI18n();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredElem, setHoveredElem] = useState<FiveElement | null>(null);

  const inspectedElem = hoveredElem || activeElement;
  const inspectedAxis = RADAR_AXES.find(a => a.element === inspectedElem) || RADAR_AXES[0];
  const inspectedPct = baziResult.elementPercentages[inspectedElem];
  const inspectedStatus = getStrengthStatus(inspectedPct);

  const adviceText =
    inspectedPct >= 28
      ? inspectedAxis.strongAdvice
      : inspectedPct <= 13
      ? inspectedAxis.weakAdvice
      : inspectedAxis.balancedAdvice;

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = 340;
    const height = 320;
    const radius = 104;
    const levels = 5;
    const maxScaleValue = Math.max(45, ...Object.values(baziResult.elementPercentages), 40);
    const angleSlice = (Math.PI * 2) / RADAR_AXES.length;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rScale = d3.scaleLinear().domain([0, maxScaleValue]).range([0, radius]);

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2 + 6})`);

    // 1. Concentric pentagon grid rings
    const ringLine = d3.line<[number, number]>().curve(d3.curveLinearClosed);
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (radius / levels) * lvl;
      const points: [number, number][] = RADAR_AXES.map((_, idx) => {
        const angle = angleSlice * idx - Math.PI / 2;
        return [r * Math.cos(angle), r * Math.sin(angle)];
      });

      g.append('path')
        .datum(points)
        .attr('d', ringLine)
        .attr('fill', lvl % 2 === 0 ? 'rgba(244, 239, 230, 0.35)' : 'none')
        .attr('stroke', '#DCD2BE')
        .attr('stroke-width', lvl === levels ? 1.4 : 0.9)
        .attr('stroke-dasharray', lvl < levels ? '2,2' : 'none');

      if (lvl === 2 || lvl === 4) {
        const tickPct = Math.round((maxScaleValue / levels) * lvl);
        g.append('text')
          .attr('x', 4)
          .attr('y', -r + 4)
          .attr('fill', '#8B9A93')
          .attr('font-size', '9px')
          .attr('font-family', 'monospace')
          .text(`${tickPct}%`);
      }
    }

    // 2. Radial axis lines & labels
    RADAR_AXES.forEach((axis, idx) => {
      const angle = angleSlice * idx - Math.PI / 2;
      const x2 = radius * Math.cos(angle);
      const y2 = radius * Math.sin(angle);

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#D8CEB9')
        .attr('stroke-width', 1);

      const labelR = radius + 28;
      const lx = labelR * Math.cos(angle);
      const ly = labelR * Math.sin(angle);
      const pct = baziResult.elementPercentages[axis.element];
      const isFocused = inspectedElem === axis.element;

      const labelGroup = g
        .append('g')
        .attr('transform', `translate(${lx}, ${ly})`)
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredElem(axis.element))
        .on('mouseleave', () => setHoveredElem(null))
        .on('click', () => {
          setHoveredElem(axis.element);
          onSelectElement(axis.element);
        });

      labelGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.15em')
        .attr('fill', isFocused ? axis.color : '#223C34')
        .attr('font-size', isFocused ? '13px' : '12px')
        .attr('font-weight', isFocused ? '700' : '600')
        .text(axis.label);

      labelGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.15em')
        .attr('fill', '#6A7C74')
        .attr('font-size', '11px')
        .attr('font-family', 'monospace')
        .text(`${pct}%`);
    });

    // 3. Data polygon path with D3 radial generator & smooth entrance
    const dataCoords: [number, number][] = RADAR_AXES.map((axis, idx) => {
      const val = baziResult.elementPercentages[axis.element];
      const r = rScale(val);
      const angle = angleSlice * idx - Math.PI / 2;
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    const zeroCoords: [number, number][] = RADAR_AXES.map(() => [0, 0]);
    const polygonLine = d3.line<[number, number]>().curve(d3.curveLinearClosed);

    const areaPath = g
      .append('path')
      .datum(reduceMotion ? dataCoords : zeroCoords)
      .attr('d', polygonLine)
      .attr('fill', 'rgba(45, 90, 76, 0.22)')
      .attr('stroke', '#1C3831')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round');

    if (!reduceMotion) {
      areaPath
        .datum(dataCoords)
        .transition()
        .duration(720)
        .ease(d3.easeCubicOut)
        .attr('d', polygonLine);
    }

    // 4. Interactive data vertices (with generous 18px invisible hit area for touch/mouse)
    RADAR_AXES.forEach((axis, idx) => {
      const [cx, cy] = dataCoords[idx];
      const isFocused = inspectedElem === axis.element;

      const nodeGroup = g
        .append('g')
        .style('cursor', 'pointer')
        .on('mouseenter', () => setHoveredElem(axis.element))
        .on('mouseleave', () => setHoveredElem(null))
        .on('click', () => {
          setHoveredElem(axis.element);
          onSelectElement(axis.element);
        });

      const dot = nodeGroup
        .append('circle')
        .attr('cx', reduceMotion ? cx : 0)
        .attr('cy', reduceMotion ? cy : 0)
        .attr('r', isFocused ? 7 : 5)
        .attr('fill', axis.color)
        .attr('stroke', '#FBF9F4')
        .attr('stroke-width', 2);

      if (!reduceMotion) {
        dot.transition().duration(720).ease(d3.easeCubicOut).attr('cx', cx).attr('cy', cy);
      }

      if (isFocused) {
        nodeGroup
          .append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', 12)
          .attr('fill', 'none')
          .attr('stroke', axis.color)
          .attr('stroke-opacity', 0.35)
          .attr('stroke-width', 1.5);
      }

      nodeGroup
        .append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 20)
        .attr('fill', 'transparent');
    });
  }, [baziResult, inspectedElem, onSelectElement]);

  return (
    <div className="bg-[#FFFFFF] border border-[#E3DAC8] rounded-xl shadow-xs p-5 sm:p-7 max-w-4xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8D8] pb-4 mb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-song font-bold text-[#142A24]">
            {t.radarTitle}
          </h3>
          <p className="text-xs text-[#5E726A] font-song mt-0.5">
            {t.radarSubtitle}
          </p>
        </div>
        <div className="text-xs font-mono text-[#6B7D76] tabular-nums">
          日主：{baziResult.dayMaster.stem} · 應色：{baziResult.luckyColor.name.split(' ')[0]}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: D3 SVG Radar Canvas */}
        <div className="md:col-span-6 flex items-center justify-center">
          <svg
            ref={svgRef}
            className="w-full max-w-[330px] h-auto select-none"
            role="img"
            aria-label="本命五行強弱五邊形雷達圖"
          />
        </div>

        {/* Right: Interactive Hover/Focus Detail Explanation Panel */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-[#FAF7F0] border border-[#DFD5C0] rounded-xl p-5 space-y-3 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                  style={{ backgroundColor: inspectedAxis.color }}
                />
                <span className="text-lg font-song font-bold text-[#142A24]">
                  {inspectedAxis.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-mono font-bold text-[#1C3831] tabular-nums">
                  {inspectedPct}%
                </span>
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${inspectedStatus.badgeClass}`}>
                  {inspectedStatus.label}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#3E524A] font-song leading-relaxed">
              {inspectedAxis.nature}
            </p>

            <div className="pt-2 border-t border-[#E6DEC9]">
              <div className="text-xs font-semibold text-[#1C3831] mb-1">
                本命局勢解析與調候建議
              </div>
              <p className="text-xs text-[#4C6159] font-song leading-relaxed">
                {adviceText}
              </p>
            </div>
          </div>

          {/* Quick Accessible Axis Buttons for Mobile / Keyboard */}
          <div className="grid grid-cols-5 gap-1.5">
            {RADAR_AXES.map(axis => {
              const pct = baziResult.elementPercentages[axis.element];
              const active = inspectedElem === axis.element;
              return (
                <button
                  key={axis.element}
                  type="button"
                  onMouseEnter={() => setHoveredElem(axis.element)}
                  onMouseLeave={() => setHoveredElem(null)}
                  onClick={() => {
                    setHoveredElem(axis.element);
                    onSelectElement(axis.element);
                  }}
                  className={`min-h-[44px] rounded-md border text-center py-1.5 px-1 transition-all ${
                    active
                      ? 'bg-[#1C3831] text-[#FBF9F4] border-[#1C3831] font-semibold'
                      : 'bg-[#FAF8F2] text-[#354B43] border-[#DFD6C2] hover:bg-[#EFE9DC]'
                  }`}
                >
                  <div className="text-xs font-song">{axis.short}</div>
                  <div className="text-[11px] font-mono tabular-nums opacity-85">{pct}%</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
