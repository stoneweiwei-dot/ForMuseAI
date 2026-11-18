import { useEffect, useRef, useState } from 'react';
import { BaziResult, FiveElement } from '../types';
import { Download, X, Sparkles } from 'lucide-react';

interface BaziShareModalProps {
  open: boolean;
  onClose: () => void;
  result: BaziResult;
  cityName: string;
}

const ELEMENT_META: Record<FiveElement, { zh: string; color: string }> = {
  Wood: { zh: '木', color: '#2D5A4C' },
  Fire: { zh: '火', color: '#A3372E' },
  Earth: { zh: '土', color: '#876D49' },
  Metal: { zh: '金', color: '#647984' },
  Water: { zh: '水', color: '#1F496E' }
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const chars = Array.from(text);
  let line = '';
  let currentY = y;

  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = chars[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
  }
  return currentY;
}

export default function BaziShareModal({ open, onClose, result, cityName }: BaziShareModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const renderCard = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // Proceed with fallback serif fonts if fonts API is unavailable
      }
      if (cancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const width = 900;
      const height = 1600; // 9:16 vertical Song scroll proportion
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Warm Xuan Paper Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#FBF9F4');
      bgGrad.addColorStop(0.55, '#F7F3EA');
      bgGrad.addColorStop(1, '#F2ECE0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle paper fiber grain lines
      ctx.strokeStyle = 'rgba(135, 109, 73, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 24; i < height; i += 28) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // 2. Archival Double Hairline Frame
      ctx.strokeStyle = '#D6CCB6';
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 36, width - 72, height - 72);
      ctx.strokeStyle = 'rgba(28, 56, 49, 0.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(48, 48, width - 96, height - 96);

      // Corner ornaments
      const corners = [
        [48, 48, 1, 1],
        [width - 48, 48, -1, 1],
        [48, height - 48, 1, -1],
        [width - 48, height - 48, -1, -1]
      ];
      ctx.strokeStyle = '#1C3831';
      ctx.lineWidth = 2;
      corners.forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + 20 * dy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + 20 * dx, cy);
        ctx.stroke();
      });

      // 3. Top Header & Brand Mark
      ctx.textAlign = 'center';
      ctx.fillStyle = '#6D7F77';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ZHAOWU · CELESTIAL DESTINY RECORD', width / 2, 118);

      ctx.fillStyle = '#142A24';
      ctx.font = '700 54px "Noto Serif TC", "Songti TC", serif';
      ctx.fillText('昭梧 · 先天八字命造', width / 2, 186);

      ctx.fillStyle = '#4C6159';
      ctx.font = '400 24px "Noto Serif TC", "Songti TC", serif';
      ctx.fillText('讓天時有形，讓命理可讀', width / 2, 232);

      // Divider
      ctx.strokeStyle = '#DED4BF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(110, 266);
      ctx.lineTo(width - 110, 266);
      ctx.stroke();

      // 4. Birth & True Solar Time Metadata Box
      drawRoundedRect(ctx, 84, 298, width - 168, 134, 14);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#E2DAC8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#5D7068';
      ctx.font = '500 21px "Noto Serif TC", sans-serif';
      const genderLabel = result.gender === 'male' ? '乾造（男命）' : '坤造（女命）';
      ctx.fillText(`${genderLabel}  ·  ${result.solarDate}`, 118, 342);

      ctx.fillStyle = '#1C3831';
      ctx.font = '600 22px "Plus Jakarta Sans", monospace';
      ctx.fillText(
        `真太陽時：${result.trueSolarTime} (${result.timeOffsetMinutes >= 0 ? '+' : ''}${result.timeOffsetMinutes} 分)`,
        118,
        382
      );

      ctx.fillStyle = '#6B7D76';
      ctx.font = '400 19px "Noto Serif TC", sans-serif';
      ctx.fillText(`降生經緯錨定：${cityName}`, 118, 414);

      // 5. Four Pillars Grid (時 · 日 · 月 · 年)
      const gridX = 84;
      const gridY = 464;
      const gridW = width - 168;
      const colW = gridW / 4;
      const pillars = [
        { label: '時柱（歸宿）', pillar: result.hourPillar, isDay: false },
        { label: '日柱（元神）', pillar: result.dayPillar, isDay: true },
        { label: '月柱（提綱）', pillar: result.monthPillar, isDay: false },
        { label: '年柱（根基）', pillar: result.yearPillar, isDay: false }
      ];

      drawRoundedRect(ctx, gridX, gridY, gridW, 380, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#E2DAC8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Pillar Header strip
      ctx.fillStyle = '#F3EEE3';
      ctx.fillRect(gridX + 1, gridY + 1, gridW - 2, 56);

      pillars.forEach((item, idx) => {
        const cx = gridX + colW * idx + colW / 2;
        if (idx > 0) {
          ctx.strokeStyle = '#EFE8D9';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(gridX + colW * idx, gridY + 14);
          ctx.lineTo(gridX + colW * idx, gridY + 366);
          ctx.stroke();
        }

        ctx.textAlign = 'center';
        ctx.fillStyle = '#5D7068';
        ctx.font = '600 20px "Noto Serif TC", sans-serif';
        ctx.fillText(item.label, cx, gridY + 36);

        // Ten God
        ctx.fillStyle = item.isDay ? '#A3372E' : '#2C473E';
        ctx.font = '600 20px "Noto Serif TC", sans-serif';
        ctx.fillText(item.pillar.stemTenGod, cx, gridY + 96);

        // Heavenly Stem
        ctx.fillStyle = ELEMENT_META[item.pillar.elementStem].color;
        ctx.font = '700 68px "Noto Serif TC", "Songti TC", serif';
        ctx.fillText(item.pillar.stem, cx, gridY + 178);

        // Earthly Branch
        ctx.fillStyle = ELEMENT_META[item.pillar.elementBranch].color;
        ctx.font = '700 68px "Noto Serif TC", "Songti TC", serif';
        ctx.fillText(item.pillar.branch, cx, gridY + 266);

        // Element tags
        ctx.fillStyle = '#6D7F77';
        ctx.font = '500 18px "Noto Serif TC", sans-serif';
        ctx.fillText(
          `${ELEMENT_META[item.pillar.elementStem].zh} / ${ELEMENT_META[item.pillar.elementBranch].zh}`,
          cx,
          gridY + 306
        );

        // Nayin
        ctx.fillStyle = item.isDay ? '#1C3831' : '#52665E';
        ctx.font = '500 20px "Noto Serif TC", serif';
        ctx.fillText(item.pillar.nayin, cx, gridY + 346);
      });

      // 6. Day Master Essence Card
      drawRoundedRect(ctx, 84, 876, gridW, 200, 14);
      ctx.fillStyle = '#FAF7F0';
      ctx.fill();
      ctx.strokeStyle = '#DFD5C0';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#A3372E';
      ctx.font = '700 24px "Noto Serif TC", serif';
      ctx.fillText(
        `命主日元：${result.dayMaster.stem}（五行屬${ELEMENT_META[result.dayMaster.element].zh}）`,
        118,
        922
      );

      ctx.fillStyle = '#62766E';
      ctx.font = '500 20px "Noto Serif TC", sans-serif';
      ctx.fillText(
        `起運約 ${result.startingAge} 歲  ·  大運${result.fortuneDirection === 'forward' ? '順行' : '逆行'}`,
        118,
        958
      );

      ctx.fillStyle = '#2F453D';
      ctx.font = '400 22px "Noto Serif TC", serif';
      wrapText(
        ctx,
        `${result.dayMaster.nature}。日主乃命局之樞紐，察其旺衰調候，方知進退之道。`,
        118,
        1002,
        gridW - 68,
        34
      );

      // 7. Five Elements Strength Bar Visualization
      drawRoundedRect(ctx, 84, 1106, gridW, 178, 14);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#E2DAC8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#1C3831';
      ctx.font = '600 22px "Noto Serif TC", serif';
      ctx.fillText('五行形勢強弱分佈', 118, 1150);

      const elems: FiveElement[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
      let barX = 118;
      const barW = gridW - 68;
      const barY = 1174;
      const barH = 26;

      elems.forEach(el => {
        const pct = result.elementPercentages[el];
        const segW = (barW * pct) / 100;
        ctx.fillStyle = ELEMENT_META[el].color;
        ctx.fillRect(barX, barY, segW, barH);
        barX += segW;
      });

      const colStep = barW / 5;
      ctx.textAlign = 'center';
      elems.forEach((el, idx) => {
        const cx = 118 + colStep * idx + colStep / 2;
        ctx.fillStyle = ELEMENT_META[el].color;
        ctx.font = '700 22px "Noto Serif TC", sans-serif';
        ctx.fillText(`${ELEMENT_META[el].zh} ${result.elementPercentages[el]}%`, cx, 1244);
      });

      // 8. Harmonizing Color Suggestion
      drawRoundedRect(ctx, 84, 1312, gridW, 128, 14);
      ctx.fillStyle = '#FAF7F0';
      ctx.fill();
      ctx.strokeStyle = '#DFD5C0';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      drawRoundedRect(ctx, 118, 1340, 72, 72, 10);
      ctx.fillStyle = result.luckyColor.hex;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#1C3831';
      ctx.font = '600 23px "Noto Serif TC", serif';
      ctx.fillText(`先天五行相生應色：${result.luckyColor.name}`, 212, 1368);

      ctx.fillStyle = '#53675F';
      ctx.font = '400 21px "Noto Serif TC", serif';
      ctx.fillText(result.luckyColor.desc, 212, 1406);

      // 9. Footer & Cinnabar Seal ("STONE 原創")
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6B7D76';
      ctx.font = '500 20px "Noto Serif TC", sans-serif';
      ctx.fillText('https://zhao-wu.com  ·  Australia/Sydney 天時錨定', 84, 1506);

      // Cinnabar red seal
      drawRoundedRect(ctx, width - 246, 1468, 162, 54, 6);
      ctx.fillStyle = '#A3372E';
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FBF9F4';
      ctx.font = '700 22px "Noto Serif TC", serif';
      ctx.fillText('STONE 原創', width - 165, 1503);

      setImageUrl(canvas.toDataURL('image/png'));
    };

    renderCard();

    return () => {
      cancelled = true;
    };
  }, [open, result, cityName]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="昭梧八字命造分享圖預覽"
    >
      <div className="bg-[#FBF9F4] border border-[#D9CEB8] rounded-2xl max-w-md w-full max-h-[92vh] flex flex-col shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#E5DCC9] flex items-center justify-between bg-[#F5EFE4]">
          <div className="flex items-center gap-2 text-sm font-song font-semibold text-[#142A24]">
            <Sparkles className="w-4 h-4 text-[#A3372E]" />
            <span>昭梧先天命造分享圖</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-md flex items-center justify-center text-[#5A6D65] hover:text-[#142A24] hover:bg-[#EAE1CF] transition-colors"
            aria-label="關閉預覽"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Preview Area */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#EFE9DC]">
          <canvas ref={canvasRef} className="hidden" />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="昭梧八字命造分享圖預覽"
              className="w-full max-w-[300px] aspect-[9/16] rounded-lg shadow-md border border-[#D4C7AE] object-contain bg-[#FBF9F4]"
            />
          ) : (
            <div className="w-full max-w-[300px] aspect-[9/16] rounded-lg bg-[#FBF9F4] border border-[#E2DAC8] flex items-center justify-center text-xs text-[#6B7D76] font-song">
              正在繪製宣紙命造圖...
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-4 border-t border-[#E5DCC9] bg-[#FBF9F4] flex items-center gap-3">
          <a
            href={imageUrl || '#'}
            download={`zhaowu-bazi-${result.dayPillar.stem}${result.dayPillar.branch}.png`}
            aria-disabled={!imageUrl}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-md bg-[#1C3831] hover:bg-[#122822] text-[#FBF9F4] text-sm font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>下載分享圖 (PNG)</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2.5 rounded-md border border-[#D5CBB5] bg-[#FAF7F0] hover:bg-[#EFE9DC] text-[#24423A] text-sm font-medium transition-colors whitespace-nowrap"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
