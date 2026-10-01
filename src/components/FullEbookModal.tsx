/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  BookOpen, 
  Check, 
  Copy, 
  ChevronRight, 
  MessageSquare,
  Sparkles,
  Award
} from 'lucide-react';
import { EBOOK_CHAPTERS, FULL_EBOOK_INFO } from '../data/ebookData';

interface FullEbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerName?: string;
}

export default function FullEbookModal({ isOpen, onClose, buyerName }: FullEbookModalProps) {
  const [activeChapterId, setActiveChapterId] = useState<string>('loi-noi-dau');
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentChapter = EBOOK_CHAPTERS.find(c => c.id === activeChapterId) || EBOOK_CHAPTERS[0];

  const handleCopyPrompt = (promptText: string, key: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptIndex(key);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  const handlePrintOrDownload = () => {
    window.open(FULL_EBOOK_INFO.downloadPdfPath, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-5xl h-[92vh] rounded-3xl shadow-2xl border border-[#EADFC9] flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="bg-[#2D2A26] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-[#3D3833]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C59B27] text-black flex items-center justify-center font-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#E6C665] bg-black/40 px-2 py-0.5 rounded border border-[#C59B27]/40 uppercase tracking-wider">
                  Bản Đầy Đủ 38 Trang
                </span>
                {buyerName && (
                  <span className="text-xs text-stone-300">
                    Dành cho: <strong>{buyerName}</strong>
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight mt-0.5">
                {FULL_EBOOK_INFO.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintOrDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              title="Mở bản in và lưu file PDF 38 trang"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Tải / Lưu File PDF</span>
              <span className="sm:hidden">Tải PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content: Sidebar Table of Contents + Chapter Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Table of Contents Sidebar */}
          <div className="w-full md:w-72 bg-white border-r border-[#EADFC9] p-4 flex flex-col shrink-0 overflow-y-auto max-h-48 md:max-h-full">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#C59B27]" />
              Mục Lục Cẩm Nang
            </div>
            <div className="space-y-1.5 flex-1">
              {EBOOK_CHAPTERS.map((chap, idx) => {
                const isActive = chap.id === activeChapterId;
                return (
                  <button
                    key={chap.id}
                    onClick={() => setActiveChapterId(chap.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isActive 
                        ? 'bg-[#FBEAEA] text-[#A82222] font-bold border border-[#F5CACA] shadow-2xs' 
                        : 'text-[#5C4D49] hover:bg-stone-50 hover:text-[#2E2522]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-stone-400 block font-mono">
                        {idx === 0 ? 'Mở đầu' : idx === EBOOK_CHAPTERS.length - 1 ? 'Phụ lục' : `Chương ${idx}`}
                      </span>
                      <span className="line-clamp-2 leading-snug">{chap.title}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-[#A82222] shrink-0 mt-2" />}
                  </button>
                );
              })}
            </div>

            {/* Quick Links in sidebar */}
            <div className="pt-4 mt-4 border-t border-[#EADFC9]/60 space-y-2">
              <a
                href={FULL_EBOOK_INFO.googleSheetsUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-[11px] font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Mở Google Sheets Master
              </a>
              <a
                href={FULL_EBOOK_INFO.zaloCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0068FF]/10 hover:bg-[#0068FF]/20 text-[#0068FF] border border-[#0068FF]/30 rounded-xl text-[11px] font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Tham Gia Nhóm Zalo
              </a>
            </div>
          </div>

          {/* Right Main Chapter Reader View */}
          <div className="flex-1 bg-[#FCFAF7] p-6 sm:p-10 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Chapter Header */}
              <div className="border-b border-[#EADFC9] pb-5 space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#A82222] bg-[#FBEAEA] px-2.5 py-0.5 rounded uppercase">
                  {currentChapter.id === 'loi-noi-dau' ? 'LỜI MỞ ĐẦU' : currentChapter.id === 'phu-luc' ? 'TÀI LIỆU ĐÍNH KÈM' : 'NỘI DUNG CHÍNH'}
                </span>
                <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#2E2522] leading-tight">
                  {currentChapter.title}
                </h2>
                {currentChapter.subtitle && (
                  <p className="text-xs sm:text-sm text-[#C59B27] font-medium italic">
                    {currentChapter.subtitle}
                  </p>
                )}
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {currentChapter.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <h3 className="text-sm sm:text-base font-bold text-[#2E2522] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0" />
                      {section.heading}
                    </h3>

                    <div className="space-y-3 text-xs sm:text-sm text-[#3E322E] leading-relaxed">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Callouts */}
                    {section.callouts && section.callouts.map((callout, cIdx) => (
                      <div key={cIdx} className="p-4 rounded-2xl bg-[#FFFEEB] border border-[#FBE6B5] text-xs text-[#5C4D49] leading-relaxed font-medium space-y-1">
                        {callout.includes('http') ? (
                          <div className="space-y-1">
                            <div>{callout.split('http')[0]}</div>
                            <a
                              href={`http${callout.split('http')[1]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0068FF] font-bold underline break-all inline-flex items-center gap-1"
                            >
                              <span>Bấm vào đây để mở liên kết</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ) : (
                          <div>{callout}</div>
                        )}
                      </div>
                    ))}

                    {/* Copyable Prompts */}
                    {section.prompts && section.prompts.map((pItem, prIdx) => {
                      const promptKey = `${sIdx}-${prIdx}`;
                      const isCopied = copiedPromptIndex === promptKey;
                      return (
                        <div key={prIdx} className="p-4 rounded-2xl bg-[#2D2A26] border border-[#3D3833] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#E6C665] uppercase tracking-wide">
                              ⚡ {pItem.title}
                            </span>
                            <button
                              onClick={() => handleCopyPrompt(pItem.prompt, promptKey)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#E6C665] text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              {isCopied ? 'Đã sao chép prompt!' : 'Sao chép Prompt'}
                            </button>
                          </div>
                          <div className="font-mono text-[11px] sm:text-xs text-stone-200 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5 select-all">
                            &quot;{pItem.prompt}&quot;
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom Navigation between chapters */}
              <div className="pt-8 border-t border-[#EADFC9] flex items-center justify-between gap-4">
                <button
                  onClick={handlePrintOrDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Mở Bản In & Lưu PDF Đầy Đủ
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-600 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Đóng Trình Đọc
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
