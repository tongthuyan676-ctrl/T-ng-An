/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onScrollTo, onOpenAdmin }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="bg-[#2E2522] text-white pt-16 pb-12 relative overflow-hidden border-t border-[#4E3F3B]">
      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#A82222]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#4E3F3B]">
          
          {/* Logo & Brand Bio columns */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-sans font-bold tracking-widest text-[#FAF6F0]">
              TỐNG AN<span className="text-[#C59B27] font-serif">.</span>
            </h3>
            
            <p className="text-sm text-[#C4B4B0] font-light leading-relaxed max-w-sm">
              Đồng hành thực chiến giúp cá nhân, giáo viên và chủ kinh doanh xây dựng nhân hiệu vững chãi, ứng dụng sức mạnh công nghệ AI để tối ưu quy trình sáng tạo và bùng nổ doanh số bán hàng tự nhiên.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#C59B27] font-medium bg-[#3E312D] border border-[#4E3F3B] w-fit px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Đại diện phong cách xây kênh bền vững</span>
            </div>
          </div>

          {/* Quick Navigation column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FAF6F0] border-l-2 border-[#C59B27] pl-2.5">
              Khám Phá Nhanh
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C4B4B0] font-light">
              <li>
                <button
                  onClick={() => onScrollTo('ve-an')}
                  className="hover:text-[#C59B27] transition-colors cursor-pointer text-left"
                >
                  Câu chuyện thương hiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('dich-vu')}
                  className="hover:text-[#C59B27] transition-colors cursor-pointer text-left"
                >
                  Dịch vụ & Khóa học AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('qua-tang')}
                  className="hover:text-[#C59B27] transition-colors cursor-pointer text-left"
                >
                  Tài nguyên quà tặng PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Business Hours & Policy column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FAF6F0] border-l-2 border-[#A82222] pl-2.5">
              May đo Chiến Lược
            </h4>
            <p className="text-sm text-[#C4B4B0] font-light leading-relaxed">
              Các chương trình đồng hành của An được thiết kế riêng nhằm tôn vinh giá trị chân thật nhất từ sản phẩm và nhân hiệu độc bản của riêng bạn.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onScrollTo('lien-he')}
                className="inline-flex items-center text-xs font-bold text-[#C59B27] hover:text-[#FAF6F0] transition-colors cursor-pointer"
              >
                Nhận tư vấn thiết lập phễu tự động ➔
              </button>
            </div>
          </div>

        </div>

        {/* Legal copyrights bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8A86] font-light">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {currentYear} TỐNG AN – Xây kênh online bền vững</p>
            <span className="hidden sm:inline text-stone-600">|</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-[#C59B27]/80 hover:text-[#C59B27] font-semibold transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              Trang Quản Trị
            </button>
          </div>
          
          <div className="flex items-center space-x-1.5">
            <span>Thiết kế dành tặng riêng cho Tống An</span>
            <Heart className="w-3 h-3 text-[#C59B27] fill-[#C59B27]" />
            <span>tại tonganxaykenh.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
