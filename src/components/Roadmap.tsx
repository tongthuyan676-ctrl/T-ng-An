/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Award } from 'lucide-react';
import { ROADMAP_STEPS } from '../data';

export default function Roadmap() {
  return (
    <section id="lo-trinh" className="py-24 bg-[#FAF6F0] relative overflow-hidden">
      {/* Abstract Background patterns */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#A82222]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A82222] px-3 py-1 bg-[#FBEAEA] rounded-full inline-block">
            Bản Đồ Thành Công
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#2E2522]">
            Lộ trình 5 bước đồng hành cùng Tống An
          </h2>
          <p className="text-[#5C4D49] text-base font-light leading-relaxed">
            Đi từng bước vững chắc từ tư duy định vị cho đến khi thiết lập quy trình chuyển đổi số tự động bằng công cụ AI. An đồng hành gỡ rối cùng bạn ở mỗi cột mốc.
          </p>
        </div>

        {/* Timeline Roadmap Flow */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical central path line for Desktop */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#C59B27] via-[#A82222] to-[#C59B27]/40 transform md:-translate-x-1/2 z-0 hidden sm:block" />

          {/* List of Steps */}
          <div className="space-y-12 relative z-10">
            {ROADMAP_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Space Holder for layout balance on opposite side (Desktop only) */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Bullet Indicator on the line */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#C59B27] shadow-md transform md:-translate-x-1/2 flex items-center justify-center z-20 text-xs font-bold text-[#2E2522] hidden sm:flex">
                    {step.step}
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 sm:pl-12 md:pl-0 md:px-8">
                    <div className="bg-white rounded-3xl p-8 border border-[#EADFC9]/60 shadow-sm hover:shadow-md transition-all duration-300 relative group hover:border-[#C59B27]/50">
                      
                      {/* Step badge for Mobile & Desktop visual accent */}
                      <div className="absolute -top-4 left-6 px-4 py-1 rounded-full bg-gradient-to-r from-[#C59B27] to-[#B38F30] text-white text-xs font-bold shadow-xs">
                        BƯỚC {step.step}
                      </div>

                      <div className="space-y-4 pt-2">
                        <h3 className="text-xl font-bold text-[#2E2522] group-hover:text-[#C59B27] transition-colors duration-200">
                          {step.title}
                        </h3>
                        
                        <p className="text-sm text-[#5C4D49] font-medium leading-relaxed">
                          {step.description}
                        </p>

                        {/* Details checklist inside card */}
                        <div className="pt-4 border-t border-stone-100 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A82222]">Nội dung thực hiện:</h4>
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-xs text-[#5C4D49]">
                                <CheckCircle2 className="w-4 h-4 text-[#A82222] mr-2 shrink-0 mt-0.5" />
                                <span className="font-light">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Closing dynamic callout */}
        <div className="mt-20 max-w-2xl mx-auto rounded-3xl bg-[#A82222] text-white p-8 text-center space-y-4 shadow-lg relative overflow-hidden">
          {/* subtle leaf background pattern */}
          <div className="absolute -right-8 -bottom-8 opacity-10 text-white pointer-events-none transform rotate-12">
            <Award className="w-40 h-40" />
          </div>
          
          <h3 className="text-xl font-bold">Cam kết từ Tống An</h3>
          <p className="text-sm text-[#FDF2F2] leading-relaxed font-light">
            “An không đào tạo lý thuyết suông. Lộ trình này được thiết kế để bạn áp dụng trực tiếp lên chính thương hiệu cá nhân của mình, vừa học vừa làm để tạo ra kết quả chuyển đổi thực tế.”
          </p>
        </div>

      </div>
    </section>
  );
}
