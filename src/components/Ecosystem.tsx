/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Youtube, Globe, MessageSquare, ExternalLink, Compass } from 'lucide-react';
import { SOCIAL_CHANNELS } from '../data';

export default function Ecosystem() {
  // Helper to render platform-specific brand icons
  const renderPlatformIcon = (platform: string) => {
    const sizeClasses = "w-5 h-5";
    switch (platform) {
      case 'facebook':
        return <Facebook className={`${sizeClasses} text-[#1877F2]`} />;
      case 'tiktok':
        return (
          <span className="font-extrabold text-xs text-black tracking-tighter bg-white px-1.5 py-0.5 rounded border border-stone-200">
            TikTok
          </span>
        );
      case 'youtube':
        return <Youtube className={`${sizeClasses} text-[#FF0000]`} />;
      case 'zalo':
        return <MessageSquare className={`${sizeClasses} text-[#0068FF]`} />;
      case 'website':
        return <Globe className={`${sizeClasses} text-[#A82222]`} />;
      default:
        return <Compass className={sizeClasses} />;
    }
  };

  // Helper to color borders or backgrounds subtly
  const getPlatformColors = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return 'hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5';
      case 'tiktok':
        return 'hover:border-black/40 hover:bg-black/5';
      case 'youtube':
        return 'hover:border-[#FF0000]/40 hover:bg-[#FF0000]/5';
      case 'zalo':
        return 'hover:border-[#0068FF]/50 hover:bg-[#0068FF]/5';
      case 'website':
        return 'hover:border-[#A82222]/50 hover:bg-[#A82222]/5';
      default:
        return 'hover:border-[#C59B27]/50 hover:bg-[#C59B27]/5';
    }
  };

  return (
    <section className="py-24 bg-[#FCFAF7] relative overflow-hidden border-t border-[#EADFC9]/30">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#EADFC9] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] px-3 py-1 bg-[#F3ECE0] rounded-full inline-block">
            Kết Nối Đa Kênh
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#2E2522]">
            Hệ sinh thái nội dung của Tống An
          </h2>
          <p className="text-[#5C4D49] text-base font-light leading-relaxed">
            Nơi An chia sẻ kiến thức thực chiến mỗi ngày hoàn toàn miễn phí. Hãy bấm theo dõi các kênh truyền thông dưới đây để không bỏ lỡ các tài liệu và bài viết mới nhất nhé!
          </p>
        </div>

        {/* 4 columns responsive flex/grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SOCIAL_CHANNELS.map((channel, idx) => (
            <a
              key={idx}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white rounded-2xl p-6 border border-[#EADFC9]/60 shadow-xs flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${getPlatformColors(
                channel.platform
              )}`}
            >
              <div className="space-y-4">
                {/* Platform Icon & Label */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EADFC9]/40 flex items-center justify-center">
                    {renderPlatformIcon(channel.platform)}
                  </div>
                  
                  {/* Link Status Badge */}
                  <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] border border-[#C8E6C9] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
                    Chính thức
                  </span>
                </div>
 
                {/* Name & Handle */}
                <div>
                  <h3 className="font-bold text-sm text-[#2E2522] group-hover:text-[#C59B27] transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-[#5C4D49] font-medium mt-0.5">
                    {channel.handle}
                  </p>
                </div>
 
                {/* Short Description */}
                <p className="text-[11px] text-[#5C4D49] font-light leading-relaxed">
                  {channel.description}
                </p>
              </div>
 
              {/* Action trigger */}
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#5C4D49] group-hover:text-[#A82222] transition-colors">
                <span>Ghé thăm kênh</span>
                <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
 
        {/* Floating Ecosystem Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#5C4D49] font-medium bg-[#FAF6F0] border border-[#EADFC9]/50 inline-block px-4 py-2 rounded-full">
            ✨ Hệ sinh thái đa kênh chính thức của Tống An đã được kết nối đầy đủ!
          </p>
        </div>

      </div>
    </section>
  );
}
