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
  Gift, 
  Copy, 
  Check, 
  TrendingUp, 
  Smartphone, 
  Download,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Bot,
  Palette,
  FileText,
  Zap,
  Award
} from 'lucide-react';
import { saveEbookRegistration, updateEbookRegStatus } from '../lib/firebase';
import FullEbookModal from './FullEbookModal';
import { FULL_EBOOK_INFO } from '../data/ebookData';

export const PACKAGES = [
  {
    id: 'solopreneur_ai',
    name: 'Cẩm Nang Vận Hành Doanh Nghiệp 1 Người Bằng AI',
    badge: 'Ưu Đãi Đặc Biệt 59K 🔥',
    originalPrice: '299.000đ',
    priceVal: 59000,
    priceStr: '59.000đ',
    desc: 'Trọn bộ Full Ebook Solopreneur AI + Checklist 90 Ngày + Bộ Prompt độc quyền + Quyền tham gia Cộng đồng hỗ trợ trọn đời.',
    features: [
      'Full Ebook Vận Hành Doanh Nghiệp 1 Người Bằng AI (PDF)',
      'Checklist 90 Ngày bứt phá doanh số cho nhà bán hàng vật lý',
      'Bộ Prompt AI độc quyền (PRED Framework, kịch bản AIDA)',
      'Bản đồ thiết lập Ban Giám Đốc Ảo: ChatGPT, Canva AI, Notion AI',
      'Quyền tham gia Cộng đồng hỗ trợ & giải đáp thắc mắc trọn đời'
    ],
    qrPrefix: 'SOLOAI'
  },
  {
    id: 'ebook_only',
    name: 'Gói Ebook Lộ Trình Xây Kênh',
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
  const [selectedPackageId, setSelectedPackageId] = useState<string>('solopreneur_ai');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<'stk' | 'nd' | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);

  // Default active tab to 'sample' (Bản Đọc Thử 59K)
  const [activeTab, setActiveTab] = useState<'sample' | 'sessions' | 'ebook'>('sample');
  const [isSampleExpanded, setIsSampleExpanded] = useState(false);
  const [isFullEbookModalOpen, setIsFullEbookModalOpen] = useState(false);

  const selectedPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];

  // Editable Bank Transfer Info
  const bankInfo = {
    name: 'Agribank',
    accountNumber: '7105205437270',
    accountHolder: 'TONG THI THUY AN',
    price: selectedPackage.priceStr,
  };

  const aidaPromptText = `Đóng vai trò là Chuyên gia Copywriting E-commerce, hãy viết bài đăng Facebook theo cấu trúc AIDA để bán [Tên sản phẩm] cho [Khách hàng mục tiêu]. Yêu cầu: Tiêu đề mạnh chạm đúng nỗi đau, nội dung đồng cảm, nêu bật lợi ích và kêu gọi hành động với ưu đãi giới hạn. Văn phong gần gũi, sắc sảo đúng chất Coach Tống An.`;

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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(aidaPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleScrollToRegister = (pkgId: string = 'solopreneur_ai') => {
    setSelectedPackageId(pkgId);
    setIsCheckoutOpen(false);
    const element = document.getElementById('dang-ky-ebook');
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phoneZalo) {
      alert('Vui lòng điền đầy đủ thông tin để nhận đúng tài liệu và quyền lợi nhé!');
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
      setIsSubmitted(true);
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
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A82222] px-4 py-1.5 bg-[#FBEAEA] rounded-full inline-flex items-center gap-1.5 border border-[#F5CACA] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A82222]" />
            PHÁT HÀNH ĐỘC QUYỀN - ƯU ĐÃI ĐẶC BIỆT CHỈ 59K
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-[#2E2522] tracking-tight leading-tight">
            Cẩm Nang Thực Chiến: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A82222] via-[#C59B27] to-[#A82222]">
              Vận Hành Doanh Nghiệp 1 Người Bằng AI
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D49] font-medium max-w-2xl mx-auto">
            Dành riêng cho nhà bán hàng vật lý & xây dựng thương hiệu cá nhân — Tự động hóa 80% công việc, làm chủ hệ thống và bứt phá doanh thu.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#A82222] to-[#C59B27] mx-auto rounded-full mt-4" />
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: 3D Cover Mockup & Author Badge (Col 5) */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6 lg:sticky lg:top-24">
            
            {/* Visual 3D Book Container */}
            <div className="relative group perspective-1000 py-2">
              <div className="relative w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] bg-gradient-to-br from-[#3D0A0A] via-[#851818] to-[#1E1715] rounded-r-2xl shadow-2xl transition-all duration-500 transform hover:rotate-y-[-10deg] hover:translate-x-2 preserve-3d flex flex-col justify-between p-7 text-white border-l-8 border-[#260505] overflow-hidden">
                
                {/* Book spine lighting/shadow gradient */}
                <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-r from-black/40 via-white/5 to-transparent pointer-events-none" />
                
                {/* Elegant overlay line borders */}
                <div className="absolute inset-3 border border-[#C59B27]/30 rounded-r-xl pointer-events-none" />
                <div className="absolute inset-4 border border-[#C59B27]/10 rounded-r-xl pointer-events-none" />

                {/* Cover Top */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-[#C59B27]">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">CẨM NANG THỰC CHIẾN</span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#C59B27] text-black">
                      59K
                    </span>
                  </div>
                  
                  <div className="h-[2px] w-12 bg-[#C59B27]" />
                  
                  <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-white leading-tight">
                    VẬN HÀNH <br />
                    <span className="text-[#E6C665]">DOANH NGHIỆP 1 NGƯỜI</span> <br />
                    BẰNG AI
                  </h3>
                  
                  <p className="text-[11px] text-[#F3ECE0] font-light leading-relaxed max-w-[95%]">
                    Cẩm nang tự động hóa quy trình kinh doanh vật lý, ứng dụng ChatGPT, Canva AI, Notion AI giải phóng thời gian và nhân bản doanh thu.
                  </p>
                </div>

                {/* Cover Bottom */}
                <div className="space-y-3 relative z-10 pt-4">
                  <div className="p-2.5 rounded-xl bg-black/30 backdrop-blur-xs border border-white/10 text-[10px] text-stone-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-[#E6C665] font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      Tặng Kèm Trọn Bộ:
                    </div>
                    <div className="text-[9px] text-stone-300">
                      • Full Ebook + Checklist 90 Ngày<br />
                      • Bộ Prompt AI Độc Quyền + Nhóm VIP
                    </div>
                  </div>

                  <div className="h-[1px] bg-[#C59B27]/20 w-full" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-300 block tracking-wider font-light">TÁC GIẢ</span>
                      <span className="text-xs font-bold tracking-wider text-[#C59B27]">COACH TỐNG AN</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-xs border border-white/15 text-[9px] font-bold tracking-wide text-white uppercase">
                      SOLOPRENEUR AI
                    </div>
                  </div>
                </div>

                {/* Radial golden glow in bg */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#C59B27]/25 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Holographic sparkle icon */}
              <div className="absolute -top-2 -right-2 bg-[#C59B27] text-white p-2.5 rounded-full shadow-lg border border-white animate-bounce">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Quick Pricing Callout */}
            <div className="w-full bg-white rounded-2xl p-5 border border-[#EADFC9] shadow-sm space-y-3 text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs text-stone-400 line-through font-medium">Giá gốc: 299.000đ</span>
                <span className="text-xs font-bold text-white bg-[#A82222] px-2.5 py-0.5 rounded-full">TIẾT KIỆM 80%</span>
              </div>
              <div className="text-3xl font-black text-[#A82222]">
                59.000đ
              </div>
              <p className="text-[11px] text-[#5C4D49]">
                Sở hữu trọn đời: Ebook PDF + Checklist 90 ngày + Bộ prompt AI + Hỗ trợ hỏi đáp trực tiếp.
              </p>
              <button
                type="button"
                onClick={() => handleScrollToRegister('solopreneur_ai')}
                className="w-full py-3 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                Thiết Lập Thanh Toán 59K Ngay
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="w-full bg-white rounded-2xl p-5 border border-[#EADFC9]/50 shadow-2xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#A82222]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#5C4D49] font-medium">
                  Đã giúp <span className="font-bold text-[#A82222]">1.500+ chủ kinh doanh</span> tinh gọn bộ máy và tiết kiệm hàng chục triệu chi phí.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#A82222]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#5C4D49] font-medium">
                  Định dạng PDF sắc nét, mở đọc dễ dàng trên điện thoại, máy tính bảng và laptop.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#A82222]">
                  <Gift className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#5C4D49] font-medium">
                  Tặng kèm <span className="font-bold text-[#C59B27]">Bộ Prompt PRED Framework</span> viết bài AIDA tự động.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Reading Sample & Payment Registration Container (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tab Selector: Bản Đọc Thử 59K vs 12 Chương vs Ebook Lộ Trình */}
            <div className="bg-white rounded-3xl border border-[#EADFC9] p-6 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EADFC9]/50 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2E2522]">Khám Phá Nội Dung Cẩm Nang</h3>
                  <p className="text-xs text-[#5C4D49] font-light mt-0.5">
                    Đọc thử trích đoạn nội dung thực chiến và lựa chọn gói tài liệu phù hợp.
                  </p>
                </div>
                <button
                  onClick={() => handleScrollToRegister('solopreneur_ai')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C59B27] hover:bg-[#A9831E] text-white text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Sở Hữu Trọn Bộ 59K
                </button>
              </div>

              {/* Tab navigation pills */}
              <div className="flex flex-wrap gap-2 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EADFC9]/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('sample')}
                  className={`flex-1 min-w-[160px] text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'sample'
                      ? 'bg-[#A82222] text-white shadow-sm'
                      : 'text-[#5C4D49] hover:text-[#A82222]'
                  }`}
                >
                  🌟 Bản Đọc Thử Cẩm Nang AI (59K)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sessions')}
                  className={`flex-1 min-w-[140px] text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'sessions'
                      ? 'bg-[#A82222] text-white shadow-sm'
                      : 'text-[#5C4D49] hover:text-[#A82222]'
                  }`}
                >
                  📖 12 Chương Thực Chiến
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ebook')}
                  className={`flex-1 min-w-[130px] text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'ebook'
                      ? 'bg-[#A82222] text-white shadow-sm'
                      : 'text-[#5C4D49] hover:text-[#A82222]'
                  }`}
                >
                  📕 Ebook Lộ Trình 6 Chương
                </button>
              </div>

              {/* TAB 1: BẢN ĐỌC THỬ CẨM NANG THỰC CHIẾN (CHÍNH) */}
              {activeTab === 'sample' && (
                <div className="space-y-6">
                  
                  {/* Book Sample Editorial Card */}
                  <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#EADFC9] p-6 sm:p-8 space-y-6 shadow-sm relative">
                    
                    {/* Header of Trial Sample */}
                    <div className="border-b border-[#EADFC9]/60 pb-5 space-y-2">
                      <div className="inline-block px-3 py-1 rounded-md bg-[#FBEAEA] text-[#A82222] text-[11px] font-bold uppercase tracking-wider border border-[#F5CACA]">
                        BẢN ĐỌC THỬ CHÍNH THỨC
                      </div>
                      <h4 className="text-xl sm:text-2xl font-sans font-black text-[#2E2522] tracking-tight leading-snug">
                        CẨM NANG THỰC CHIẾN: <br className="sm:hidden" />
                        <span className="text-[#A82222]">VẬN HÀNH DOANH NGHIỆP 1 NGƯỜI BẰNG AI</span>
                      </h4>
                      <div className="text-xs text-[#5C4D49] font-medium flex items-center gap-1.5 pt-1">
                        <Award className="w-4 h-4 text-[#C59B27]" />
                        <span>Tác giả: <strong>Coach Tống An</strong> (Chuyên gia Đào tạo Con người & Cố vấn Phát triển Sự nghiệp)</span>
                      </div>
                    </div>

                    {/* Section: Lời Nói Đầu */}
                    <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl border border-[#EADFC9]/50">
                      <h5 className="text-sm font-extrabold text-[#A82222] flex items-center gap-2 uppercase tracking-wide">
                        <span>🌟</span> LỜI NÓI ĐẦU
                      </h5>
                      <p className="text-xs sm:text-sm text-[#3E322E] leading-relaxed">
                        Chào bạn đến với cẩm nang thực chiến vận hành doanh nghiệp 1 người bằng AI dành riêng cho nhà bán hàng vật lý và xây dựng thương hiệu cá nhân.
                      </p>
                      <p className="text-xs sm:text-sm text-[#3E322E] leading-relaxed">
                        Trong kỷ nguyên AI, quy mô doanh nghiệp không nằm ở số lượng nhân sự cồng kềnh, mà nằm ở tốc độ tự động hóa, tối ưu hóa hệ thống và sức mạnh định vị của chính bạn. Cuốn cẩm nang này sẽ đồng hành cùng bạn giải phóng thời gian và bứt phá doanh thu.
                      </p>
                    </div>

                    {/* Section: Chương 1 */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-b border-[#EADFC9]/40 pb-2">
                        <span className="text-base">📌</span>
                        <h5 className="text-sm sm:text-base font-bold text-[#2E2522] uppercase tracking-tight">
                          CHƯƠNG 1: TỔNG QUAN SOLOPRENEUR & SỨC MẠNH AI TRONG KINH DOANH VẬT LÝ
                        </h5>
                      </div>

                      {/* I. Tư duy nền tảng */}
                      <div className="space-y-3 pl-2 sm:pl-3 border-l-2 border-[#C59B27]/40">
                        <h6 className="text-xs sm:text-sm font-bold text-[#A82222]">
                          I. Tư duy nền tảng — Chuyển từ &quot;Thợ làm thuê cho chính mình&quot; sang &quot;Nhà điều hành hệ thống&quot;
                        </h6>
                        <p className="text-xs sm:text-sm text-[#5C4D49] leading-relaxed">
                          Hầu hết các chị em khi mới bắt đầu kinh doanh sản phẩm vật lý (quần áo, mỹ phẩm, đồ gia dụng, thực phẩm...) thường rơi vào cái bẫy <strong>&quot;Tự làm tất cả mọi thứ&quot; (Do-It-All Trap)</strong>:
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#2E2522]">
                          <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 flex items-start gap-2 shadow-2xs">
                            <span className="font-bold text-[#A82222]">🌅 Sáng:</span>
                            <span>Nhập hàng, kiểm kê kho bãi.</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 flex items-start gap-2 shadow-2xs">
                            <span className="font-bold text-[#A82222]">📦 Trưa:</span>
                            <span>Đóng gói đơn hàng, đi gửi bưu điện.</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 flex items-start gap-2 shadow-2xs">
                            <span className="font-bold text-[#A82222]">📸 Chiều:</span>
                            <span>Chụp ảnh sản phẩm, viết bài Facebook, dựng video TikTok.</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 flex items-start gap-2 shadow-2xs">
                            <span className="font-bold text-[#A82222]">🌙 Tối mịt:</span>
                            <span>Ngồi trả lời tin nhắn khách, chốt đơn và đối soát dòng tiền.</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#FDF2F2] border border-[#F5CACA] text-xs text-[#8B1A1A] leading-relaxed">
                          <strong>👉 Hậu quả:</strong> Kiệt sức (Burnout), thời gian dành cho gia đình và bản thân không còn, nhưng doanh thu thì giậm chân tại chỗ vì quỹ thời gian một ngày chỉ có 24 tiếng.
                        </div>
                      </div>

                      {/* II. Định nghĩa Solopreneur */}
                      <div className="space-y-2.5 pl-2 sm:pl-3 border-l-2 border-[#C59B27]/40">
                        <h6 className="text-xs sm:text-sm font-bold text-[#A82222]">
                          II. Định nghĩa Solopreneur trong kỷ nguyên AI
                        </h6>
                        <p className="text-xs sm:text-sm text-[#5C4D49] leading-relaxed">
                          Solopreneur không có nghĩa là bạn phải làm mọi việc bằng sức người. Solopreneur hiện đại là người làm chủ một doanh nghiệp tinh gọn, nơi:
                        </p>
                        <ul className="text-xs sm:text-sm text-[#2E2522] space-y-1.5 list-none pl-0">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                            <span>Bạn giữ vai trò <strong>Kiến trúc sư trưởng & Giám đốc chiến lược</strong>.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                            <span>Toàn bộ các công việc tốn thời gian, lặp đi lặp lại được giao phó cho <strong>Hệ thống tự động hóa và Trợ lý AI</strong>.</span>
                          </li>
                        </ul>
                      </div>

                      {/* EXPANDABLE "ĐỌC THÊM" CONTAINER */}
                      {isSampleExpanded ? (
                        <div className="space-y-6 pt-4 border-t border-[#EADFC9]/50 animate-fadeIn">
                          
                          {/* III. Thiết lập Đội ngũ AI ảo */}
                          <div className="space-y-3.5 pl-2 sm:pl-3 border-l-2 border-[#C59B27]">
                            <h6 className="text-xs sm:text-sm font-bold text-[#A82222]">
                              III. Thiết lập &quot;Đội ngũ AI&quot; ảo cho doanh nghiệp 1 người
                            </h6>
                            <p className="text-xs sm:text-sm text-[#5C4D49]">
                              Thay vì tốn hàng chục triệu đồng thuê đội ngũ marketing cồng kềnh, bạn có thể sở hữu ngay &quot;ban giám đốc ảo&quot;:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                              <div className="p-4 rounded-xl bg-white border border-[#EADFC9] shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-2 text-[#A82222] font-bold text-xs">
                                  <Bot className="w-4 h-4" />
                                  <span>ChatGPT / Claude</span>
                                </div>
                                <div className="text-[11px] font-semibold text-[#2E2522]">Trưởng phòng Marketing</div>
                                <p className="text-[10px] text-stone-500 leading-normal">
                                  Lên ý tưởng, viết bài chuẩn tâm lý, xuất bản kịch bản video ngắn triệu view chỉ trong vài phút.
                                </p>
                              </div>

                              <div className="p-4 rounded-xl bg-white border border-[#EADFC9] shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-2 text-[#C59B27] font-bold text-xs">
                                  <Palette className="w-4 h-4" />
                                  <span>Canva AI</span>
                                </div>
                                <div className="text-[11px] font-semibold text-[#2E2522]">Giám đốc Thiết kế</div>
                                <p className="text-[10px] text-stone-500 leading-normal">
                                  Tạo banner, poster, hình ảnh sản phẩm chuyên nghiệp, xóa nền ghép cảnh chỉ trong 30 giây.
                                </p>
                              </div>

                              <div className="p-4 rounded-xl bg-white border border-[#EADFC9] shadow-2xs space-y-1.5">
                                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                                  <FileText className="w-4 h-4" />
                                  <span>Notion AI</span>
                                </div>
                                <div className="text-[11px] font-semibold text-[#2E2522]">Thư ký Vận hành</div>
                                <p className="text-[10px] text-stone-500 leading-normal">
                                  Lưu trữ quy trình chuẩn SOP, quản lý kho hàng và theo dõi công việc hàng ngày không lo sót việc.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* BÍ KÍP TRÍCH XUẤT TỪ CHƯƠNG 3 */}
                          <div className="p-5 rounded-2xl bg-[#FFFEEB] border border-[#FBE6B5] space-y-4">
                            <div className="flex items-center gap-2">
                              <span className="text-base">💡</span>
                              <h6 className="text-xs sm:text-sm font-bold text-[#8A6D1C] uppercase tracking-wide">
                                BÍ KÍP TRÍCH XUẤT TỪ CHƯƠNG 3: CÔNG THỨC PROMPT ĐỈNH CAO CHO E-COMMERCE
                              </h6>
                            </div>

                            <p className="text-xs text-[#4A3B18] leading-relaxed">
                              Sai lầm lớn nhất khi dùng AI là đưa ra câu lệnh quá chung chung (VD: <em>&quot;Viết cho tôi bài bán áo&quot;</em>). Để AI viết chuẩn văn phong chuyên gia, hãy áp dụng <strong>Công thức PRED Framework</strong>:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                              <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 space-y-1">
                                <span className="font-extrabold text-[#A82222] block">P (Personas - Vai trò):</span>
                                <span className="text-stone-600 text-[11px]">Gán vai trò cho AI (VD: Đóng vai trò Chuyên gia Copywriting hàng đầu...).</span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 space-y-1">
                                <span className="font-extrabold text-[#C59B27] block">R (Rule & Context - Quy tắc & Bối cảnh):</span>
                                <span className="text-stone-600 text-[11px]">Hoàn cảnh hiện tại, tệp khách hàng mục tiêu cần tiếp cận.</span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 space-y-1">
                                <span className="font-extrabold text-blue-700 block">E (Execution Task - Nhiệm vụ):</span>
                                <span className="text-stone-600 text-[11px]">Việc cụ thể cần làm (Viết bài bán hàng AIDA, kịch bản video...).</span>
                              </div>
                              <div className="p-3 rounded-xl bg-white border border-[#EADFC9]/70 space-y-1">
                                <span className="font-extrabold text-emerald-700 block">D (Deliverable Format - Đầu ra):</span>
                                <span className="text-stone-600 text-[11px]">Hình thức trình bày (Gạch đầu dòng, rõ ràng, văn phong truyền cảm hứng).</span>
                              </div>
                            </div>

                            {/* Prompt Example Box with 1-click Copy */}
                            <div className="space-y-2 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-[#8A6D1C]">Ví dụ Prompt viết bài AIDA thực chiến:</span>
                                <button
                                  type="button"
                                  onClick={handleCopyPrompt}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#C59B27] text-[#8A6D1C] hover:bg-[#FDF8EB] text-[10px] font-bold transition-colors cursor-pointer"
                                >
                                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                  {copiedPrompt ? 'Đã sao chép prompt!' : 'Sao chép Prompt'}
                                </button>
                              </div>
                              <div className="p-3.5 rounded-xl bg-[#2D2A26] text-[#E6C665] font-mono text-[11px] leading-relaxed border border-[#3D3833]">
                                &quot;{aidaPromptText}&quot;
                              </div>
                            </div>
                          </div>

                          {/* TỔNG KẾT BẢN ĐỌC THỬ */}
                          <div className="p-5 rounded-2xl bg-[#FBEAEA] border border-[#F5CACA] space-y-3 text-center sm:text-left">
                            <h6 className="text-xs sm:text-sm font-extrabold text-[#A82222] uppercase tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
                              <span>🎯</span> TỔNG KẾT BẢN ĐỌC THỬ
                            </h6>
                            <p className="text-xs text-[#5C4D49] leading-relaxed">
                              Bạn vừa điểm qua những tư duy cốt lõi nhất giúp một Solopreneur giải phóng 80% thời gian thủ công nhờ AI.
                            </p>
                            <div className="p-3.5 rounded-xl bg-white border border-[#F5CACA] text-xs text-[#2E2522] leading-relaxed space-y-1">
                              <p className="font-bold text-[#A82222]">
                                👉 Sở hữu ngay trọn bộ Cẩm nang toàn diện:
                              </p>
                              <p className="text-stone-600 text-[11px]">
                                Full Ebook PDF + Checklist 90 Ngày + Bộ Prompt độc quyền + Quyền tham gia Cộng đồng hỗ trợ trọn đời chỉ với mức giá ưu đãi đặc biệt: <strong className="text-[#A82222] text-sm">59K</strong>.
                              </p>
                            </div>
                            <p className="text-[11px] text-stone-500 italic">
                              📌 Liên hệ trực tiếp hoặc quét mã QR VietQR phía dưới để nhận toàn bộ tài liệu ngay hôm nay!
                            </p>
                          </div>

                        </div>
                      ) : (
                        /* Gradient overlay preview when collapsed */
                        <div className="relative pt-6">
                          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-t from-[#FFFDF9] to-transparent pointer-events-none" />
                        </div>
                      )}

                      {/* TOGGLE "ĐỌC THÊM" BUTTON */}
                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => setIsSampleExpanded(!isSampleExpanded)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-stone-50 border-2 border-[#C59B27] text-[#C59B27] hover:text-[#A9831E] font-bold text-xs shadow-xs transition-all cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          {isSampleExpanded ? 'Thu Gọn Bản Đọc Thử' : 'Đọc Thêm: Đội Ngũ AI & Bí Kíp Prompt (Chương 3)'}
                          {isSampleExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                    </div>

                  </div>

                  {/* Immediate Action Banner to Buy 59K */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#851818] to-[#A82222] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="text-xs font-bold text-[#E6C665] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Ưu Đãi Trực Tiếp Chỉ 59K
                      </div>
                      <h5 className="font-extrabold text-sm sm:text-base">
                        Sở hữu trọn bộ Full Ebook & Bộ Prompt AI ngay hôm nay
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleScrollToRegister('solopreneur_ai')}
                      className="px-6 py-3 rounded-full bg-[#E6C665] hover:bg-[#D4AC38] text-black font-black text-xs tracking-wide shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      Nhận Ebook & Quét Mã QR 59K
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 2: LỘ TRÌNH HUẤN LUYỆN 12 CHƯƠNG */}
              {activeTab === 'sessions' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#2E2522] uppercase tracking-wider flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] mr-2" />
                    Lộ trình huấn luyện thực chiến 12 chương:
                  </h4>
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
                </div>
              )}

              {/* TAB 3: EBOOK LỘ TRÌNH 6 CHƯƠNG */}
              {activeTab === 'ebook' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#2E2522] uppercase tracking-wider flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] mr-2" />
                    Nội dung cốt lõi của Ebook Lộ Trình 6 Chương:
                  </h4>
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
                </div>
              )}

              {/* Special Gifts Included */}
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
                    <span><strong>Checklist 90 ngày bứt phá doanh số & Bản đồ quy trình Solopreneur</strong> in ra dán tường tiện theo dõi.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* STEP: REGISTRATION & PAYMENT GATEWAY CONTAINER */}
            <div id="dang-ky-ebook" className="space-y-6 scroll-mt-28">
              {!isCheckoutOpen ? (
                <div className="bg-white rounded-3xl border border-[#EADFC9] p-8 shadow-md space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#A82222] bg-[#FBEAEA] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      BƯỚC 1: CHỌN GÓI & ĐIỀN THÔNG TIN
                    </span>
                    <h3 className="text-lg font-bold text-[#2E2522] pt-1">Đăng ký nhận cẩm nang & các gói đồng hành</h3>
                    <p className="text-xs text-[#5C4D49]">
                      Chị hãy chọn một gói giải pháp phù hợp bên dưới để nhận tài liệu chính xác qua Email và Zalo:
                    </p>
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
                        <label className="text-xs font-bold text-[#5C4D49]">Số điện thoại / Zalo</label>
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
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Đang gửi thông tin...' : `Tiếp Tục Thanh Toán ${selectedPackage.name.toUpperCase()} - ${selectedPackage.priceStr}`}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </form>
                </div>
              ) : (
                /* HIGH CONVERSION PAYMENT GATEWAY BOX */
                <div id="thong-tin-thanh-toan" className="bg-white rounded-3xl border-2 border-[#C59B27] p-8 shadow-xl space-y-6 transition-all duration-300">
                  
                  {isSubmitted ? (
                    <div className="text-center py-6 space-y-5">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                        <Check className="w-8 h-8 stroke-[3px] animate-bounce" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-[#2E2522]">Xác nhận gửi yêu cầu thành công!</h4>
                        <p className="text-xs text-[#5C4D49] max-w-md mx-auto leading-relaxed">
                          Cảm ơn chị <strong>{formData.fullName}</strong>. An đã nhận được yêu cầu sở hữu tài liệu từ chị.
                        </p>
                      </div>

                      {/* Instant Access & Download Box with Full 38-Page Ebook */}
                      <div className="p-6 rounded-2xl bg-[#FFFDF9] border-2 border-dashed border-[#C59B27] text-left max-w-lg mx-auto space-y-4 shadow-sm">
                        <div className="flex items-center justify-between border-b border-[#EADFC9]/60 pb-3">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-[#C59B27] shrink-0 animate-pulse" />
                            <h5 className="text-sm font-extrabold text-[#2E2522] uppercase tracking-wider font-sans">
                              {selectedPackageId === 'solopreneur_ai'
                                ? 'Tải Ebook PDF Bản Đầy Đủ 38 Trang:'
                                : `Tài Liệu ${selectedPackage.name}:`}
                            </h5>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                            Đã Mở Khóa
                          </span>
                        </div>

                        <p className="text-xs text-stone-700 leading-relaxed">
                          {selectedPackageId === 'solopreneur_ai'
                            ? 'Chúc mừng chị! Hệ thống đã ghi nhận yêu cầu sở hữu Cẩm nang Vận Hành Doanh Nghiệp 1 Người Bằng AI. Chị có thể tải file PDF bản đẹp (38 trang) về máy hoặc đọc trực tuyến ngay tại đây:'
                            : `Chúc mừng chị đã đăng ký thành công ${selectedPackage.name}! Chị có thể bấm tải/mở tài liệu Ebook ngay bên dưới. Coach Tống An sẽ chủ động liên hệ với chị qua Zalo ${formData.phoneZalo} để kích hoạt đầy đủ quyền lợi nhé!`}
                        </p>
                        
                        {/* Download & Read Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {/* 1. Open/Download 38-page printable PDF */}
                          <a
                            href={FULL_EBOOK_INFO.downloadPdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
                          >
                            <Download className="w-4 h-4 shrink-0" />
                            <span>Tải / Lưu File PDF (38 Trang)</span>
                          </a>

                          {/* 2. Interactive In-App Full Ebook Reader */}
                          <button
                            type="button"
                            onClick={() => setIsFullEbookModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C59B27] hover:bg-[#A9831E] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
                          >
                            <BookOpen className="w-4 h-4 shrink-0" />
                            <span>Đọc Trực Tuyến Bản Full</span>
                          </button>
                        </div>

                        {/* 3. Google Sheets Master Workspace Link */}
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                          <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                            <span>📊</span> Tặng kèm File Google Sheets 90-Day Master:
                          </div>
                          <p className="text-[11px] text-emerald-900 leading-normal">
                            Bảng tính quản lý công việc hàng ngày, ma trận content và theo dõi tiến độ theo đúng Phụ lục sách:
                          </p>
                          <a
                            href={FULL_EBOOK_INFO.googleSheetsUrl1}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 underline text-[11px] pt-0.5"
                          >
                            Bấm vào đây để mở và sao chép Google Sheets Master
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Zalo Group Joining Box */}
                      <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-dashed border-[#0068FF]/50 text-left max-w-md mx-auto space-y-3 shadow-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-[#0068FF] animate-ping" />
                          <h5 className="text-xs font-bold text-[#0068FF] uppercase tracking-wider">
                            Quan Trọng: Tham Gia Nhóm Zalo Nhận Tài Liệu & Hỗ Trợ
                          </h5>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          Đồng thời, chị hãy tham gia ngay nhóm Zalo để nhận thêm các tài liệu hướng dẫn, file bổ trợ thực hành và kết nối trực tiếp với An nhé!
                        </p>
                        <a
                          href="https://zalo.me/g/fsuvf5aok5adpz7krl1b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0068FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Tham gia Nhóm Zalo Nhận Tài Liệu & Hỗ Trợ
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
                            BƯỚC 2: THANH TOÁN SỞ HỮU
                          </span>
                          <h4 className="text-base font-bold text-[#2E2522] mt-1.5">
                            Hướng dẫn chuyển khoản sở hữu {selectedPackage.name}
                          </h4>
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
                              <span className="font-black text-[#A82222] text-base">{bankInfo.price}</span>
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
                            <span>Hệ thống ghi nhận và đối soát tự động. Chị hãy nhấn nút phía dưới sau khi đã thực hiện chuyển tiền thành công.</span>
                          </div>
                        </div>

                        {/* Right: QR scan box */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] border border-[#EADFC9]/80 rounded-2xl">
                          <div className="relative p-2 bg-white rounded-xl shadow-xs border border-stone-200 w-40 h-40 flex items-center justify-center overflow-hidden">
                            <img
                              src={`https://img.vietqr.io/image/970405-7105205437270-compact2.jpg?amount=${selectedPackage.priceVal}&addInfo=${selectedPackage.qrPrefix}%20${encodeURIComponent(formData.phoneZalo || '')}&accountName=TONG%20THI%20THUY%20AN`}
                              alt={`VietQR code ${selectedPackage.name}`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=200&auto=format&fit=crop";
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-3 flex items-center gap-1">
                            <QrCode className="w-3.5 h-3.5 text-[#C59B27]" /> Quét Mã VietQR ({selectedPackage.priceStr})
                          </span>
                          <span className="text-[9px] text-[#5C4D49] text-center font-light mt-1">Hỗ trợ tất cả app ngân hàng di động</span>
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

      </div>

      {/* Interactive In-App Full Ebook Reader Modal */}
      <FullEbookModal
        isOpen={isFullEbookModalOpen}
        onClose={() => setIsFullEbookModalOpen(false)}
        buyerName={formData.fullName}
      />
    </section>
  );
}
