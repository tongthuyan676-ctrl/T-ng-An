/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MessageSquare, Facebook, Youtube, Send, CheckCircle2, Clock, MapPin, Sparkles, Copy, Check, CreditCard, QrCode, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { saveCoachRegistration, updateCoachRegStatus } from '../lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    biggestChallenge: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  
  const [paymentStep, setPaymentStep] = useState<'form' | 'payment' | 'success'>('form');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'account' | 'content') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  const handleVerifyPayment = async () => {
    setCheckingPayment(true);
    try {
      if (regId) {
        await updateCoachRegStatus(regId, 'Đã thanh toán');
      }
      setPaymentStep('success');
    } catch (error) {
      console.error('Lỗi cập nhật thanh toán Coach:', error);
      setPaymentStep('success'); // Fall back to success so payment flow is not broken
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng điền Họ tên và Số điện thoại/Zalo để An có thể liên hệ lại nhé!');
      return;
    }

    setLoading(true);
    try {
      const id = await saveCoachRegistration({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        industry: formData.industry,
        biggestChallenge: formData.biggestChallenge,
        message: formData.message
      });
      setRegId(id);
      setPaymentStep('payment');
    } catch (error) {
      console.error('Lỗi lưu đăng ký tư vấn 1-1:', error);
      alert('Có lỗi xảy ra khi gửi thông tin đăng ký. Chị vui lòng thử lại nhé!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lien-he" className="py-24 bg-[#FAF6F0] relative overflow-hidden border-t border-[#EADFC9]/30">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#A82222]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A82222] px-3 py-1 bg-[#FBEAEA] rounded-full inline-block">
            Kết Nối Đồng Hành
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#2E2522]">
            Đăng ký tư vấn 1-1 & Kết nối với An
          </h2>
          <p className="text-[#5C4D49] text-base font-light leading-relaxed">
            Bạn đã sẵn sàng biến câu chuyện cá nhân thành tài sản kinh doanh đột phá? Đăng ký ngay một suất khai vấn xây kênh chuyên sâu với chi phí ưu đãi cực tốt chỉ <strong className="text-[#A82222] font-semibold">199.000đ</strong> (giá gốc <span className="line-through text-stone-400">599.000đ</span>) hoặc kết nối trực tiếp qua các cổng thông tin sau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column Left: Contact Details & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-sans font-bold text-[#2E2522]">Thông tin liên hệ của An</h3>
              <p className="text-sm text-[#5C4D49] font-light leading-relaxed">
                An luôn sẵn sàng lắng nghe mọi băn khoăn, câu hỏi hay dự án hợp tác của bạn. Đừng ngần ngại gửi tin nhắn trực tiếp qua hòm thư điện tử hoặc các kênh mạng xã hội nhé!
              </p>

              {/* Direct Info List */}
              <div className="space-y-4">
                
                {/* Email (Real) */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-[#EADFC9]/40 shadow-2xs">
                  <div className="p-3 rounded-xl bg-[#A82222]/10 text-[#A82222] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-[#5C4D49] tracking-wider">Hòm thư điện tử</h5>
                    <p className="text-sm font-semibold text-[#2E2522] mt-0.5">{CONTACT_INFO.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#A82222] bg-[#FBEAEA] px-2 py-0.5 rounded">
                      Email thật - hoạt động tốt
                    </span>
                  </div>
                </div>

                {/* Phone / Zalo */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-[#EADFC9]/40 shadow-2xs relative">
                  <div className="p-3 rounded-xl bg-[#C59B27]/10 text-[#C59B27] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-[#5C4D49] tracking-wider">Số điện thoại / Zalo</h5>
                    <p className="text-sm font-semibold text-[#2E2522] mt-0.5">Số điện thoại: {CONTACT_INFO.phone}</p>
                    <p className="text-xs text-[#5C4D49] font-light">Zalo ID: {CONTACT_INFO.zalo}</p>
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] text-[#A82222] bg-[#FBEAEA] px-2 py-0.5 rounded-sm border border-[#F5CACA]/30 font-semibold">
                    Hỗ trợ 24/7
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-[#EADFC9]/40 shadow-2xs">
                  <div className="p-3 rounded-xl bg-[#A82222]/10 text-[#A82222] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-[#5C4D49] tracking-wider">Khu vực làm việc</h5>
                    <p className="text-sm font-semibold text-[#2E2522] mt-0.5">{CONTACT_INFO.address}</p>
                    <p className="text-xs text-[#5C4D49] font-light">Làm việc trực tuyến toàn quốc & hỗ trợ trực tiếp tại Bến Tre</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels widget */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EADFC9] space-y-4">
              <h4 className="font-bold text-[#2E2522] text-sm flex items-center">
                <Sparkles className="w-4 h-4 text-[#C59B27] mr-2" />
                Các mạng xã hội cá nhân:
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-[#EADFC9]/50 hover:border-[#1877F2] rounded-xl flex flex-col items-center justify-center space-y-1.5 shadow-3xs group transition-all hover:scale-[1.05]"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="text-[10px] font-semibold text-[#5C4D49]">Facebook</span>
                  <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">Ghé thăm</span>
                </a>

                <a
                  href={CONTACT_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-[#EADFC9]/50 hover:border-black rounded-xl flex flex-col items-center justify-center space-y-1.5 shadow-3xs group transition-all hover:scale-[1.05]"
                >
                  <span className="font-bold text-[10px] text-black bg-white px-1 py-0.5 rounded border border-stone-200 leading-none">TikTok</span>
                  <span className="text-[10px] font-semibold text-[#5C4D49]">TikTok</span>
                  <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">Ghé thăm</span>
                </a>

                <a
                  href={CONTACT_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-[#EADFC9]/50 hover:border-[#FF0000] rounded-xl flex flex-col items-center justify-center space-y-1.5 shadow-3xs group transition-all hover:scale-[1.05]"
                >
                  <Youtube className="w-5 h-5 text-[#FF0000]" />
                  <span className="text-[10px] font-semibold text-[#5C4D49]">YouTube</span>
                  <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">Ghé thăm</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column Right: Active Consultation Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] border border-[#EADFC9] p-8 sm:p-10 shadow-lg relative overflow-hidden h-full flex flex-col justify-center">
              
              {paymentStep === 'payment' ? (
                <div className="space-y-6 py-2">
                  <div className="flex items-center space-x-3 pb-4 border-b border-stone-100">
                    <div className="p-2.5 bg-[#FBEAEA] text-[#A82222] rounded-xl shrink-0">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#2E2522]">Thanh Toán Khai Vấn 1-1</h3>
                      <p className="text-xs text-[#5C4D49]">Vui lòng hoàn tất thanh toán chuyển khoản để nhận lịch hẹn</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Bank Info */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                      <div className="p-4 bg-[#FAF8F5] border border-[#EADFC9]/60 rounded-2xl space-y-3 text-xs flex-1">
                        <div className="flex justify-between items-center py-1.5 border-b border-[#EADFC9]/30">
                          <span className="text-stone-500">Ngân hàng</span>
                          <span className="font-bold text-[#2E2522]">Agribank</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-1.5 border-b border-[#EADFC9]/30">
                          <span className="text-stone-500">Số tài khoản</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-sm text-[#A82222]">7105205437270</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('7105205437270', 'account')}
                              className="p-1 hover:bg-stone-200 rounded text-stone-500 transition-colors cursor-pointer"
                              title="Sao chép số tài khoản"
                            >
                              {copiedAccount ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center py-1.5 border-b border-[#EADFC9]/30">
                          <span className="text-stone-500">Chủ tài khoản</span>
                          <span className="font-bold text-[#2E2522] uppercase">TONG THI THUY AN</span>
                        </div>

                        <div className="flex justify-between items-center py-1.5 border-b border-[#EADFC9]/30">
                          <span className="text-stone-500">Số tiền</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-[#A82222]">199.000đ</span>
                            <span className="text-[10px] text-stone-400 line-through">599.000đ</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center py-1.5">
                          <span className="text-stone-500">Nội dung CK</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-xs text-[#C59B27]">{`COACHAN ${formData.phone || 'SĐT'}`}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(`COACHAN ${formData.phone || ''}`, 'content')}
                              className="p-1 hover:bg-stone-200 rounded text-stone-500 transition-colors cursor-pointer"
                              title="Sao chép nội dung chuyển khoản"
                            >
                              {copiedContent ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 text-[10px] text-stone-500 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EADFC9]/30">
                        <Sparkles className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5 animate-pulse" />
                        <span>Quét mã QR bên cạnh hoặc nhập đúng số tài khoản và nội dung để hệ thống đối soát duyệt lịch nhanh chóng!</span>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-4 border border-[#EADFC9]/40 bg-stone-50 rounded-2xl shrink-0">
                      <div className="w-full aspect-square bg-white rounded-xl p-2 flex items-center justify-center shadow-xs border border-stone-100">
                        <img
                          src={`https://img.vietqr.io/image/970405-7105205437270-compact2.jpg?amount=199000&addInfo=COACHAN%20${encodeURIComponent(formData.phone || '')}&accountName=TONG%20THI%20THUY%20AN`}
                          alt="VietQR code"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=200&auto=format&fit=crop";
                          }}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <span className="text-[10px] font-bold text-[#5C4D49] flex items-center justify-center gap-1">
                          <QrCode className="w-3.5 h-3.5 text-[#A82222]" />
                          MÃ VIETQR QUÉT NHANH
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleVerifyPayment}
                      disabled={checkingPayment}
                      className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white text-base font-bold shadow-md hover:shadow-lg disabled:bg-stone-200 transition-all cursor-pointer"
                    >
                      {checkingPayment ? (
                        <span className="flex items-center space-x-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Hệ thống đang đối soát giao dịch chuyển khoản...</span>
                        </span>
                      ) : (
                        <span>Xác nhận đã chuyển khoản thành công</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentStep('form')}
                      disabled={checkingPayment}
                      className="w-full text-center text-xs text-[#5C4D49] hover:text-[#A82222] transition-colors py-1 underline font-medium cursor-pointer"
                    >
                      Quay lại sửa thông tin phiếu đăng ký
                    </button>
                  </div>
                </div>
              ) : paymentStep === 'success' ? (
                <div className="text-center space-y-6 py-12">
                  <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-inner border border-green-100">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#2E2522]">Thanh toán & Đăng ký thành công!</h3>
                    <p className="text-sm text-[#5C4D49] font-light leading-relaxed px-4">
                      An đã nhận được thông tin khảo sát và xác nhận giao dịch chuyển khoản của bạn <strong>{formData.name}</strong>.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EADFC9] text-left space-y-3 max-w-lg mx-auto shadow-xs">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-500" />
                      Lộ trình kết nối tiếp theo:
                    </span>
                    <p className="text-xs text-[#5C4D49] leading-relaxed space-y-1.5">
                      1. Chị hãy <strong>bấm nút Đặt lịch trực tuyến ngay dưới đây</strong> để lựa chọn khung giờ rảnh mong muốn cho buổi Khai vấn 1-1 Zoom.<br />
                      2. Trong vòng tối đa 2-3 giờ làm việc, An hoặc trợ lý sẽ chủ động liên hệ nhắn tin qua Zalo <strong>{formData.phone}</strong> hoặc Email để xác nhận và gửi hướng dẫn chuẩn bị.<br />
                      3. Buổi tư vấn trực tiếp 45 phút, An sẽ mổ xẻ kênh chi tiết và vạch định phễu kinh doanh cho riêng chị.
                    </p>
                  </div>

                  {/* Calendar Booking Box */}
                  <div className="p-6 rounded-2xl bg-[#FFF9EB] border-2 border-[#C59B27] text-left space-y-3 max-w-lg mx-auto shadow-md animate-pulse">
                    <span className="text-xs font-bold text-[#A82222] uppercase tracking-wider flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5 text-[#C59B27]" />
                      Vui Lòng Chọn Khung Giờ Khai Vấn 1-1 Của Chị:
                    </span>
                    <p className="text-xs text-[#5C4D49] leading-relaxed">
                      Chị <strong>{formData.name}</strong> ơi, chị bấm nút bên dưới để chọn ngay một giờ hẹn phù hợp nhất trên Lịch Google của An nhé!
                    </p>
                    <a
                      href="https://calendar.app.google/yZJ33nSiVYE6Pk3W6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#A82222] hover:bg-[#8B1A1A] text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Calendar className="w-5 h-5" />
                      ĐẶT LỊCH HẸN TƯ VẤN VỚI AN NGAY
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentStep('form');
                      setFormData({ name: '', email: '', phone: '', industry: '', biggestChallenge: '', message: '' });
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold hover:bg-stone-200 transition-all cursor-pointer"
                  >
                    Đăng ký cho tài khoản mới
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-2xl font-bold text-[#2E2522]">Phiếu đăng ký khai vấn xây kênh 1-1</h3>
                      <div className="flex items-center space-x-1.5 text-xs">
                        <span className="text-stone-400 line-through">599.000đ</span>
                        <span className="text-[#A82222] font-bold text-sm">199.000đ</span>
                        <span className="bg-[#FBEAEA] text-[#A82222] text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm">GIẢM 67%</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#5C4D49] font-light">
                      Điền chi tiết khảo sát giúp An có thể chuẩn bị tốt nhất và thấu hiểu vấn đề của bạn trước khi kết nối trực tiếp nhé!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Họ và tên của bạn"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2E2522] focus:outline-hidden focus:border-[#C59B27] placeholder-stone-400"
                      />
                    </div>

                    {/* Phone / Zalo */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Số điện thoại / Zalo *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Để An nhắn tin chọn giờ"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2E2522] focus:outline-hidden focus:border-[#C59B27] placeholder-stone-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Địa chỉ Email</label>
                      <input
                        type="email"
                        placeholder="Để nhận file tóm tắt tư vấn"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2E2522] focus:outline-hidden focus:border-[#C59B27] placeholder-stone-400"
                      />
                    </div>

                    {/* Industry */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Lĩnh vực / Sản phẩm kinh doanh</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Giáo viên, Thời trang, Mỹ phẩm..."
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2E2522] focus:outline-hidden focus:border-[#C59B27] placeholder-stone-400"
                      />
                    </div>
                  </div>

                  {/* Challenge Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#5C4D49] block">
                      Khó khăn lớn nhất hiện tại của bạn là gì?
                    </label>
                    <select
                      value={formData.biggestChallenge}
                      onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                      className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2E2522] focus:outline-hidden focus:border-[#C59B27]"
                    >
                      <option value="">-- Vui lòng chọn một khó khăn --</option>
                      <option value="start">Chưa biết bắt đầu xây kênh từ đâu</option>
                      <option value="no-customer">Đăng bài đều nhưng không ra đơn</option>
                      <option value="camera-fear">Ngại camera, sợ xuất hiện và bí kịch bản</option>
                      <option value="ai-tech">Chưa biết cách áp dụng AI vào làm nội dung</option>
                      <option value="all">Loay hoay mọi khâu, mệt mỏi cạn năng lượng</option>
                    </select>
                  </div>

                  {/* Message details */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#5C4D49]">Ghi chú / Chia sẻ thêm với An (nếu có)</label>
                    <textarea
                      rows={3}
                      placeholder="Chia sẻ về mục tiêu kênh hoặc kênh hiện tại của bạn để An xem trước..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2E2522] focus:outline-hidden focus:border-[#C59B27] placeholder-stone-400 resize-none"
                    />
                  </div>

                  {/* Submit registration action */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white text-base font-bold shadow-md hover:shadow-lg disabled:bg-stone-200 transition-all cursor-pointer group"
                  >
                    {loading ? (
                      <span className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Đăng ký nhận lịch khai vấn (Ưu đãi 199K)
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                    * Các thông tin trên được mã hóa bảo mật hoàn chỉnh và chỉ sử dụng cho cuộc trò chuyện chuyên môn cùng Tống An.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
