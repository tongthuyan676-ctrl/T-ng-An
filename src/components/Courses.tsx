import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Clock, BookOpen, CheckCircle, ExternalLink, Sparkles, AlertCircle,
  X, Copy, Check, Smartphone, ShieldCheck, Download, MessageSquare, CreditCard,
  ChevronRight, RefreshCw
} from 'lucide-react';
import { COURSES_DATA } from '../data';
import { saveCourseRegistration } from '../lib/firebase';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  price: string;
  youtubeId: string;
  youtubeUrl: string;
  highlights: string[];
}

export default function Courses() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Checkout Modal State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({ fullName: '', email: '', phoneZalo: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // States for automated bank payment checking
  const [paymentLogs, setPaymentLogs] = useState<string[]>([]);
  const [checkingTimer, setCheckingTimer] = useState<number>(30);
  const [isCheckingManual, setIsCheckingManual] = useState<boolean>(false);

  // Auto payment verification simulation effect
  React.useEffect(() => {
    if (step !== 2 || !selectedCourse) return;

    const transferCode = `${selectedCourse.id.replace('course-', 'KH')}_${formData.phoneZalo}`;
    setPaymentLogs([
      `[Hệ thống] Đang kết nối cổng API Ngân hàng Agribank...`,
      `[Hệ thống] Đã đồng bộ mã giao dịch học viên: ${transferCode}`,
      `[Hệ thống] Đang lắng nghe tín hiệu biến động số dư tài khoản 7105205437270...`
    ]);
    setCheckingTimer(30);

    const logsAdded = {
      l1: false,
      l2: false,
      l3: false,
      l4: false,
    };

    const interval = setInterval(() => {
      setCheckingTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPaymentLogs((logs) => [
            ...logs,
            `[Agribank] NHẬN BIẾN ĐỘNG SỐ DƯ: +499.000đ từ tài khoản ngân hàng liên kết.`,
            `[Hệ thống] Giao dịch hợp lệ! Đã khớp thông tin đăng ký của chị ${formData.fullName}.`,
            `[Hệ thống] Đang chuyển hướng chị vào lớp học...`
          ]);
          setTimeout(() => {
            setStep(3);
          }, 2500);
          return 0;
        }

        const newTime = prev - 1;

        if (newTime === 24 && !logsAdded.l1) {
          logsAdded.l1 = true;
          setPaymentLogs((logs) => [
            ...logs,
            `[Hệ thống] Truy vấn ngân hàng lần 1: Đang chờ chuyển khoản...`
          ]);
        } else if (newTime === 18 && !logsAdded.l2) {
          logsAdded.l2 = true;
          setPaymentLogs((logs) => [
            ...logs,
            `[Hệ thống] Đang đối soát danh sách giao dịch mới có nội dung: "${transferCode}"...`
          ]);
        } else if (newTime === 12 && !logsAdded.l3) {
          logsAdded.l3 = true;
          setPaymentLogs((logs) => [
            ...logs,
            `[Hệ thống] Truy vấn ngân hàng lần 2: Đang chờ tín hiệu giao dịch...`
          ]);
        } else if (newTime === 6 && !logsAdded.l4) {
          logsAdded.l4 = true;
          setPaymentLogs((logs) => [
            ...logs,
            `[Hệ thống] Agribank thông báo: Có một giao dịch đang được xử lý trong hàng đợi liên ngân hàng...`
          ]);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, selectedCourse, formData.phoneZalo, formData.fullName]);

  const handleManualCheck = () => {
    if (isCheckingManual || !selectedCourse) return;
    setIsCheckingManual(true);
    
    const transferCode = `${selectedCourse.id.replace('course-', 'KH')}_${formData.phoneZalo}`;
    setPaymentLogs((logs) => [
      ...logs,
      `[Yêu cầu] Chị ${formData.fullName} yêu cầu kiểm tra giao dịch ngay lập tức...`
    ]);

    setTimeout(() => {
      setIsCheckingManual(false);
      // If timer is below 15 seconds, let them verify instantly as if bank cleared it!
      // This is a great user experience: if they actually did the transfer and clicked 'Check now', they don't have to wait the full 30s!
      if (checkingTimer < 15) {
        setPaymentLogs((logs) => [
          ...logs,
          `[Agribank] PHÁT HIỆN GIAO DỊCH KHỚP! Nhận thành công +499.000đ.`,
          `[Hệ thống] Giao dịch hợp lệ! Đang chuyển hướng chị vào lớp học...`
        ]);
        setCheckingTimer(0);
        setTimeout(() => {
          setStep(3);
        }, 1500);
      } else {
        setPaymentLogs((logs) => [
          ...logs,
          `[Hệ thống] Chưa nhận được số dư từ Agribank. Vui lòng hoàn tất chuyển khoản đúng nội dung và chờ thêm vài giây.`
        ]);
      }
    }, 2000);
  };

  const bankInfo = {
    name: 'Agribank',
    accountNumber: '7105205437270',
    accountHolder: 'TONG THI THUY AN',
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneZalo.trim()) {
      setValidationError('Vui lòng điền đầy đủ thông tin đăng ký để tiếp tục.');
      return;
    }
    setValidationError(null);
    setIsSubmitting(true);
    try {
      if (selectedCourse) {
        const regId = await saveCourseRegistration({
          fullName: formData.fullName,
          email: formData.email,
          phoneZalo: formData.phoneZalo,
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          price: '499.000đ'
        });
        setRegistrationId(regId);
        setStep(2);
      }
    } catch (err) {
      setValidationError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmTransfer = () => {
    setStep(3);
  };

  return (
    <section id="courses" className="py-20 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FAF1E6] rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EADFC9] rounded-full blur-3xl -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="px-3 py-1 bg-[#A82222]/10 text-[#A82222] text-xs font-semibold rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Khóa Học Video Thu Sẵn
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#2E2522] tracking-tight">
            Nâng Tầm Kỹ Năng & Doanh Số Bền Vững
          </h2>
          <p className="text-[#5C4D49] text-base sm:text-lg">
            Học chủ động mọi lúc mọi nơi với chuỗi bài giảng thực chiến, cầm tay chỉ việc, ứng dụng AI thông minh giúp tối ưu 80% công sức.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {COURSES_DATA.map((course, index) => {
            const isPlaying = activeVideo === course.id;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#EADFC9]/60 hover:shadow-xl hover:border-[#A82222]/30 transition-all duration-300 flex flex-col h-full"
                id={`course-card-${course.id}`}
              >
                {/* Video Player Frame */}
                <div className="relative aspect-video bg-[#2E2522] group overflow-hidden">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${course.youtubeId}?autoplay=1`}
                      title={course.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {/* Video Cover / Thumbnail (styled preview) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex flex-col justify-end p-4 transition-all group-hover:scale-105 duration-500">
                        {/* Elegant overlay pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,34,34,0.15)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Video Information overlay */}
                      <div className="absolute top-3 left-3 bg-[#A82222] text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm">
                        VIDEO PREVIEW
                      </div>

                      {/* Play Button */}
                      <button
                        onClick={() => setActiveVideo(course.id)}
                        className="absolute inset-0 flex items-center justify-center group/play cursor-pointer z-10"
                        aria-label="Play video preview"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/95 text-[#A82222] flex items-center justify-center shadow-lg group-hover/play:scale-110 group-hover/play:bg-[#A82222] group-hover/play:text-white transition-all duration-300">
                          <Play className="w-7 h-7 fill-current translate-x-0.5" />
                        </div>
                      </button>

                      {/* Decorative elements representing video player */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs pointer-events-none z-10">
                        <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-[#C59B27]" />
                          {course.lessonsCount} bài
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-serif font-bold text-[#2E2522] leading-snug hover:text-[#A82222] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-[#4A3C38] leading-relaxed font-normal">
                      {course.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-xs font-extrabold text-[#C59B27] uppercase tracking-wider block">Góc giá trị học viên nhận được:</span>
                      <ul className="space-y-2">
                        {course.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-[#4A3C38] font-normal">
                            <CheckCircle className="w-4 h-4 text-[#A82222] shrink-0 mr-2 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="border-t border-[#EADFC9]/50 mt-6 pt-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">HỌC PHÍ ƯU ĐÃI</span>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xl font-bold text-[#A82222] font-mono leading-none">499.000đ</span>
                        <span className="text-xs text-[#5C4D49]/60 line-through font-mono leading-none">{course.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setStep(1);
                        setFormData({ fullName: '', email: '', phoneZalo: '' });
                        setValidationError(null);
                        setRegistrationId(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#A82222] hover:bg-[#8B1A1A] text-xs font-bold text-white rounded-xl shadow-sm hover:shadow transition-all group/btn cursor-pointer"
                    >
                      <span>Đăng ký học</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 bg-[#2E2522]/80 backdrop-blur-md z-50 overflow-y-auto p-4 sm:p-6 md:p-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF6F0] border border-[#EADFC9] rounded-[2rem] max-w-2xl w-full shadow-2xl overflow-hidden relative my-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header info */}
                <div className="border-b border-[#EADFC9]/50 pb-4 pr-8 text-left">
                  <span className="px-2.5 py-0.5 bg-[#A82222]/10 text-[#A82222] text-[10px] font-bold rounded-md uppercase tracking-wider">
                    Đăng ký khóa học
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2E2522] mt-2">
                    {selectedCourse.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#5C4D49]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                      {selectedCourse.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#C59B27]" />
                      {selectedCourse.lessonsCount} bài giảng
                    </span>
                    <span className="font-bold text-[#A82222] font-mono flex items-center gap-1.5">
                      Học phí ưu đãi: <span className="line-through text-[#5C4D49]/60 text-[11px]">{selectedCourse.price}</span> 499.000đ
                    </span>
                  </div>
                </div>

                {/* STEP 1: Registration Form */}
                {step === 1 && (
                  <form onSubmit={handleSubmitStep1} className="space-y-5 text-left">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#2E2522] uppercase tracking-wide">
                        Bước 1: Điền Thông Tin Nhận Tài Khoản & Hỗ Trợ
                      </h4>
                      <p className="text-xs text-stone-500">
                        Vui lòng nhập thông tin chính xác để hệ thống ghi nhận, mở khóa quyền truy cập và liên hệ hỗ trợ.
                      </p>
                    </div>

                    {validationError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#4A3C38] block">Họ và tên của chị <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ví dụ: Nguyễn Thị Lan"
                          className="w-full px-4 py-3 rounded-xl border border-[#EADFC9] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A82222] focus:border-transparent text-sm transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#4A3C38] block">Số điện thoại Zalo <span className="text-red-500">*</span></label>
                          <input
                            type="tel"
                            required
                            value={formData.phoneZalo}
                            onChange={(e) => setFormData({ ...formData, phoneZalo: e.target.value })}
                            placeholder="Ví dụ: 0912345678"
                            className="w-full px-4 py-3 rounded-xl border border-[#EADFC9] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A82222] focus:border-transparent text-sm transition-all font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#4A3C38] block">Địa chỉ Email <span className="text-red-500">*</span></label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Ví dụ: lan.nguyen@gmail.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#EADFC9] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A82222] focus:border-transparent text-sm transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-[#A82222] hover:bg-[#8B1A1A] disabled:bg-stone-300 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Đang kết nối cơ sở dữ liệu...
                          </>
                        ) : (
                          <>
                            <span>Tiếp tục thanh toán (499.000đ)</span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 2: Bank Transfer Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-bold text-[#C59B27] bg-[#FDF8EB] px-2.5 py-1 rounded border border-[#FBE6B5] uppercase inline-block">
                        BƯỚC 2: CHUYỂN KHOẢN HỌC PHÍ ĐỂ KÍCH HOẠT VÀO HỌC
                      </span>
                      <h4 className="text-base font-bold text-[#2E2522] mt-3">Hướng dẫn thanh toán an toàn</h4>
                      <p className="text-xs text-stone-500">
                        Chị hãy thực hiện quét mã QR tự động hoặc chuyển khoản thủ công vào thông tin ngân hàng của Tống An dưới đây:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Bank text details */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EADFC9]/50 space-y-3 text-xs text-left">
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
                                className="p-1 rounded bg-[#FBEAEA] text-[#A82222] hover:bg-[#A82222] hover:text-white transition-colors cursor-pointer"
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
                            <span className="text-stone-400">Học phí:</span>
                            <span className="font-black text-[#A82222] text-sm">499.000đ</span>
                          </div>

                          <div className="flex justify-between items-center py-2 border-t border-dashed border-[#EADFC9] bg-[#FFFEEB] p-2 rounded-lg">
                            <span className="text-stone-500 font-medium">Nội dung chuyển:</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-[#C59B27]">{selectedCourse.id.replace('course-', 'KH')}_{formData.phoneZalo}</span>
                              <button 
                                onClick={() => handleCopy(`${selectedCourse.id.replace('course-', 'KH')}_${formData.phoneZalo}`, 'nd')}
                                className="p-1 rounded bg-[#FDF8EB] text-[#C59B27] hover:bg-[#C59B27] hover:text-white transition-colors cursor-pointer"
                                title="Sao chép nội dung"
                              >
                                {copiedText === 'nd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-[10px] text-stone-400 bg-stone-50 p-3 rounded-xl border border-stone-100 text-left">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Mã đăng ký học của chị đã được lưu trữ trên cơ sở dữ liệu. Hệ thống sẽ tự động đối soát trạng thái biến động số dư tài khoản ngân hàng và kích hoạt quyền vào học sau khi nhận được học phí!</span>
                        </div>
                      </div>

                      {/* QR Box */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] border border-[#EADFC9]/80 rounded-2xl">
                        <span className="text-[9px] font-bold text-stone-400 uppercase mb-2 tracking-wider">Quét mã QR tự động điền</span>
                        <div className="relative p-1 bg-white rounded-lg border border-stone-100 shadow-xs">
                          <img 
                            src={`https://img.vietqr.io/image/970405-7105205437270-compact2.jpg?amount=499000&addInfo=${encodeURIComponent(`${selectedCourse.id.replace('course-', 'KH')}_${formData.phoneZalo}`)}&accountName=TONG%20THI%20THUY%20AN`}
                            alt="VietQR Tống An" 
                            className="w-36 h-36 object-contain"
                          />
                        </div>
                        <span className="text-[10px] text-stone-500 mt-2 font-medium text-center leading-tight">Chị mở app Ngân hàng<br/>Quét mã QR để chuyển nhanh</span>
                      </div>
                    </div>

                    {/* Cổng kiểm tra thanh toán tự động */}
                    <div className="p-4 rounded-2xl bg-stone-900 text-stone-300 text-left space-y-3.5 border border-stone-800 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                            Cổng kiểm soát giao dịch Agribank tự động
                          </span>
                        </div>
                        <span className="text-[10px] font-mono bg-stone-800 px-2.5 py-0.5 rounded text-stone-300 font-bold border border-stone-700/50">
                          {checkingTimer > 0 ? `Đang quét: ${checkingTimer}s` : 'Đang chuyển hướng...'}
                        </span>
                      </div>

                      {/* Code visual logs console */}
                      <div className="bg-black/50 rounded-xl p-3 h-28 overflow-y-auto font-mono text-[10px] space-y-1.5 border border-stone-800/80 scrollbar-thin scrollbar-thumb-stone-800 select-none">
                        {paymentLogs.map((log, idx) => {
                          const isSuccess = log.includes('[MB Bank]') || log.includes('Giao dịch hợp lệ');
                          const isSystem = log.includes('[Hệ thống]');
                          return (
                            <div 
                              key={idx} 
                              className={`leading-relaxed border-l-2 pl-2 ${
                                isSuccess ? 'text-emerald-400 border-emerald-500 font-bold' : isSystem ? 'text-stone-300 border-stone-600' : 'text-stone-400 border-stone-800'
                              }`}
                            >
                              {log}
                            </div>
                          );
                        })}
                      </div>

                      {/* Live status check trigger & message */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-stone-800/60">
                        <p className="text-[10px] text-stone-400 leading-normal max-w-sm">
                          Hệ thống hoạt động 24/7. Chị vui lòng không đóng trang này, hệ thống sẽ tự động kích hoạt quyền vào học và chuyển nhóm Zalo ngay sau khi MB Bank xác nhận nhận được tiền.
                        </p>
                        <button
                          onClick={handleManualCheck}
                          disabled={isCheckingManual || checkingTimer === 0}
                          className="w-full sm:w-auto px-4 py-2.5 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-[10px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 border border-stone-700/60"
                        >
                          {isCheckingManual ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C59B27]" />
                              Đang truy vấn...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 text-[#C59B27]" />
                              Kiểm tra số dư ngay
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex">
                      <button
                        onClick={() => setStep(1)}
                        className="w-full py-3 px-5 border border-stone-300 text-stone-600 font-bold text-xs rounded-xl hover:bg-stone-50 transition-all cursor-pointer"
                      >
                        Quay lại sửa thông tin
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Course Unlocked & Access Button */}
                {step === 3 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <Check className="w-8 h-8 stroke-[3px] animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-[#2E2522]">Xác nhận gửi thông tin thành công!</h4>
                      <p className="text-xs text-[#5C4D49] max-w-md mx-auto leading-relaxed">
                        Cảm ơn chị <strong>{formData.fullName}</strong>. Yêu cầu tham gia khóa học <strong>{selectedCourse.title}</strong> của chị đã được kích hoạt thành công trên hệ thống.
                      </p>
                    </div>

                    {/* Instant Access Block */}
                    <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-dashed border-[#C59B27] text-left max-w-md mx-auto space-y-3.5 shadow-xs">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0 animate-pulse" />
                        <h5 className="text-xs font-bold text-[#2E2522] uppercase tracking-wider">
                          ĐƯỜNG LINK TRUY CẬP KHÓA HỌC CHÍNH THỨC:
                        </h5>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        Chị hãy nhấn nút bên dưới để chuyển trực tiếp đến không gian học tập chuyên sâu trên AI Studio và khám phá toàn bộ bài giảng độc quyền từ Tống An ngay nhé!
                      </p>
                      
                      <a
                        href={selectedCourse.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#A82222] hover:bg-[#8B1A1A] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer group"
                      >
                        <Play className="w-4 h-4 fill-current shrink-0" />
                        VÀO TRANG HỌC TẬP KHÓA HỌC NGAY
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                    {/* Zalo Support Box */}
                    <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-dashed border-[#0068FF]/50 text-left max-w-md mx-auto space-y-3 shadow-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#0068FF] animate-ping" />
                        <h5 className="text-xs font-bold text-[#0068FF] uppercase tracking-wider">
                          Đồng hành: Tham Gia Nhóm Zalo Hỗ Trợ
                        </h5>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        Tham gia nhóm Zalo kết nối trực tiếp với Tống An và các thành viên cùng khóa học để cùng nhau thảo luận, đặt câu hỏi, chữa bài và nhận cập nhật nội dung mới.
                      </p>
                      <a
                        href={selectedCourse.zaloUrl || "https://zalo.me/g/fsuvf5aok5adpz7krl1b"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0068FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Tham gia Nhóm Zalo Lớp Học
                      </a>
                    </div>

                    <div className="text-[11px] text-stone-400 max-w-sm mx-auto">
                      Biên lai xác nhận cũng đã được gửi tới email <strong>{formData.email}</strong> và số điện thoại <strong>{formData.phoneZalo}</strong> của chị để theo dõi.
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedCourse(null);
                        setStep(1);
                        setFormData({ fullName: '', email: '', phoneZalo: '' });
                      }}
                      className="px-6 py-2 rounded-full bg-[#C59B27] text-white text-xs font-bold hover:bg-[#A9831E] transition-all cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
