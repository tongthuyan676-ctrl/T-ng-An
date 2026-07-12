/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  QrCode, 
  ShieldCheck, 
  ChevronRight, 
  Gift, 
  Copy, 
  Check, 
  TrendingUp, 
  Smartphone, 
  Users,
  Download,
  MessageSquare
} from 'lucide-react';
import { saveEbookRegistration, updateEbookRegStatus } from '../lib/firebase';

export const PACKAGES = [
  {
    id: 'ebook_only',
    name: 'Gói Ebook Lộ Trình',
    badge: 'Cơ bản',
    originalPrice: '499.000đ',
    priceVal: 199000,
    priceStr: '199.000đ',
    desc: 'Bản Ebook Lộ trình 6 chương + lộ trình 12 chương thực chiến huấn luyện xây kênh cùng các quà tặng đính kèm.',
    features: [
      'Ebook Lộ Trình 6 Chương độc quyền',
      'Lộ trình huấn luyện thực chiến 12 chương',
      'Bộ 20+ Prompt AI chuyên sâu viết bài tự động',
      '100+ Tiêu đề giật tít thu hút từ giây đầu tiên',
      'Bản đồ quy trình xây kênh tối giản'
    ],
    qrPrefix: 'EBOOK'
  },
  {
    id: 'thuchanh',
    name: 'Gói Thực Hành',
    badge: 'Phổ biến nhất',
    originalPrice: '3.000.000đ',
    priceVal: 1490000,
    priceStr: '1.490.000đ',
    desc: 'Giải pháp thực hành bài bản giúp chị làm chủ kỹ năng quay dựng video ngắn và thiết kế hình ảnh tự tin.',
    features: [
      'Đầy đủ quyền lợi của Gói Ebook',
      'Trọn bộ Video khóa học quay dựng thực chiến',
      'Kho Template thiết kế Canva & CapCut chuyên nghiệp',
      'Tham gia Cộng đồng học viên chữa bài & hỗ trợ lâu dài'
    ],
    qrPrefix: 'THUCHANH'
  },
  {
    id: 'chuyendoi',
    name: 'Gói Chuyển Đổi',
    badge: 'Đồng hành 1-1',
    originalPrice: '10.000.000đ',
    priceVal: 4990000,
    priceStr: '4.990.000đ',
    desc: 'Sự đồng hành sát sao trực tiếp giúp chị xây dựng hệ thống chuyển đổi thương hiệu bền vững.',
    features: [
      'Đầy đủ quyền lợi của Gói Thực Hành',
      'Truy cập toàn bộ kho khóa học cao cấp của An',
      'Tham gia các buổi Coaching nhóm định kỳ',
      '1 Buổi Coaching 1-1 chuyên sâu cùng Coach Tống An'
    ],
    qrPrefix: 'CHUYENDOI'
  },
  {
    id: 'chuyengia',
    name: 'Gói Chuyên Gia',
    badge: 'Đồng hành đặc biệt',
    originalPrice: '35.000.000đ',
    priceVal: 15000000,
    priceStr: '15.000.000đ - 30.000.000đ',
    desc: 'Đồng hành toàn diện thiết lập phễu kinh doanh tự động hóa và bứt phá doanh số trong vòng 90 ngày.',
    features: [
      'Toàn bộ hệ thống phễu & quy trình vận hành',
      'Coaching trực tiếp 1-1 cùng Coach Tống An',
      'Đồng hành thực chiến liên tục trong 90 ngày'
    ],
    qrPrefix: 'CHUYENGIA'
  }
];

