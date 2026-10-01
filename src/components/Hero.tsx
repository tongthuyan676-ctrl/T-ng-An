/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent } from 'react';
import { ArrowRight, Gift, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const candidates = ['/tong-an.jpg', '/tong-an.png', '/tong-an.jpeg', '/tong-an.webp'];
  const [candidateIndex, setCandidateIndex] = useState(0);
  
  // Load from localStorage or try candidate path
  const [imageSrc, setImageSrc] = useState<string>(() => {
    return localStorage.getItem('user_portrait') || candidates[0];
  });
  const [hasError, setHasError] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('user_portrait', base64String);
        setImageSrc(base64String);
        setHasError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    localStorage.removeItem('user_portrait');
    setCandidateIndex(0);
    setImageSrc(candidates[0]);
    setHasError(false);
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-[#FCFAF7] overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EADFC9]/30 rounded-full blur-3xl -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FAF0E6]/40 rounded-full blur-3xl -ml-40 -mb-20 pointer-events-none" />
      
      {/* Tiny Sage Green Botanical Detail in BG */}
      <div className="absolute top-1/4 left-10 text-[#A82222]/5 animate-pulse pointer-events-none hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,0 C65,20 70,40 50,100 C30,40 35,20 50,0 Z" />
          <path d="M50,30 C30,45 20,60 10,70 C30,65 40,55 50,30 Z" />
          <path d="M50,30 C70,45 80,60 90,70 C70,65 60,55 50,30 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Branding / Tagline badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#F3ECE0] rounded-full border border-[#EADFC9]"
            >
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#5C4D49]">
                Xây dựng Nhân hiệu & Ứng dụng AI
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-[#2E2522] leading-tight">
                TỐNG AN<br />
                <span className="text-[#C59B27] font-montserrat font-bold italic tracking-wide">
                  Đồng hành cùng bạn
                </span><br />
                xây kênh online bền vững
              </h1>
              
              <p className="max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl text-[#3E322E] leading-relaxed font-normal">
                Ứng dụng AI, nội dung cốt lõi và chiến lược marketing để biến kênh cá nhân thành một tài sản bán hàng chân thành, hiệu quả nhất.
              </p>
            </motion.div>

            {/* Outstanding Ebook 59K Banner right inside Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => onScrollTo('ebook')}
              className="bg-white/90 backdrop-blur-xs border-2 border-[#C59B27] rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center gap-4 cursor-pointer hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all group border-dashed relative overflow-hidden text-left"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#A82222] text-white text-[9px] font-black px-3 py-1 rounded-bl-2xl uppercase tracking-wider animate-pulse shadow-sm z-10">
                ẤN PHẨM MỚI 59K
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#FBEAEA] flex items-center justify-center shrink-0 border border-[#F5CACA] group-hover:scale-110 transition-transform shadow-inner">
                <BookOpen className="w-7 h-7 text-[#A82222] animate-bounce" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-[#C59B27] uppercase tracking-widest bg-[#F3ECE0] px-2.5 py-0.5 rounded-full">ƯU ĐÃI ĐẶC BIỆT CHỈ 59K</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#2E2522] group-hover:text-[#A82222] transition-colors leading-tight">
                  Cẩm Nang Thực Chiến: Vận Hành Doanh Nghiệp 1 Người Bằng AI
                </h4>
                <p className="text-xs text-[#5C4D49] font-medium mt-1">
                  Tự động hóa 80% công việc cho nhà bán hàng vật lý + Bản đọc thử + Checklist 90 Ngày thực chiến.
                </p>
              </div>
              <div className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#A82222] group-hover:bg-[#8B1A1A] text-white text-xs font-black rounded-xl transition-all shadow-sm shrink-0 mt-2 sm:mt-0">
                <span>Nhận ngay 59K</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Call to Actions (CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => onScrollTo('lien-he')}
                className="w-full sm:w-auto inline-flex flex-col sm:flex-row items-center justify-center px-8 py-4 rounded-full bg-[#A82222] text-white hover:bg-[#8B1A1A] transition-all duration-300 text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group gap-2"
              >
                <div className="flex items-center">
                  <span>Đăng ký coaching 1-1 chỉ 199K</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[11px] font-normal opacity-90 flex items-center gap-1.5 sm:border-l sm:border-white/30 sm:pl-2">
                  <span className="line-through text-white/70">599K</span>
                  <span className="bg-[#C59B27] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">GIẢM 67%</span>
                </div>
              </button>
              
              <button
                onClick={() => onScrollTo('ebook')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#FFFDF9] text-[#A82222] hover:bg-[#FBEAEA] border-2 border-[#C59B27] hover:border-[#A82222] transition-all duration-300 text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer group gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#C59B27] group-hover:rotate-12 transition-transform" />
                <span>Ebook Solopreneur AI 59K</span>
              </button>

              <button
                onClick={() => onScrollTo('qua-tang')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#5C4D49] hover:text-[#C59B27] border-2 border-[#EADFC9] hover:border-[#C59B27] transition-all duration-300 text-base font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
              >
                <Gift className="mr-2 w-5 h-5 text-[#C59B27] group-hover:scale-110 transition-transform" />
                Nhận quà tặng miễn phí
              </button>
            </motion.div>

            {/* Quick trust social indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 border-t border-[#EADFC9]/60 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex items-center space-x-2">
                <span className="text-[#C59B27] font-bold text-lg">★</span>
                <span className="text-sm font-medium text-[#5C4D49]">Dễ dàng ứng dụng AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#A82222] font-bold text-lg">✓</span>
                <span className="text-sm font-medium text-[#5C4D49]">Đồng hành thực chiến</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#C59B27] font-bold text-lg">❤</span>
                <span className="text-sm font-medium text-[#5C4D49]">Tư duy bền vững</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Image Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Visual Frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] rounded-[2.5rem] bg-[#FAF8F5] p-3 shadow-xl border border-[#EADFC9] overflow-hidden group">
              
              {/* Internal Decorative Gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#A82222]/10 via-[#FAF8F5] to-[#C59B27]/15 z-0" />

              {/* Sage leaf outline element in corner */}
              <div className="absolute -bottom-8 -left-8 text-[#A82222]/20 pointer-events-none transform rotate-45 group-hover:scale-110 transition-transform duration-500">
                <svg width="150" height="150" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>

              {/* The Portrait Image of Tong An */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-stone-200 border border-[#EADFC9]/50 z-10 flex flex-col justify-between group/img">
                <img
                  src={imageSrc}
                  onError={() => {
                    if (!imageSrc.startsWith('data:image')) {
                      if (candidateIndex < candidates.length - 1) {
                        const nextIndex = candidateIndex + 1;
                        setCandidateIndex(nextIndex);
                        setImageSrc(candidates[nextIndex]);
                      } else if (imageSrc !== 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop') {
                        setImageSrc('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop');
                        setHasError(true);
                      }
                    }
                  }}
                  alt="Tống An - Coach Xây kênh & Ứng dụng AI"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Soft Info Box on Portrait */}
                <div className="absolute bottom-4 inset-x-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#EADFC9]/80 shadow-md flex items-center justify-between z-10">
                  <div>
                    <h4 className="text-sm font-semibold text-[#2E2522]">Tống An</h4>
                    <p className="text-xs text-[#5C4D49]">Coach xây kênh & Ứng dụng AI</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#A82222] flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                </div>
              </div>
            </div>

            {/* Aesthetic Background circle accents */}
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full border-2 border-dashed border-[#C59B27]/30 animate-spin-slow pointer-events-none" />
            <div className="absolute -bottom-4 -left-6 w-16 h-16 rounded-full border border-dashed border-[#A82222]/20 pointer-events-none" />

          </motion.div>

        </div>
      </div>
    </section>
  );
}
