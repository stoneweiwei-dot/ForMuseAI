import { useState } from 'react';
import { useI18n } from '../utils/i18n';
import { ShieldCheck, Award, FileText, CheckCircle, Send } from 'lucide-react';

export default function ReportConsultation() {
  const { t } = useI18n();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="depth-report" className="py-12 lg:py-16 bg-[#F6F1E7] border-b border-[#E5DDCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#70847C] font-semibold mb-1">
            BESPOKE ONE-TIME DESTINY DOSSIER
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-song font-semibold text-[#142A24]">
            {t.reportTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4E625A] font-song">
            {t.reportSubtitle}
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="bg-[#FFFFFF] border border-[#E0D7C4] rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto shadow-sm">
          {/* Trust Banner (Unboxed metadata) */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#5C7068] border-b border-[#EFE8D8] pb-5 mb-8 text-center">
            <span className="font-semibold text-[#1C3831]">{t.reportNotice}</span>
            <span aria-hidden="true">·</span>
            <span>人工精校與天文算法雙核驅動</span>
            <span aria-hidden="true">·</span>
            <span>PDF 宣紙排版終生交付</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EFE8D8] text-[#1C3831] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-song font-bold text-[#142A24]">十篇章完整剖析</h4>
              <p className="text-xs text-[#52665E] font-song leading-relaxed">
                {t.reportFeature1}，自先天原局至各步大運，不漏絲毫關鍵歲月。
              </p>
            </div>

            <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EFE8D8] text-[#1C3831] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-song font-bold text-[#142A24]">事業財帛婚姻專論</h4>
              <p className="text-xs text-[#52665E] font-song leading-relaxed">
                {t.reportFeature2}，為關鍵選擇提供清晰的時機判斷與避坑指南。
              </p>
            </div>

            <div className="bg-[#FAF8F2] border border-[#EBE4D5] rounded-xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EFE8D8] text-[#1C3831] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-song font-bold text-[#142A24]">五行身心與色彩</h4>
              <p className="text-xs text-[#52665E] font-song leading-relaxed">
                {t.reportFeature3}，將命學哲思落實於日常生活穿著與空間氣場。
              </p>
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-[#70847C] font-mono">一次性訂購 · 無任何後續自動扣款</div>
              <div className="text-2xl sm:text-3xl font-song font-bold text-[#142A24]">
                昭梧典藏級命書報告
              </div>
              <p className="text-xs text-[#52665E] font-song">
                交付約 50–60 頁宋式宣紙典雅編排 PDF，永久可讀
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="min-h-[48px] px-8 py-3.5 rounded-md bg-[#1C3831] hover:bg-[#122822] text-[#FBF9F4] text-sm font-medium transition-colors shadow-xs shrink-0 whitespace-nowrap"
            >
              {t.btnBookReport}
            </button>
          </div>

        </div>

      </div>

      {/* Inquiry / Reservation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#DFD6C2] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => { setModalOpen(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-[#8C9C95] hover:text-[#1C3831] w-8 h-8 flex items-center justify-center text-lg rounded-md"
              aria-label="關閉視窗"
            >
              ✕
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#8C7A62]">BESPOKE ENQUIRY</div>
                  <h3 className="text-xl font-song font-bold text-[#142A24]">
                    預約了解昭梧深度命書範例
                  </h3>
                  <p className="text-xs text-[#5C7068] font-song">
                    留下您的聯絡信箱，昭梧將寄送《命書十篇章精選範例》及詳細客製流程說明。
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#304840] mb-1">
                    電子信箱 (Email)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-11 px-3 text-sm bg-[#FAF8F2] border border-[#DCD2BF] rounded-md text-[#19322A] focus:outline-none focus:border-[#1C3831]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#304840] mb-1">
                    諮詢備註或關注維度（可選填）
                  </label>
                  <textarea
                    rows={3}
                    placeholder="例：想特別了解未來三年之事業轉折或大運交接..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full p-3 text-sm bg-[#FAF8F2] border border-[#DCD2BF] rounded-md text-[#19322A] focus:outline-none focus:border-[#1C3831]"
                  />
                </div>

                <div className="text-[11px] text-[#71857D] font-song">
                  * 昭梧恪守嚴格個人資料隱私保密協議，絕不對外洩露或轉交第三方。
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[46px] rounded-md bg-[#1C3831] hover:bg-[#122822] text-[#FBF9F4] text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>發送諮詢申請</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EBF3EF] text-[#235848] mx-auto flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-song font-bold text-[#142A24]">
                  申請已收到
                </h3>
                <p className="text-xs sm:text-sm text-[#4E625A] font-song">
                  昭梧專案助理將在 24 小時內將命書範例與說明寄送至 <span className="font-mono font-semibold text-[#1C3831]">{email}</span>。
                </p>
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setSubmitted(false); }}
                  className="mt-4 px-6 py-2.5 rounded-md bg-[#FAF8F2] border border-[#DCD2BF] text-xs font-semibold text-[#1C3831] hover:bg-[#EFE9DC]"
                >
                  返回瀏覽
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
