/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent } from 'react';
import { BookOpen, Award, Compass, Milestone, Sparkles, Upload, RotateCcw, Brain, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_DATA } from '../data';

export default function About() {
  const candidates = [
    '/about-tong-an.jpg',
    '/about-tong-an.png',
    '/about-tong-an.jpeg',
    '/about-tong-an.webp',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
  ];
  const [candidateIndex, setCandidateIndex] = useState(0);

  // Load from localStorage or try candidate path
  const [imageSrc, setImageSrc] = useState<string>(() => {
    return localStorage.getItem('about_portrait') || candidates[0];
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('about_portrait', base64String);
        setImageSrc(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    localStorage.removeItem('about_portrait');
    setCandidateIndex(0);
    setImageSrc(candidates[0]);
  };

  return (
    <section id="ve-an" className="py-24 bg-[#FAF6F0] relative overflow-hidden">
      {/* Decorative red/gold glowing shapes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#A82222]/5 rounded-full blur-2xl -translate-y-1/2 -ml-40 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-[#C59B27]/5 rounded-full blur-xl -mr-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Column Left: Visual Story Card & Editing Notes */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative">
              {/* Main Photo Card with Interactive Uploader */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-[#EADFC9] p-4 group/img">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-[#EADFC9]/50">
                  <img
                    src={imageSrc}
                    onError={() => {
                      if (!imageSrc.startsWith('data:image')) {
                        if (candidateIndex < candidates.length - 1) {
                          const nextIndex = candidateIndex + 1;
                          setCandidateIndex(nextIndex);
                          setImageSrc(candidates[nextIndex]);
                        }
                      }
                    }}
                    alt="Cozy aesthetic workspace flatlay with laptop, notebook and coffee"
                    className="w-full h-full object-cover filter sepia-[5%] group-hover/img:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Upload Image Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3 z-20">
                    <label
                      htmlFor="about-upload-hover"
                      className="cursor-pointer px-4 py-2 bg-white text-stone-800 rounded-full font-bold text-xs hover:bg-[#FAF8F5] transition-colors shadow-lg flex items-center space-x-1.5"
                    >
                      <Upload className="w-4 h-4 text-[#A82222]" />
                      <span>Tải ảnh của chị lên</span>
                    </label>
                    
                    {(imageSrc.startsWith('data:image') || imageSrc !== candidates[candidates.length - 1]) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetImage();
                        }}
                        className="px-3 py-1 bg-black/60 text-white rounded-full text-[10px] hover:bg-black/80 transition-colors border border-white/20 flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Khôi phục ảnh mặc định</span>
                      </button>
                    )}
                  </div>

                  {/* Overlay text block */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E2522]/80 via-transparent to-transparent flex items-end p-6 pointer-events-none z-10">
                    <div className="text-white">
                      <p className="text-[#C59B27] text-xs font-semibold uppercase tracking-wider mb-1">Phương châm làm nghề</p>
                      <h4 className="text-lg font-sans font-bold leading-tight">"Trao giá trị chân thành, gặt hái thương hiệu bền vững."</h4>
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  id="about-upload-hover"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Backing decorative shapes */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#EADFC9]/40 rounded-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#A82222]/10 rounded-full blur-md -z-10" />
            </div>


          </div>

          {/* Column Right: Conversational copy & transformation story */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header portion */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A82222] block">
                Người Đồng Hành Tâm Huyết
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#2E2522]">
                {ABOUT_DATA.intro}
              </h2>
              <div className="h-[3px] w-20 bg-[#C59B27] rounded-full" />
            </div>

            {/* Conversation Core Copy */}
            <div className="space-y-6 text-[#3E322E] leading-relaxed text-lg font-normal">
              {ABOUT_DATA.storyBody.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Section 4: Câu chuyện chuyển hóa */}
            <div className="pt-8 border-t border-[#EADFC9]/60 space-y-6">
              <div className="flex items-center space-x-2 text-[#A82222]">
                <Milestone className="w-5 h-5" />
                <h3 className="text-xl font-sans font-bold text-[#2E2522]">Câu chuyện chuyển hóa</h3>
              </div>

              <div className="p-6 rounded-2xl bg-[#F6F0E5] border border-[#EADFC9]/80 relative shadow-2xs">
                <p className="text-[#2E2522] italic leading-relaxed text-base font-normal">
                  “Mình còn nhớ như in những ngày đầu bước chân vào thế giới số. Nhìn người khác ra video triệu view, có đơn hàng nổ liên tục, mình vừa khát khao vừa vô cùng mông lung. Tự quay video thì ngượng ngùng, viết kịch bản thì khô khan, lại bế tắc ý tưởng. Mọi thứ thay đổi hoàn toàn khi mình ngừng chạy theo các trào lưu bề nổi để tập trung vào định vị giá trị cốt lõi, đồng thời tối ưu hóa 80% thời gian nhờ công nghệ AI. Từ một người hay loay hoay, mình đã đúc kết được lộ trình xây kênh bài bản, chuyển hóa kênh cá nhân thành một tài sản bán hàng thực thụ mà không hề mất đi bản sắc cá nhân.”
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-[#A82222] font-semibold">
                  <span>— Một chia sẻ từ Tống An</span>
                </div>
              </div>

              {/* Professional values summary grids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-xs border border-[#EADFC9]/40">
                  <div className="p-2 rounded-lg bg-[#A82222]/10 text-[#A82222]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-[#2E2522]">Định hướng cá nhân hóa</h5>
                    <p className="text-sm text-[#4A3C38] mt-0.5 font-normal">Không sao chép rập khuôn, tìm phong cách độc bản cho bạn.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-xs border border-[#EADFC9]/40">
                  <div className="p-2 rounded-lg bg-[#C59B27]/10 text-[#C59B27]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-[#2E2522]">Ứng dụng AI đơn giản</h5>
                    <p className="text-sm text-[#4A3C38] mt-0.5 font-normal">Hướng dẫn dễ hiểu, thực chiến, không rườm rà công nghệ.</p>
                  </div>
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
