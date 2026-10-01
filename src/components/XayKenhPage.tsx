/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Edit3, Check, AlertTriangle, RefreshCw, Globe } from 'lucide-react';

interface XayKenhPageProps {
  onBackToHome: () => void;
}

export default function XayKenhPage({ onBackToHome }: XayKenhPageProps) {
  // Default valid URL candidates
  const fallbackVercelUrl = 'https://t-ng-an.vercel.app';
  const sharedAppUrl = 'https://ais-pre-ulaf27rtlketptpbc33dqj-81801136103.asia-southeast1.run.app';
  
  const [iframeUrl, setIframeUrl] = useState<string>(() => {
    const saved = localStorage.getItem('xaykenh_iframe_url');
    // If saved is the broken ai.studio link or empty, clean it up
    if (!saved || saved.includes('.ai.studio') || saved === 'https://tonganxaykenh.com') {
      return fallbackVercelUrl;
    }
    return saved;
  });

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(iframeUrl);

  const isInvalidAiStudioUrl = iframeUrl.includes('.ai.studio') && !iframeUrl.includes('.run.app');

  useEffect(() => {
    setTempUrl(iframeUrl);
  }, [iframeUrl]);

  const handleSaveUrl = (urlToSave?: string) => {
    let formatted = (urlToSave || tempUrl).trim();
    if (formatted && !formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = 'https://' + formatted;
    }
    setIframeUrl(formatted);
    localStorage.setItem('xaykenh_iframe_url', formatted);
    setIsEditingUrl(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1A1A1A] text-white">
      {/* Top navigation bar for the /xay-kenh page */}
      <div className="bg-[#2D2A26] border-b border-[#3D3833] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm shrink-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#A82222] hover:bg-[#8B1A1A] text-white font-medium text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </button>
          <div className="h-4 w-[1px] bg-[#4A443E]" />
          <span className="font-semibold text-[#E6C665] text-xs sm:text-sm flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#C59B27]" />
            Trang /xay-kenh
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isEditingUrl ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <input
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="Nhập link App URL (ví dụ: https://t-ng-an.vercel.app)..."
                className="bg-[#1A1A1A] border border-[#C59B27] text-white px-2.5 py-1 rounded text-xs w-64 sm:w-96 focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
              />
              <button
                onClick={() => handleSaveUrl()}
                className="inline-flex items-center gap-1 bg-[#C59B27] text-black font-bold px-3 py-1 rounded text-xs hover:bg-[#D4AC38] transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Cập nhật
              </button>
              <button
                onClick={() => setIsEditingUrl(false)}
                className="px-2 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 text-gray-200"
              >
                Hủy
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 bg-[#1A1A1A] px-2.5 py-1 rounded border border-[#3D3833] max-w-[240px] sm:max-w-[360px] truncate" title={iframeUrl}>
                {iframeUrl}
              </span>
              <button
                onClick={() => setIsEditingUrl(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C59B27] hover:bg-[#D4AC38] text-black font-semibold text-xs transition-colors cursor-pointer"
                title="Thay đổi link URL hiển thị"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Đổi Link
              </button>
              <a
                href={iframeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded bg-[#3A3530] hover:bg-[#4A443E] text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Mở link này trong tab mới"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Warning banner if the user entered an invalid *.ai.studio domain */}
      {isInvalidAiStudioUrl && (
        <div className="bg-[#3B1717] border-b border-[#7F1D1D] px-4 py-3 text-red-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <strong>Lỗi địa chỉ Web:</strong> Link <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">{iframeUrl}</code> là tên miền chưa đúng định dạng trang web nên Google AI Studio báo <strong>404 Page not found</strong>.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSaveUrl(fallbackVercelUrl)}
              className="px-3 py-1 bg-[#A82222] hover:bg-[#8B1A1A] text-white font-medium rounded text-xs transition-colors cursor-pointer"
            >
              Dùng link Vercel ({fallbackVercelUrl})
            </button>
            <button
              onClick={() => handleSaveUrl(sharedAppUrl)}
              className="px-3 py-1 bg-[#2D2A26] hover:bg-[#3D3833] text-amber-300 font-medium rounded text-xs border border-[#C59B27]/40 transition-colors cursor-pointer"
            >
              Dùng link App trực tiếp
            </button>
          </div>
        </div>
      )}

      {/* Main Iframe container */}
      <div className="flex-1 w-full h-[calc(100vh-50px)] overflow-hidden bg-black relative">
        <iframe
          key={iframeUrl}
          src={iframeUrl}
          className="w-full h-full border-none"
          title="Trang Xây Kênh"
          allow="camera; microphone; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}