export default function Ebook() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneZalo: '',
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string>('ebook_only');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<'stk' | 'nd' | null>(null);
  const [regId, setRegId] = useState<string | null>(null);

  const selectedPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];

  // Editable Bank Transfer Info (Easy for Tống An to modify directly in code if needed)
  const bankInfo = {
    name: 'Agribank',
    accountNumber: '7105205437270',
    accountHolder: 'TONG THI THUY AN',
    price: selectedPackage.priceStr,
  };

  const [activeTab, setActiveTab] = useState<'sessions' | 'ebook'>('sessions');

  const combatSessions = [
    {
      num: '01',
      emoji: '🧠',
      title: 'TƯ DUY XÂY KÊNH CHUẨN CHỈNH',
      desc: 'Khai phóng tư duy định vị thương hiệu cá nhân độc bản và thiết lập mục tiêu chuyển đổi phễu rõ ràng.'
    },
    {
      num: '02',
      emoji: '🤖',
      title: 'ỨNG DỤNG AI: HÌNH ẢNH & CANVA',
      desc: 'Làm chủ công cụ trí tuệ nhân tạo thiết kế hình ảnh chân dung, ảnh bìa và thumbnail thu hút người xem từ ánh nhìn đầu tiên.'
    },
    {
      num: '03',
      emoji: '🏆',
      title: '9 NGUYÊN TẮC VÀNG XÂY KÊNH',
      desc: 'Nắm vững các luật phân phối hiển thị cốt lõi của video ngắn đa nền tảng để tối ưu hóa lượng tiếp cận tự nhiên.'
    },
    {
      num: '04',
      emoji: '🪜',
      title: 'QUY TRÌNH 10 BƯỚC XÂY DỰNG KÊNH',
      desc: 'Các bước chuẩn hóa SEO kênh từ con số 0, thiết lập sinh thái đa kênh chuyên nghiệp và dễ tìm kiếm.'
    },
    {
      num: '05',
      emoji: '🔍',
      title: 'KHÁM KÊNH – ĐỊNH HƯỚNG',
      desc: 'Thực hành soi kênh, phân tích lỗi sai kỹ thuật và tối ưu định vị nội dung để tiếp cận đúng tệp khán giả mục tiêu.'
    },
    {
      num: '06',
      emoji: '🧭',
      title: 'HIỂU MÌNH ĐỂ XÂY KÊNH',
      desc: 'Đánh thức giá trị cốt lõi cá nhân, tự tin xuất hiện mộc mạc và chân thành nhất trước ống kính.'
    },
    {
      num: '07',
      emoji: '🎬',
      title: 'CÁCH QUAY VIDEO TELEPROMPTER',
      desc: 'Làm chủ kỹ năng nói trôi chảy, lưu loát trước máy quay bằng sự trợ giúp của máy nhắc chữ thông minh.'
    },
    {
      num: '08',
      emoji: '✨',
      title: 'CAPCUT AI TỰ ĐỘNG',
      desc: 'Dựng video nhanh, lồng tiếng, tạo phụ đề tự động hóa chỉ trong vài lần chạm phím trên điện thoại.'
    },
    {
      num: '09',
      emoji: '🛠️',
      title: 'SỬA BÀI / SỬA VIDEO',
      desc: 'Nhận xét trực tiếp, chỉnh sửa chi tiết từng lỗi cắt dựng, âm thanh, ánh sáng và cử chỉ điệu bộ.'
    },
    {
      num: '10',
      emoji: '📖',
      title: 'CÁCH QUAY VIDEO KỂ CHUYỆN KỊCH BẢN',
      desc: 'Viết lời thoại giữ chân khán giả, lồng ghép câu chuyện cá nhân để chạm sâu sắc vào cảm xúc người xem.'
    },
    {
      num: '11',
      emoji: '💰',
      title: 'AFFILIATE SẢN PHẨM SỐ',
      desc: 'Cách chọn sản phẩm số giá trị cao, xây dựng nguồn thu nhập thụ động bền vững bằng tiếp thị liên kết.'
    },
    {
      num: '12',
      emoji: '🗳️',
      title: 'LIVESTREAM CHUYỂN ĐỔI',
      desc: 'Bí quyết livestream tự tin, tương tác trực tiếp thu hút và chốt sale chân thành, mang lại giá trị thật.'
    }
  ];

  const chapters = [
    {
      num: '01',
      title: 'Tư duy đúng & Định vị thương hiệu độc bản',
      desc: 'Phá vỡ rào cản sợ hãi ống kính, tìm kiếm điểm giao thoa giữa đam mê, thế mạnh cá nhân và nhu cầu bức thiết của thị trường.'
    },
    {
      num: '02',
      title: 'Nghiên cứu thị trường & Tìm ngách tiềm năng',
      desc: 'Chiến lược tìm ngách ít cạnh tranh nhưng nhu cầu cao. Vẽ chân dung khách hàng lý tưởng để viết nội dung chạm thẳng nỗi đau.'
    },
    {
      num: '03',
      title: 'Công thức kịch bản "Giữ chân 3 giây đầu"',
      desc: 'Bí mật đằng sau những video triệu view: Cấu trúc kịch bản đỉnh cao, viết tiêu đề kích thích sự tò mò và giữ tương tác cao đến cuối.'
    },
    {
      num: '04',
      title: 'Quy trình quay dựng thực chiến bằng điện thoại',
      desc: 'Hướng dẫn cài đặt máy, góc quay, ánh sáng đơn giản tại nhà. Thực hành dựng phim kéo - thả chuyên nghiệp bằng ứng dụng Capcut.'
    },
    {
      num: '05',
      title: 'Ứng dụng AI (ChatGPT, Claude) tối ưu 80% thời gian',
      desc: 'Trọn bộ câu lệnh (Prompt) thần thánh giúp trợ lý AI tự viết hàng chục kịch bản video ngắn chất lượng cao chỉ trong 10-15 phút.'
    },
    {
      num: '06',
      title: 'Thiết lập phễu khách hàng tự động đa nền tảng',
      desc: 'Cách tích hợp link bio, chatbot tặng tài liệu để tự động chuyển hóa người xem thành data khách hàng tiềm năng chất lượng cao.'
    }
  ];

  const handleCopy = (text: string, type: 'stk' | 'nd') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phoneZalo) {
      alert('Vui lòng điền đầy đủ thông tin để nhận đúng lộ trình hướng dẫn nhé!');
      return;
    }
    setLoading(true);
    try {
      const id = await saveEbookRegistration({
        fullName: formData.fullName,
        email: formData.email,
        phoneZalo: formData.phoneZalo,
        packageName: selectedPackage.name,
        price: selectedPackage.priceStr
      });
      setRegId(id);
      setIsCheckoutOpen(true);
      // Smooth scroll down to payment guide
      setTimeout(() => {
        document.getElementById('thong-tin-thanh-toan')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch (error) {
      console.error('Lỗi lưu đăng ký Ebook:', error);
      alert('Có lỗi xảy ra khi gửi thông tin. Chị vui lòng kiểm tra kết nối mạng và thử lại nhé!');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      if (regId) {
        await updateEbookRegStatus(regId, 'Đã thanh toán');
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Lỗi xác nhận thanh toán Ebook:', error);
      alert('Có lỗi xảy ra khi gửi xác nhận chuyển khoản. An sẽ chủ động đối soát nếu nhận được tiền nhé!');
      setIsSubmitted(true); // fall back to success screen to not block user
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ebook" className="py-24 bg-[#FAF6F0] relative overflow-hidden border-t border-[#EADFC9]/50">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#A82222]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A82222] px-3.5 py-1.5 bg-[#FBEAEA] rounded-full inline-block border border-[#F5CACA]">
            🔥 ƯU ĐÃI ĐẶC BIỆT - PHÁT HÀNH ĐỘC QUYỀN
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#2E2522] tracking-tight">
            Ebook Lộ Trình Xây Kênh Từ A Đến Z
          </h2>
          <p className="text-lg text-[#C59B27] font-semibold tracking-wide">
            Kiến Tạo Thương Hiệu - Xây Đa Kênh Đa Nền Tảng Bền Vững
          </p>
          <div className="h-1 w-20 bg-[#C59B27] mx-auto rounded-full mt-4" />
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: 3D Cover Mockup & Brief Intro (Col 5) */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-8 lg:sticky lg:top-24">
            
            {/* Visual 3D Book Container */}
            <div className="relative group perspective-1000 py-4">
              <div className="relative w-[280px] h-[390px] sm:w-[320px] sm:h-[450px] bg-gradient-to-br from-[#4A0D0D] via-[#A82222] to-[#2E2522] rounded-r-2xl shadow-2xl transition-all duration-500 transform hover:rotate-y-[-12deg] hover:translate-x-2 preserve-3d flex flex-col justify-between p-8 text-white border-l-8 border-[#3A0A0A] overflow-hidden">
                
                {/* Book spine lighting/shadow gradient */}
                <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-r from-black/30 via-white/5 to-transparent pointer-events-none" />
                
                {/* Elegant overlay line borders */}
                <div className="absolute inset-4 border border-[#C59B27]/30 rounded-r-xl pointer-events-none" />
                <div className="absolute inset-5 border border-[#C59B27]/10 rounded-r-xl pointer-events-none" />

                {/* Cover Top */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center space-x-2 text-[#C59B27]">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-xs font-bold tracking-widest uppercase">CẨM NANG THỰC CHIẾN</span>
                  </div>
                  
                  <div className="h-[2px] w-12 bg-[#C59B27]" />
                  
                  <h3 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3ECE0] to-[#EADFC9] leading-tight">
                    LỘ TRÌNH <br />
                    <span className="text-[#C59B27]">XÂY KÊNH</span> <br />
                    TỪ A ĐẾN Z
                  </h3>
                  
                  <p className="text-[11px] text-[#EADFC9] font-light leading-relaxed max-w-[90%]">
                    Bản đồ thực chiến xây dựng thương hiệu cá nhân, ứng dụng AI viết kịch bản và tối ưu phễu thu hút khách hàng tự động đa nền tảng.
                  </p>
                </div>

                {/* Cover Bottom */}
                <div className="space-y-4 relative z-10 pt-8">
                  <div className="h-[1px] bg-[#C59B27]/20 w-full" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-300 block tracking-wider font-light">TÁC GIẢ</span>
                      <span className="text-sm font-bold tracking-widest text-[#C59B27]">TỐNG AN</span>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-white/10 backdrop-blur-xs border border-white/15 text-[10px] font-bold tracking-wide text-white uppercase">
                      Multi-Platform
                    </div>
                  </div>
                </div>

                {/* Radial golden glow in bg */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#C59B27]/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Holographic sparkle icon */}
              <div className="absolute -top-2 -right-2 bg-[#C59B27] text-white p-2.5 rounded-full shadow-lg border border-white animate-bounce">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="w-full bg-white rounded-2xl p-6 border border-[#EADFC9]/50 shadow-2xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#A82222]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#5C4D49] font-medium">
                  Đã giúp <span className="font-bold text-[#A82222]">1.500+ học viên</span> tháo gỡ bế tắc xây kênh ngắn.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#A82222]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#5C4D49] font-medium">
                  Định dạng PDF sắc nét, đọc tiện lợi trên điện thoại, ipad, máy tính.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#A82222]">
                  <Gift className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#5C4D49] font-medium">
                  Tặng kèm <span className="font-bold text-[#C59B27]">Bộ 20+ Prompt AI chuyên sâu</span> viết bài tự động.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Chapter list & Payment Process (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Value Proposition Box */}
            <div className="bg-white rounded-3xl border border-[#EADFC9] p-8 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADFC9]/40 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#2E2522]">Tài liệu thực chiến độc quyền</h3>
                  <p className="text-xs text-[#5C4D49] font-light mt-1">Sở hữu ngay lộ trình & tài liệu thực chiến chuẩn hóa thương hiệu cá nhân của Tống An.</p>
                </div>

                {/* Price Display */}
                <div className="text-right">
                  <span className="text-xs text-stone-400 line-through block font-medium">
                    Giá gốc: 499.000đ
                  </span>
                  <div className="flex items-center justify-end space-x-2 mt-0.5">
                    <span className="text-xs font-bold text-white bg-[#A82222] px-2 py-0.5 rounded-md">GIẢM 60%</span>
                    <span className="text-2xl font-black text-[#A82222]">199.000đ</span>
                  </div>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EADFC9]/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('sessions')}
                  className={`flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'sessions'
                      ? 'bg-[#A82222] text-white shadow-sm'
                      : 'text-[#5C4D49] hover:text-[#A82222]'
                  }`}
                >
                  📖 12 Chương Thực Chiến Độc Quyền
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ebook')}
                  className={`flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'ebook'
                      ? 'bg-[#A82222] text-white shadow-sm'
                      : 'text-[#5C4D49] hover:text-[#A82222]'
                  }`}
                >
                  📕 Ebook Lộ Trình 6 Chương
                </button>
              </div>

              {/* Book Chapters / Combat Sessions Accordion-Style List */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#2E2522] uppercase tracking-wider flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B27] mr-2" />
                  {activeTab === 'sessions' 
                    ? 'Lộ trình huấn luyện thực chiến 12 chương:' 
                    : 'Bạn sẽ làm chủ những nội dung cốt lõi nào?'}
                </h4>

                {activeTab === 'sessions' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[440px] overflow-y-auto pr-2 scrollbar-thin">
                    {combatSessions.map((session) => (
                      <div 
                        key={session.num} 
                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EADFC9]/40 hover:border-[#C59B27]/40 transition-all duration-200 space-y-1.5 group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{session.emoji}</span>
                          <span className="text-[10px] font-mono font-bold text-[#A82222] bg-[#FBEAEA] px-2 py-0.5 rounded">
                            Chương {session.num}
                          </span>
                        </div>
                        <h5 className="font-extrabold text-xs text-[#2E2522] group-hover:text-[#A82222] transition-colors duration-150 uppercase tracking-tight mt-1">
                          {session.title}
                        </h5>
                        <p className="text-[11px] text-[#5C4D49] font-light leading-relaxed">
                          {session.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapters.map((chapter) => (
                      <div 
                        key={chapter.num} 
                        className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EADFC9]/40 hover:border-[#C59B27]/40 transition-all duration-200 space-y-2 group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-[#A82222] bg-[#FBEAEA] px-2 py-0.5 rounded">
                            Chương {chapter.num}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-[#2E2522] group-hover:text-[#A82222] transition-colors duration-150">
                          {chapter.title}
                        </h5>
                        <p className="text-xs text-[#5C4D49] font-light leading-relaxed">
                          {chapter.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bonusses */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-dashed border-[#C59B27] space-y-3">
                <h5 className="text-xs font-extrabold text-[#C59B27] flex items-center uppercase tracking-widest">
                  <Gift className="w-4 h-4 mr-1.5 animate-bounce" />
                  Quà Tặng Đính Kèm Đặc Biệt (Trị giá 500k)
                </h5>
                <ul className="text-xs text-[#5C4D49] space-y-2 list-none pl-0">
                  <li className="flex items-start">
                    <span className="text-[#C59B27] mr-2 font-bold">✓</span>
                    <span><strong>100+ Tiêu đề giật tít (Hooks)</strong> thu hút lượt click nhanh từ giây đầu tiên.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#C59B27] mr-2 font-bold">✓</span>
                    <span><strong>Bản đồ quy trình xây kênh tối giản</strong> in ra giấy dán tường để theo dõi tiến độ.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Step Register Form Container */}
            {!isCheckoutOpen ? (
              <div className="bg-white rounded-3xl border border-[#EADFC9] p-8 shadow-md space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#2E2522]">Đăng ký sở hữu lộ trình & các gói đồng hành</h3>
                  <p className="text-xs text-[#5C4D49]">Chị hãy chọn một trong bốn gói giải pháp phù hợp với mục tiêu của mình và điền thông tin bên dưới:</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  
                  {/* Package Choice Selection List */}
                  <div className="space-y-3">
                    {PACKAGES.map((pkg) => {
                      const isSelected = selectedPackageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#FFFDF9] border-[#C59B27] shadow-xs scale-[1.01]'
                              : 'bg-white border-[#EADFC9]/50 hover:border-[#C59B27]/40 hover:bg-stone-50'
                          }`}
                        >
                          {/* Left contents: selector dot + package details */}
                          <div className="flex items-start gap-3 flex-1">
                            {/* Custom selector circle */}
                            <div className="mt-1 shrink-0">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'border-[#A82222] bg-[#A82222]' : 'border-stone-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                              </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="font-extrabold text-xs text-[#2E2522] uppercase tracking-tight">
                                  {pkg.name}
                                </h5>
                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                                  isSelected 
                                    ? 'bg-[#A82222] text-white' 
                                    : 'bg-[#F3ECE0] text-[#5C4D49]'
                                }`}>
                                  {pkg.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#5C4D49] leading-normal">
                                {pkg.desc}
                              </p>
                              
                              {/* Feature Bullet List inside Selected Package */}
                              {isSelected && (
                                <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-[#3E322E] border-t border-[#EADFC9]/40 pt-2">
                                  {pkg.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-[#C59B27] shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          {/* Right pricing column */}
                          <div className="text-left sm:text-right shrink-0 pl-7 sm:pl-0 border-l sm:border-l-0 border-stone-100">
                            <span className="text-[9px] text-stone-400 line-through block font-medium">
                              Gốc: {pkg.originalPrice}
                            </span>
                            <span className="text-sm font-black text-[#A82222] block mt-0.5">
                              {pkg.priceStr}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-[1px] bg-stone-100/80 my-2" />

                  {/* Customer Information Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Họ & tên</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ví dụ: Thu Nguyệt"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-2.5 text-xs text-[#2E2522] focus:outline-hidden focus:border-[#C59B27]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Email nhận sách</label>
                      <input 
                        type="email" 
                        required
                        placeholder="thunguyet@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-2.5 text-xs text-[#2E2522] focus:outline-hidden focus:border-[#C59B27]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#5C4D49]">Số điện thoại/Zalo</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="0912345678"
                        value={formData.phoneZalo}
                        onChange={(e) => setFormData({ ...formData, phoneZalo: e.target.value })}
                        className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-2.5 text-xs text-[#2E2522] focus:outline-hidden focus:border-[#C59B27]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
                  >
                    Đăng Ký {selectedPackage.name.toUpperCase()} - {selectedPackage.priceStr}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* High Conversion Payment Gateway Box */
              <div id="thong-tin-thanh-toan" className="bg-white rounded-3xl border-2 border-[#C59B27] p-8 shadow-xl space-y-6 transition-all duration-300">
                
                {isSubmitted ? (
                  <div className="text-center py-6 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <Check className="w-8 h-8 stroke-[3px] animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-[#2E2522]">Xác nhận gửi yêu cầu thành công!</h4>
                      <p className="text-xs text-[#5C4D49] max-w-md mx-auto leading-relaxed">
                        Cảm ơn chị <strong>{formData.fullName}</strong>. An đã nhận được yêu cầu sở hữu Ebook từ chị.
                      </p>
                    </div>

                    {/* Instant Access & Download Box */}
                    <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-dashed border-[#C59B27] text-left max-w-md mx-auto space-y-3 shadow-xs">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0 animate-pulse" />
                        <h5 className="text-xs font-bold text-[#2E2522] uppercase tracking-wider font-sans">
                          {selectedPackageId === 'ebook_only' ? 'Tải Ebook PDF Đọc Ngay Lập Tức:' : `Quyền lợi ${selectedPackage.name}:`}
                        </h5>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        {selectedPackageId === 'ebook_only' 
                          ? 'Chị đã hoàn thành chuyển khoản thành công. Hãy bấm nút bên dưới để tải hoặc xem ngay bản PDF chất lượng cao chính thức từ Google Drive trong lúc chờ An kích hoạt bộ quà tặng đính kèm nhé!'
                          : `Chúc mừng chị đã đăng ký thành công ${selectedPackage.name}! Bên cạnh tài liệu Ebook (chị có thể bấm tải ngay bên dưới), Coach Tống An sẽ chủ động liên hệ trực tiếp với chị qua số điện thoại/Zalo ${formData.phoneZalo} để kích hoạt quyền lợi học viên, hướng dẫn xem video bài giảng và xếp lịch Coaching trực tiếp nhé!`}
                      </p>
                      
                      {/* CHỊ AN THAY ĐƯỜNG LINK GOOGLE DRIVE HOẶC DROPBOX CHỨA FILE PDF EBOOK CỦA CHỊ VÀO PHẦN href DƯỚI ĐÂY NHÉ */}
                      <a
                        href="https://drive.google.com/file/d/1_YOUR_REAL_DRIVE_ID_HERE/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Bấm để tải Ebook PDF Ngay (Google Drive)
                      </a>
                    </div>

                    {/* Zalo Group Joining Box */}
                    <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-dashed border-[#0068FF]/50 text-left max-w-md mx-auto space-y-3 shadow-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#0068FF] animate-ping" />
                        <h5 className="text-xs font-bold text-[#0068FF] uppercase tracking-wider">
                          Quan Trọng: Tham Gia Nhóm Zalo Nhận Tài Liệu
                        </h5>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        Đồng thời, chị hãy tham gia ngay nhóm Zalo để nhận thêm các tài liệu hướng dẫn, file bổ trợ thực hành và kết nối trực tiếp với An nhé!
                      </p>
                      <a
                        href="https://zalo.me/g/woxpkyg1pthofcehbo7m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0068FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Tham gia Nhóm Zalo Nhận Tài Liệu
                      </a>
                    </div>

                    <div className="text-[11px] text-stone-400 max-w-sm mx-auto">
                      An cũng sẽ gửi file qua Email <strong>{formData.email}</strong> và nhắn tin Zalo hỗ trợ <strong>{formData.phoneZalo}</strong> để tiện cho chị lưu trữ nhé!
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setIsSubmitted(false);
                        setFormData({ fullName: '', email: '', phoneZalo: '' });
                      }}
                      className="px-6 py-2 rounded-full bg-[#C59B27] text-white text-xs font-bold hover:bg-[#A9831E] transition-all cursor-pointer"
                    >
                      Quay lại trang chính
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#EADFC9]/50 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#C59B27] bg-[#FDF8EB] px-2 py-0.5 rounded border border-[#FBE6B5] uppercase">
                          BƯỚC CUỐI CÙNG - THANH TOÁN SỞ HỮU
                        </span>
                        <h4 className="text-base font-bold text-[#2E2522] mt-1.5">Hướng dẫn chuyển khoản sở hữu</h4>
                      </div>
                      <button 
                        onClick={() => setIsCheckoutOpen(false)}
                        className="text-stone-400 hover:text-[#2E2522] text-xs font-medium"
                      >
                        Thay đổi thông tin
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left: Bank Details List */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EADFC9]/50 space-y-3 text-xs">
                          
                          <div className="flex justify-between items-center">
                            <span className="text-stone-400">Ngân hàng:</span>
                            <span className="font-bold text-[#2E2522]">{bankInfo.name}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-t border-stone-100">
                            <span className="text-stone-400">Số tài khoản:</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-extrabold text-[#A82222] tracking-wider text-sm">{bankInfo.accountNumber}</span>
                              <button 
                                onClick={() => handleCopy(bankInfo.accountNumber, 'stk')}
                                className="p-1 rounded bg-[#FBEAEA] text-[#A82222] hover:bg-[#A82222] hover:text-white transition-colors"
                                title="Sao chép số tài khoản"
                              >
                                {copiedText === 'stk' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between items-center py-2 border-t border-stone-100">
                            <span className="text-stone-400">Chủ tài khoản:</span>
                            <span className="font-extrabold text-[#2E2522] uppercase">{bankInfo.accountHolder}</span>
                          </div>

                          <div className="flex justify-between items-center py-2 border-t border-stone-100">
                            <span className="text-stone-400">Số tiền chuyển:</span>
                            <span className="font-black text-[#A82222] text-sm">{bankInfo.price}</span>
                          </div>

                          {selectedPackageId === 'chuyengia' && (
                            <div className="p-3 rounded-xl bg-[#FFFDF0] border border-[#FBE6B5] text-[#5C4D49] text-[10px] leading-relaxed my-2">
                              💡 <strong>Lưu ý:</strong> Gói Chuyên Gia có mức phí từ 15 đến 30 triệu tùy quy mô. Mã QR được tạo sẵn số tiền tối thiểu là <strong>15.000.000đ</strong> làm khoản đặt cọc giữ lịch hẹn. Chị có thể quét chuyển cọc trước hoặc chủ động nhập số tiền khác tùy theo thỏa thuận cùng An nhé!
                            </div>
                          )}

                          <div className="flex justify-between items-center py-2 border-t border-dashed border-[#EADFC9] bg-[#FFFEEB] p-2 rounded-lg">
                            <span className="text-stone-500 font-medium">Nội dung chuyển:</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-[#C59B27]">{selectedPackage.qrPrefix} {formData.phoneZalo}</span>
                              <button 
                                onClick={() => handleCopy(`${selectedPackage.qrPrefix} ${formData.phoneZalo}`, 'nd')}
                                className="p-1 rounded bg-[#FDF8EB] text-[#C59B27] hover:bg-[#C59B27] hover:text-white transition-colors"
                                title="Sao chép nội dung"
                              >
                                {copiedText === 'nd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                        </div>
                        
                        <div className="flex items-center space-x-2 text-[10px] text-stone-400 bg-stone-50 p-3 rounded-xl border border-stone-100">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Hệ thống ghi nhận hoàn toàn tự động. Chị hãy nhấn nút phía dưới sau khi đã thực hiện giao dịch thành công.</span>
                        </div>
                      </div>

                      {/* Right: QR scan box */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] border border-[#EADFC9]/80 rounded-2xl">
                        <div className="relative p-2.5 bg-white rounded-xl shadow-xs border border-stone-200 w-36 h-36 flex items-center justify-center overflow-hidden">
                          <img
                            src={`https://img.vietqr.io/image/970405-7105205437270-compact2.jpg?amount=${selectedPackage.priceVal}&addInfo=${selectedPackage.qrPrefix}%20${encodeURIComponent(formData.phoneZalo || '')}&accountName=TONG%20THI%20THUY%20AN`}
                            alt="VietQR code Ebook"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=200&auto=format&fit=crop";
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-3 flex items-center gap-1">
                          <QrCode className="w-3.5 h-3.5 text-[#C59B27]" /> Quét Mã VietQR
                        </span>
                        <span className="text-[9px] text-[#5C4D49] text-center font-light mt-1">Hỗ trợ mọi app ngân hàng di động</span>
                      </div>

                    </div>

                    {/* Finalize step */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => setIsCheckoutOpen(false)}
                        className="w-full sm:w-1/3 py-3 border border-stone-200 hover:bg-stone-50 text-stone-600 font-semibold text-xs rounded-full transition-all cursor-pointer text-center"
                      >
                        Quay lại sửa thông tin
                      </button>
                      <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className="w-full sm:w-2/3 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#C59B27] hover:bg-[#A9831E] text-white font-extrabold text-sm tracking-wide shadow-md hover:shadow-lg disabled:bg-stone-100 disabled:text-stone-300 transition-all cursor-pointer"
                      >
                        {loading ? 'Đang gửi yêu cầu xác nhận...' : 'Tôi Đã Chuyển Khoản Thành Công'}
                        <CheckCircle2 className="ml-2 w-4.5 h-4.5" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
