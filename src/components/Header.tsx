import { useState } from 'react';
import { useI18n } from '../utils/i18n';
import { SupportedLanguage } from '../types';
import { Globe, Menu, X } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#bazi-calculator', label: t.navBazi },
    { href: '#daily-guidance', label: t.navDaily },
    { href: '#five-elements', label: t.navColors },
    { href: '#ten-chapters', label: t.navChapters },
    { href: '#knowledge-base', label: t.navKnowledge }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#E8E1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Wordmark */}
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-brand font-semibold text-[#162E27] tracking-wider whitespace-nowrap shrink-0"
          >
            <span className="w-2.5 h-2.5 bg-[#A3372E] rounded-sm transform rotate-45 inline-block mr-1"></span>
            昭梧 ZHAOWU
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#41534D]">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#162E27] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Segmented Selector & Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Segmented Control - Default is zh-TW */}
            <div
              className="flex items-center p-0.5 bg-[#EFE9DC] border border-[#DDD4C0] rounded-md text-xs font-medium"
              role="group"
              aria-label="語言切換"
            >
              {(
                [
                  { code: 'zh-TW', label: '繁體' },
                  { code: 'zh-CN', label: '简体' },
                  { code: 'en', label: 'EN' }
                ] as { code: SupportedLanguage; label: string }[]
              ).map(item => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`min-h-[36px] px-2.5 py-1 rounded transition-colors ${
                    language === item.code
                      ? 'bg-[#1C3831] text-[#FBF9F4] shadow-xs font-semibold'
                      : 'text-[#4A5D57] hover:text-[#1C3831]'
                  }`}
                  aria-pressed={language === item.code}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle Button (Touch target >= 44px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-[#1C3831] hover:bg-[#EFE9DC] transition-colors"
              aria-label="開啟選單"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D1] bg-[#FBF9F4] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-[#162E27] rounded-md hover:bg-[#EFE9DC] active:bg-[#E2DAC8] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E8E1D1]">
            <a
              href="#depth-report"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 px-4 rounded-md bg-[#1C3831] text-[#FBF9F4] font-medium text-sm"
            >
              {t.navReport}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
