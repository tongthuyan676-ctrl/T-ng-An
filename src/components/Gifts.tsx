/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ClipboardCheck, Sparkles, MessageSquareCode, Gift, CheckCircle, Mail, Phone, User, Send, MessageSquare } from 'lucide-react';
import { GIFTS } from '../data';
import { saveGiftRegistration } from '../lib/firebase';

export default function Gifts() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneZalo: '',
    selectedGift: 'all',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phoneZalo) {
      alert('Vui lòng điền đầy đủ các thông tin đăng ký nhé!');
      return;
    }

    setLoading(true);
    try {
      await saveGiftRegistration({
        fullName: formData.fullName,
        email: formData.email,
        phoneZalo: formData.phoneZalo,
        selectedGift: formData.selectedGift
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Lỗi lưu đăng ký quà tặng:', error);
      alert('Có lỗi xảy ra khi gửi thông tin đăng ký. Chị vui lòng thử lại nhé!');
    } finally {
      setLoading(false);
    }
  };

  const renderGiftIcon = (iconName: string) => {
    const classes = "w-6 h-6 text-[#C59B27]";
    switch (iconName) {
      case 'ClipboardCheck':
        return <ClipboardCheck className={classes} />;
      case 'Sparkles':
        return <Sparkles className={classes} />;
      case 'MessageSquareCode':
        return <MessageSquareCode className={classes} />;
      default:
        return <Gift className={classes} />;
    }
  };

  return (
    <section id="qua-tang" className="py-24 bg-[#FCFAF7] relative overflow-hidden border-t-2 border-[#C59B27]/40">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A82222]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C59B27]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-48 h-48 bg-[#EADFC9]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with outstanding badge */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-white px-4 py-1.5 bg-[#A82222] rounded-full inline-flex items-center gap-2 animate-bounce shadow-md">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-white" />
            QUÀ TẶNG GIỚI HẠN ĐẶC BIỆT
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-sans font-black text-[#2E2522] tracking-tight leading-tight">
            Nhận Ngay Bộ Quà Tặng Độc Quyền <br className="hidden sm:inline" />
            <span className="text-[#A82222]">Trị Giá 499.000đ</span> Hoàn Toàn Miễn Phí!
          </h2>
          <p className="text-[#5C4D49] text-base font-normal leading-relaxed">
            Nhằm giúp bạn nhanh chóng bứt phá trên con đường xây kênh, thấu hiểu tư duy marketing chuyển đổi và ứng dụng AI tự động hóa 80% công việc, An xin dành tặng bạn bộ tài liệu đúc kết thực chiến này.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column Left: Gift details list with perceived value tags */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#EADFC9]/60 pb-3">
                <h3 className="text-xl font-sans font-extrabold text-[#2E2522] flex items-center">
                  <Gift className="w-5.5 h-5.5 text-[#A82222] mr-2.5 animate-pulse" />
                  Bạn sẽ nhận được gì trong hộp quà này?
                </h3>
                <span className="text-xs text-stone-500 font-medium">Số lượng quà tặng có hạn</span>
              </div>

              <div className="space-y-5">
                {GIFTS.map((gift, index) => {
                  const values = ['250.000đ', '249.000đ'];
                  return (
                    <div
                      key={gift.id}
                      className="bg-white rounded-2xl p-6 border-2 border-[#EADFC9]/40 hover:border-[#C59B27] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 group hover:-translate-y-0.5"
                    >
                      {/* Icon Frame with background gradient */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-[#F3ECE0] border border-[#EADFC9]/60 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        {renderGiftIcon(gift.iconName)}
                      </div>

                      {/* Text Details */}
                      <div className="space-y-2.5 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-extrabold text-lg text-[#2E2522] group-hover:text-[#A82222] transition-colors">{gift.title}</h4>
                            <span className="text-[10px] font-bold text-[#A82222] bg-[#FBEAEA] border border-[#F5CACA] px-2 py-0.5 rounded">
                              {gift.badge}
                            </span>
                          </div>
                          
                          {/* Price anchor value */}
                          <div className="text-xs font-semibold">
                            <span className="line-through text-stone-400 mr-2">{values[index] || '250.000đ'}</span>
                            <span className="text-[#C59B27] font-bold font-mono">0đ</span>
                          </div>
                        </div>
                        <p className="text-sm text-[#5C4D49] font-normal leading-relaxed">
                          {gift.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Micro value proposition and trust badges */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-[#F3ECE0] border border-[#EADFC9] shadow-inner">
                <p className="text-sm text-[#4A3C38] leading-relaxed">
                  💡 <strong>Quy trình gửi nhận tự động:</strong> Ngay sau khi hoàn tất đăng ký, hệ thống sẽ gửi link tải trực tiếp file PDF chất lượng cao, sắc nét qua Zalo và Email của bạn trong vòng 5 giây để bạn áp dụng được ngay!
                </p>
              </div>

              {/* Dynamic Social Proof Bar - live recipient simulation */}
              <div className="bg-[#FFFEEB] border border-[#EADFC9] rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-[#5C4D49]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-bold text-[#2E2522]">Hoạt động gần đây:</span>
                </div>
                <div className="flex-1 overflow-hidden h-5 relative font-medium">
                  <div className="animate-marquee whitespace-nowrap absolute">
                    🎉 Chị Lan Anh (0983***712) vừa tải tài liệu 10 bước xây kênh thành công! &nbsp;&nbsp;•&nbsp;&nbsp; 
                    🎉 Chị Thu Thủy (0364***890) vừa nhận bộ 9 nguyên tắc vàng! &nbsp;&nbsp;•&nbsp;&nbsp; 
                    🎉 Anh Hoàng Bách (0902***456) vừa nhận trọn bộ quà tặng miễn phí! &nbsp;&nbsp;•&nbsp;&nbsp;
                    🎉 Chị Minh Phương (0911***525) vừa tham gia nhóm Zalo hỗ trợ nhận quà!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Registration Lead Form (Extremely destacado, glowing) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] border-4 border-[#C59B27] p-8 shadow-2xl h-full relative overflow-hidden flex flex-col justify-center ring-8 ring-[#C59B27]/10">
              
              {/* Limited Spots Urgency Progress Bar */}
              <div className="mb-6 pb-5 border-b border-stone-100">
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-[#A82222] uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#A82222]" />
                    Chỉ còn 12 suất tải miễn phí hôm nay!
                  </span>
                  <span className="text-stone-500 font-mono">88/100 đã nhận</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[88%] h-full bg-gradient-to-r from-[#C59B27] to-[#A82222] rounded-full animate-pulse" />
                </div>
              </div>

              {/* If already registered successfully */}
              {isSubmitted ? (
                <div className="text-center space-y-6 py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#2E2522]">Đăng ký thành công!</h3>
                    <p className="text-sm text-[#4A3C38] font-medium leading-relaxed px-2">
                      Chào chị <strong>{formData.fullName}</strong>! An đã ghi nhận thông tin đăng ký nhận quà của chị thành công.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#EEF5FF] border-2 border-[#0068FF]/30 text-left space-y-4 shadow-xs">
                    <span className="text-xs font-bold text-[#0068FF] uppercase tracking-wider flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0068FF] mr-2 animate-ping" />
                      Bước cuối cùng để tải quà ngay lập tức:
                    </span>
                    <p className="text-xs text-[#2E2522] font-semibold leading-relaxed">
                      Chị hãy bấm nút xanh bên dưới để <strong>tham gia nhóm Zalo nhận link trực tiếp</strong> của bộ tài liệu và cùng thảo luận hỏi đáp trực tiếp với An nhé!
                    </p>
                    <a
                      href="https://zalo.me/g/kkgpy7a04itz12cfceo5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#0068FF] hover:bg-[#0056D2] text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] animate-pulse"
                    >
                      <MessageSquare className="w-5 h-5" />
                      THAM GIA NHÓM ZALO NHẬN FILE NGAY
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EADFC9]/80 text-left space-y-1.5">
                    <span className="text-[10px] font-bold text-[#C59B27] uppercase tracking-wider block">Lưu ý bổ sung:</span>
                    <p className="text-xs text-[#5C4D49] leading-relaxed">
                      • File tài liệu đã được tự động gửi về Email: <strong>{formData.email}</strong> (Chị vui lòng kiểm tra hộp thư đến hoặc thư rác/quảng cáo nhé). <br />
                      • Số Zalo của chị: <strong>{formData.phoneZalo}</strong> sẽ nhận được tin nhắn hỗ trợ từ An trong 10-15 phút nữa.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#C59B27] hover:text-[#A82222] font-bold underline transition-all cursor-pointer"
                  >
                    Đăng ký lại bằng thông tin khác
                  </button>
                </div>
              ) : (
                /* Registration Lead Form core */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold text-[#2E2522] tracking-tight flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#A82222]" />
                      Nhập thông tin nhận quà tặng
                    </h3>
                    <p className="text-xs text-[#5C4D49] font-medium">
                      Hệ thống gửi file tài liệu PDF tự động hoàn toàn miễn phí. Vui lòng nhập thông tin chính xác:
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Full Name field */}
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#5C4D49] flex items-center">
                        <User className="w-3.5 h-3.5 mr-1.5 text-[#A82222]" />
                        Họ và tên của chị:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Tống Mỹ Linh"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border-2 border-[#EADFC9] rounded-xl px-4 py-3.5 text-sm text-[#2E2522] font-medium focus:outline-none focus:border-[#C59B27] placeholder-stone-400 shadow-2xs focus:ring-4 focus:ring-[#C59B27]/10 transition-all"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#5C4D49] flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1.5 text-[#A82222]" />
                        Địa chỉ Email nhận file PDF:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ví dụ: mylinh@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border-2 border-[#EADFC9] rounded-xl px-4 py-3.5 text-sm text-[#2E2522] font-medium focus:outline-none focus:border-[#C59B27] placeholder-stone-400 shadow-2xs focus:ring-4 focus:ring-[#C59B27]/10 transition-all"
                      />
                    </div>

                    {/* Phone / Zalo field */}
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#5C4D49] flex items-center">
                        <Phone className="w-3.5 h-3.5 mr-1.5 text-[#A82222]" />
                        Số điện thoại / Số Zalo nhận quà:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0912345678"
                        value={formData.phoneZalo}
                        onChange={(e) => setFormData({ ...formData, phoneZalo: e.target.value })}
                        className="w-full bg-white border-2 border-[#EADFC9] rounded-xl px-4 py-3.5 text-sm text-[#2E2522] font-medium focus:outline-none focus:border-[#C59B27] placeholder-stone-400 shadow-2xs focus:ring-4 focus:ring-[#C59B27]/10 transition-all"
                      />
                    </div>

                    {/* Selection of resource */}
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#5C4D49] block">
                        Chọn tài liệu mong muốn nhận:
                      </label>
                      <select
                        value={formData.selectedGift}
                        onChange={(e) => setFormData({ ...formData, selectedGift: e.target.value })}
                        className="w-full bg-white border-2 border-[#EADFC9] rounded-xl px-4 py-3.5 text-sm text-[#2E2522] font-semibold focus:outline-none focus:border-[#C59B27] shadow-2xs cursor-pointer focus:ring-4 focus:ring-[#C59B27]/10 transition-all"
                      >
                        <option value="all">Nhận TRỌN BỘ 2 TÀI LIỆU (Tặng kèm)</option>
                        <option value="checklist">1. Quy trình 10 bước xây kênh chuyển đổi</option>
                        <option value="principles">2. 9 nguyên tắc vàng xây kênh chuyển đổi</option>
                      </select>
                    </div>

                  </div>

                  {/* Submit lead action */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white text-base font-black shadow-lg hover:shadow-xl disabled:bg-stone-200 disabled:text-stone-400 transition-all cursor-pointer group active:scale-[0.99] relative overflow-hidden"
                  >
                    {/* Shimmer effect helper */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                    
                    {loading ? (
                      <span className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        NHẬN BỘ QUÀ TẶNG MIỄN PHÍ NGAY
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-stone-400 text-center leading-relaxed">
                    🔒 An bảo mật tuyệt đối 100% dữ liệu. Chúng tôi cam kết không spam hay chia sẻ thông tin của bạn cho bên thứ ba.
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
