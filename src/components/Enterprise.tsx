import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Building2, User, Phone, Mail, FileText, CheckCircle2, Sparkles, ArrowRight, Loader2, Award, Briefcase, Zap } from 'lucide-react';
import { saveCorpRegistration } from '../lib/firebase';

export default function Enterprise() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    position: '',
    phoneZalo: '',
    email: '',
    partnershipType: 'Đào tạo nhân sự nội bộ',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await saveCorpRegistration(formData);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        position: '',
        phoneZalo: '',
        email: '',
        partnershipType: 'Đào tạo nhân sự nội bộ',
        message: ''
      });
    } catch (err: any) {
      console.error('Lỗi khi gửi đăng ký hợp tác:', err);
      setErrorMessage('Đã có lỗi xảy ra trong quá trình gửi thông tin. Chị vui lòng thử lại hoặc liên hệ trực tiếp cho An nhé.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnershipOptions = [
    'Đào tạo nhân sự nội bộ (Kỹ năng viết, Xây thương hiệu, Làm chủ AI)',
    'Coaching & Mentoring cho đội ngũ Quản lý / Key Persons',
    'Tổ chức Workshop / Talkshow / Sự kiện truyền cảm hứng',
    'Tư vấn & Thiết kế giải pháp phễu chuyển đổi cho doanh nghiệp',
    'Hình thức hợp tác khác'
  ];

  return (
    <section id="enterprise" className="py-20 bg-white relative overflow-hidden">
      {/* Background Graphic elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FAF1E6] rounded-full blur-3xl -z-10 opacity-65 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="px-3 py-1 bg-[#C59B27]/10 text-[#C59B27] text-xs font-semibold rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              B2B & Corporate Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#2E2522] tracking-tight leading-tight">
              Hợp Tác Doanh Nghiệp & Đồng Hành Phát Triển
            </h2>
            <p className="text-[#5C4D49] text-sm sm:text-base leading-relaxed">
              Tống An mang đến những chương trình đào tạo chuyên sâu và đồng hành thực chiến được may đo riêng biệt, giúp doanh nghiệp tối ưu hóa năng suất bằng AI và tăng trưởng thương hiệu bền vững.
            </p>

            {/* Values / Features */}
            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] text-[#A82222] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2E2522]">Chương trình May Đo (Customized)</h4>
                  <p className="text-xs text-[#5C4D49]">Giáo án được tối ưu trực tiếp theo lĩnh vực kinh doanh và thực trạng nhân sự của từng doanh nghiệp.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] text-[#A82222] flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2E2522]">Đồng Hành Thực Chiến</h4>
                  <p className="text-xs text-[#5C4D49]">Không chỉ dừng ở lý thuyết, An đồng hành sát sao, cam kết đầu ra bài tập thực hành ứng dụng được ngay vào công việc hàng ngày.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FAF1E6] text-[#A82222] flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2E2522]">Tiên Phong Công Nghệ AI</h4>
                  <p className="text-xs text-[#5C4D49]">Chuyển giao các bộ câu lệnh (Prompts) và quy trình ứng dụng AI thực tế giúp nhân sự tiết kiệm 60-80% thời gian nghiên cứu và viết lách.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] p-6 sm:p-10 rounded-3xl border border-[#EADFC9]/60 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EADFC9]/10 rounded-bl-full pointer-events-none" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 bg-[#27AE60]/10 text-[#27AE60] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-bold text-[#2E2522]">
                      Gửi Đề Xuất Thành Công!
                    </h3>
                    <p className="text-sm text-[#5C4D49] max-w-md mx-auto leading-relaxed">
                      Thông tin yêu cầu hợp tác doanh nghiệp của chị đã được lưu lại trong hệ thống. Tống An hoặc trợ lý sẽ trực tiếp nghiên cứu đề xuất và chủ động liên hệ lại qua Số điện thoại/Email trong vòng <strong>24 giờ làm việc</strong> để thống nhất lịch họp trao đổi cụ thể.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF9EB] border border-[#C59B27]/30 max-w-md mx-auto text-left">
                    <p className="text-xs text-[#5C4D49] leading-relaxed text-center">
                      Cảm ơn Quý doanh nghiệp đã tin tưởng lựa chọn đồng hành cùng Tống An!
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-stone-400 hover:text-stone-600 underline transition-all cursor-pointer"
                  >
                    Gửi thêm đề xuất khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-semibold text-[#2E2522]">
                      Nhận Khảo Sát & Tư Vấn Hợp Tác Doanh Nghiệp
                    </h3>
                    <p className="text-xs text-stone-500">
                      Chị hãy điền các thông tin cơ bản dưới đây để An có thể chuẩn bị tốt nhất trước buổi làm việc chính thức nhé.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600 rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tên doanh nghiệp */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#2E2522] flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#A82222]" />
                        Tên doanh nghiệp / Tổ chức *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Ví dụ: Công ty TNHH Giải Pháp Giáo Dục Việt"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#A82222] bg-white text-stone-800"
                      />
                    </div>

                    {/* Người liên hệ */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#2E2522] flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#A82222]" />
                        Người liên hệ & Chức vụ *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Ví dụ: Chị Thu Thủy (Giám đốc HR)"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#A82222] bg-white text-stone-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Số điện thoại Zalo */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#2E2522] flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#A82222]" />
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneZalo}
                        onChange={(e) => setFormData({ ...formData, phoneZalo: e.target.value })}
                        placeholder="Số điện thoại liên lạc chính"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#A82222] bg-white text-stone-800"
                      />
                    </div>

                    {/* Email công việc */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#2E2522] flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#A82222]" />
                        Email liên hệ *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email nhận đề xuất, kế hoạch"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#A82222] bg-white text-stone-800"
                      />
                    </div>
                  </div>

                  {/* Hình thức hợp tác mong muốn */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2E2522] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#A82222]" />
                      Nhu cầu / Hình thức hợp tác mong muốn *
                    </label>
                    <select
                      value={formData.partnershipType}
                      onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#A82222] bg-white text-stone-800"
                    >
                      {partnershipOptions.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nội dung chi tiết */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2E2522] flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#A82222]" />
                      Nhu cầu cụ thể hoặc câu hỏi dành cho An (nếu có)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mô tả sơ qua về quy mô đội ngũ, mục tiêu huấn luyện mong muốn hoặc chủ đề chị muốn tổ chức workshop..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#A82222] bg-white text-stone-800 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#A82222] hover:bg-[#8B1A1A] disabled:bg-stone-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang gửi thông tin đăng ký...
                      </>
                    ) : (
                      <>
                        Gửi Đăng Ký Hợp Tác Doanh Nghiệp
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
