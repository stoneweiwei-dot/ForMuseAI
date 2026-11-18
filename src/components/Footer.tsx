import { useI18n } from '../utils/i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#FAF7F0] border-t border-[#E8E1D1] py-12 text-[#5A6D65] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#EBE4D5] pb-8">
          {/* Brand & Mission */}
          <div className="space-y-1.5">
            <div className="text-base font-brand font-semibold text-[#142A24] tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-[#A3372E] rounded-xs transform rotate-45 inline-block"></span>
              昭梧 ZHAOWU
            </div>
            <p className="text-xs text-[#52665E] font-song">
              讓天時有形，讓命理可讀 · 遵古法真太陽時與宋代天文學脈
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#445851]">
            <a href="#bazi-calculator" className="hover:text-[#142A24] transition-colors">{t.navBazi}</a>
            <a href="#daily-guidance" className="hover:text-[#142A24] transition-colors">{t.navDaily}</a>
            <a href="#five-elements" className="hover:text-[#142A24] transition-colors">{t.navColors}</a>
            <a href="#ten-chapters" className="hover:text-[#142A24] transition-colors">{t.navChapters}</a>
            <a href="#knowledge-base" className="hover:text-[#142A24] transition-colors">{t.navKnowledge}</a>
            <a href="#depth-report" className="hover:text-[#142A24] transition-colors">{t.navReport}</a>
          </div>
        </div>

        {/* Quiet Meta & Attribution */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#758981] font-song">
          <div className="space-y-1">
            <div>© {new Date().getFullYear()} 昭梧 ZHAOWU · 版權所有</div>
            <div className="text-[11px] text-[#869991]">
              天時基準依據 Australia/Sydney 經緯度與太陽均時差精密測定
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="border border-[#D9D0BD] px-2.5 py-1 rounded text-[11px] font-song text-[#1C3831] bg-[#F5EFE4]">
              STONE 原創
            </span>
            <span className="text-[11px]">https://zhao-wu.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
