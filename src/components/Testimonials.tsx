/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Quote, Users, Play, Video, ThumbsUp, Sparkles, Image as ImageIcon, Plus, X, Trash2, Check, MessageSquare, ArrowRight, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STATS } from '../data';

interface CustomVideo {
  id: string;
  name: string;
  role: string;
  avatar: string;
  title: string;
  quote: string;
  channelName: string;
  views: string;
  videoUrl: string;
  duration: string;
}

interface CustomImage {
  id: string;
  studentName: string;
  studentRole: string;
  caption: string;
  image: string;
}

function getYouTubeVideoId(url: string) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

function getYouTubeEmbedUrl(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
}

function isYouTubeUrl(url: string) {
  return url && (url.includes('youtube.com') || url.includes('youtu.be'));
}

function getYouTubeThumbnail(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
}

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');
  const [selectedVideo, setSelectedVideo] = useState<CustomVideo | null>(null);
  
  // Custom states stored in localStorage
  const [customVideos, setCustomVideos] = useState<CustomVideo[]>(() => {
    const saved = localStorage.getItem('custom_video_testimonials');
    return saved ? JSON.parse(saved) : [];
  });

  const [customImages, setCustomImages] = useState<CustomImage[]>(() => {
    const saved = localStorage.getItem('custom_image_testimonials');
    return saved ? JSON.parse(saved) : [];
  });

  // Forms Visibility State
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [showAddImageForm, setShowAddImageForm] = useState(false);

  // Form Fields State
  const [videoForm, setVideoForm] = useState({
    name: '',
    role: '',
    title: '',
    quote: '',
    channelName: '',
    views: '10K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-the-camera-40082-large.mp4',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  });

  const [imageForm, setImageForm] = useState({
    studentName: '',
    studentRole: '',
    caption: '',
    image: ''
  });

  // Helper to assign icons to stats
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-5 h-5 text-[#C59B27]" />;
      case 1:
        return <Video className="w-5 h-5 text-[#A82222]" />;
      case 2:
        return <Play className="w-5 h-5 text-[#C59B27]" />;
      case 3:
        return <ThumbsUp className="w-5 h-5 text-[#A82222]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C59B27]" />;
    }
  };

  const defaultVideos: CustomVideo[] = [
    {
      id: 'default-video-duoc-si-phuong',
      name: 'Dược sĩ Phương',
      role: 'Học viên Chuyển hóa Thương hiệu Cá nhân',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      title: 'Hành trình chuyển hóa phát triển từ bí ý tưởng sang tự tin làm được video xây kênh',
      quote: 'Mình vô cùng biết ơn chương trình học 1-1 đồng hành xây kênh cùng Tống An. Từ một người hoàn toàn bí ý tưởng, không biết bắt đầu từ đâu, mình đã được dẫn dắt từng bước để tự tin làm được những video hoàn chỉnh, truyền tải đúng giá trị chuyên môn của một dược sĩ đến cộng đồng.',
      channelName: '@duocsiphuong_xaykenh',
      views: '1.2M',
      videoUrl: 'https://www.youtube.com/watch?v=kh5I1idk88E',
      duration: '4:15'
    },
    {
      id: 'default-video-the-tran',
      name: 'Chị The Trần',
      role: 'Học viên khóa học Xây kênh Coach 1-1',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      title: 'Hành trình vượt qua rào cản sợ ống kính, tự tin xây thương hiệu cá nhân bền vững',
      quote: 'Phương pháp huấn luyện cầm tay chỉ việc cùng sự tận tâm, ấm áp của Tống An đã truyền động lực mạnh mẽ cho mình. Từ một người e dè, giờ mình đã tự tin sản xuất những thước phim giá trị chạm đến người nghe.',
      channelName: '@thetran_xaykenh',
      views: '680K',
      videoUrl: 'https://www.youtube.com/watch?v=c3jInMIOLY8',
      duration: '4:22'
    },
    {
      id: 'default-video-thu-thuy',
      name: 'Cô Thu Thủy',
      role: 'Học viên khóa học Xây kênh Coach 1-1',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop',
      title: 'Vượt qua mọi giới hạn để tự tin xuất hiện, trao đi giá trị chân thành',
      quote: 'Lối tư duy sâu sắc cùng sự đồng hành, cầm tay chỉ việc tận tâm của Tống An đã giúp tôi tự tin rũ bỏ mọi e dè để đứng trước ống kính. Phương pháp đơn giản hóa công nghệ bằng AI giúp một người trung niên như tôi vẫn tự tin xây kênh bài bản.',
      channelName: '@cothuthuy_xaykenh',
      views: '850K',
      videoUrl: 'https://www.youtube.com/watch?v=XFj1h4zcM_w',
      duration: '5:18'
    },
    {
      id: 'default-video-1',
      name: 'Thu Nguyệt',
      role: 'Lớp Dám quay video',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop',
      title: 'Học viên xây kênh Triệu view & Kiến tạo thương hiệu cá nhân đột phá cùng Tống An',
      quote: 'Phương pháp định vị bản thân và xây dựng phễu khách hàng tự động từ Tống An đã giúp mình tháo gỡ hoàn toàn các nút thắt trong tiếp thị nội dung. Kênh lên xu hướng nhanh chóng và đơn hàng nổ liên tục!',
      channelName: '@thunguyet_dare',
      views: '1.2M',
      videoUrl: 'https://www.youtube.com/watch?v=SjGkx2fP2b4',
      duration: '3:15'
    }
  ];

  const defaultImages = [
    {
      id: 'default-image-fb-dobao',
      studentName: 'Cô Đỗ Ba',
      studentRole: 'Chủ kênh Lớp Tiểu Học Cô Đỗ Ba',
      caption: 'Định hướng xây kênh Giáo dục Tiền Tiểu học tập trung và bứt phá hiệu quả',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
      isChatFeedback: false,
      isFacebookComment: true,
      comments: [
        {
          id: 'c1',
          author: 'Kiều Nguyễn',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
          time: '5 ngày',
          text: 'Toẹt vời! 🎉',
          isSticker: true
        },
        {
          id: 'c2',
          author: 'Lớp Tiểu Học Cô Đỗ Ba',
          avatar: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=100&auto=format&fit=crop',
          time: '4 ngày',
          text: 'Sau buổi coach 1-1 với cô Tống An, mình đã có một điều rõ ràng nhất: tập trung vào đúng một hướng đi.\n\nThay vì làm nhiều nội dung dàn trải, mình được định hướng xây dựng một kênh hoàn toàn mới, tập trung vào Giáo dục Tiền Tiểu học – nơi mình có chuyên môn, kinh nghiệm và có thể trao thật nhiều giá trị cho phụ huynh có con chuẩn bị vào lớp 1.\n\nCó một người đi trước chỉ đường sẽ giúp mình tiết kiệm rất nhiều thời gian, tránh đi sai hướng và biết mình cần tập trung vào điều gì để phát triển bền vững.\n\nCảm ơn cô Tống An vì buổi coaching rất thực tế, giúp mình nhìn rõ con đường phía trước.\n\nNếu bạn đang loay hoay chưa biết định vị bản thân, chưa biết nên tập trung vào lĩnh vực nào, bạn hãy đăng ký một buổi coach 1-1 với cô Tống An. Hiện cô đang có ưu đãi giảm giá sâu chỉ còn 199K (giá gốc 599K), nên đừng bỏ lỡ cơ hội để được định hướng rõ ràng ngay từ đầu.'
        }
      ]
    },
    {
      id: 'default-image-1',
      studentName: 'Mỹ',
      studentRole: 'Học viên lớp Dám quay video',
      caption: 'Hành trình vượt qua nỗi sợ ống kính và tự tin chia sẻ giá trị trên video',
      image: '/MY-PHHV.jpg',
      isChatFeedback: false
    },
    {
      id: 'default-image-2',
      studentName: 'Kiều Nga',
      studentRole: 'Học viên lớp Xây dựng thương hiệu',
      caption: 'Sự thay đổi ngoạn mục và những phản hồi đầy cảm xúc từ học viên Kiều Nga',
      image: '/KIEUNGA-PHHV.jpg',
      isChatFeedback: false
    },
    {
      id: 'default-image-3',
      studentName: 'Linh',
      studentRole: 'Học viên lớp Video ngắn thực chiến',
      caption: 'Tin nhắn báo tin vui về lượt xem và lượng tương tác kênh tăng đột biến',
      image: '/LINH-PHHV.jpg',
      isChatFeedback: false
    },
    {
      id: 'default-image-4',
      studentName: 'Dương Nguyễn',
      studentRole: 'Học viên khóa học Coach 1-1',
      caption: 'Sự tin tưởng và phản hồi hạnh phúc về quy trình xây dựng kịch bản bài bản',
      image: '/DUONGNGUYEN-PHHV.jpg',
      isChatFeedback: false
    },
    {
      id: 'default-image-5',
      studentName: 'An An',
      studentRole: 'Học viên lớp phễu khách hàng tự động',
      caption: 'Đơn hàng nổ liên tục và tin nhắn đăng ký dịch vụ tăng vọt sau phễu của An',
      image: '/ANAN-PHHV.jpg',
      isChatFeedback: false
    }
  ];

  // Combine default list + user-defined list
  const videos = [...defaultVideos, ...customVideos];
  const images = [...defaultImages, ...customImages];

  // Handling New Video Upload / Creation
  const handleAddVideo = (e: FormEvent) => {
    e.preventDefault();
    if (!videoForm.name || !videoForm.title || !videoForm.quote) {
      alert('Vui lòng điền các trường bắt buộc (Tên, Tiêu đề, Cảm nhận).');
      return;
    }
    const newVid: CustomVideo = {
      id: `custom-video-${Date.now()}`,
      name: videoForm.name,
      role: videoForm.role || 'Học viên của An',
      avatar: videoForm.avatar,
      title: videoForm.title,
      quote: videoForm.quote,
      channelName: videoForm.channelName || '@hocvien_an',
      views: videoForm.views || '12K',
      videoUrl: videoForm.videoUrl,
      duration: '1:00'
    };
    const updated = [newVid, ...customVideos];
    setCustomVideos(updated);
    localStorage.setItem('custom_video_testimonials', JSON.stringify(updated));
    setShowAddVideoForm(false);
    // Reset form
    setVideoForm({
      name: '',
      role: '',
      title: '',
      quote: '',
      channelName: '',
      views: '10K',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-at-the-camera-40082-large.mp4',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    });
  };

  // Handling New Feedback Image Upload
  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = (e: FormEvent) => {
    e.preventDefault();
    if (!imageForm.studentName || !imageForm.image || !imageForm.caption) {
      alert('Vui lòng điền đủ tên, tiêu đề và tải ảnh lên.');
      return;
    }
    const newImg: CustomImage = {
      id: `custom-image-${Date.now()}`,
      studentName: imageForm.studentName,
      studentRole: imageForm.studentRole || 'Học viên xuất sắc',
      caption: imageForm.caption,
      image: imageForm.image
    };
    const updated = [newImg, ...customImages];
    setCustomImages(updated);
    localStorage.setItem('custom_image_testimonials', JSON.stringify(updated));
    setShowAddImageForm(false);
    // Reset form
    setImageForm({
      studentName: '',
      studentRole: '',
      caption: '',
      image: ''
    });
  };

  // Deleting user uploaded content
  const handleDeleteVideo = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = customVideos.filter(v => v.id !== id);
    setCustomVideos(updated);
    localStorage.setItem('custom_video_testimonials', JSON.stringify(updated));
  };

  const handleDeleteImage = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = customImages.filter(img => img.id !== id);
    setCustomImages(updated);
    localStorage.setItem('custom_image_testimonials', JSON.stringify(updated));
  };

  return (
    <section className="py-24 bg-[#FAF6F0] relative overflow-hidden border-t border-[#EADFC9]/30">
      {/* Visual background lights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#A82222]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A82222] px-3 py-1 bg-[#FBEAEA] rounded-full inline-block">
            Kết Quả Thực Tế
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#2E2522]">
            Cảm nhận & Hành trình lột xác của học viên
          </h2>
          <p className="text-[#5C4D49] text-base font-light leading-relaxed">
            Hạnh phúc lớn nhất của An là được đồng hành rèn dũa, chứng kiến thành quả rực rỡ và những đánh giá chân thật của từng học viên.
          </p>
        </div>

        {/* Stats Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#EADFC9]/50 shadow-xs text-center flex flex-col justify-between items-center group hover:border-[#C59B27] hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center border border-[#EADFC9]/30 mb-4 group-hover:scale-110 transition-transform">
                {getStatIcon(idx)}
              </div>
              
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-sans font-extrabold text-[#2E2522] tracking-tight group-hover:text-[#C59B27] transition-colors">
                  {stat.value}
                </span>
                <span className="block text-xs font-semibold text-[#5C4D49]">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Beautiful Custom Tabs Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EADFC9] flex items-center space-x-1 shadow-xs">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-6 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'video'
                  ? 'bg-[#A82222] text-white shadow-md'
                  : 'text-[#5C4D49] hover:bg-[#FAF8F5]/80 hover:text-[#A82222]'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>🎥 Phần Video ({videos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-6 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'image'
                  ? 'bg-[#A82222] text-white shadow-md'
                  : 'text-[#5C4D49] hover:bg-[#FAF8F5]/80 hover:text-[#A82222]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>📸 Phần Hình Ảnh ({images.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div>
          {activeTab === 'video' ? (
            <div className="space-y-8">
              {/* Add Video Button & Form inline */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddVideoForm(!showAddVideoForm)}
                  className="px-4 py-2 bg-white border border-[#EADFC9] text-[#A82222] hover:bg-[#FAF8F5] rounded-xl font-medium text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  {showAddVideoForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{showAddVideoForm ? 'Hủy thêm video' : 'Thêm video học viên mới'}</span>
                </button>
              </div>

              {showAddVideoForm && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#EADFC9] rounded-2xl p-6 shadow-sm max-w-2xl mx-auto"
                >
                  <h3 className="text-sm font-bold text-[#2E2522] mb-4 flex items-center space-x-1">
                    <Video className="w-4 h-4 text-[#A82222]" />
                    <span>Bổ sung Video cảm nhận mới</span>
                  </h3>
                  <form onSubmit={handleAddVideo} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Tên học viên *</label>
                        <input
                          type="text"
                          required
                          value={videoForm.name}
                          onChange={e => setVideoForm({ ...videoForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                          placeholder="Ví dụ: Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Vai trò / Kênh thương hiệu</label>
                        <input
                          type="text"
                          value={videoForm.role}
                          onChange={e => setVideoForm({ ...videoForm, role: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                          placeholder="Ví dụ: Chủ tiệm bánh ngọt"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Kênh mạng xã hội</label>
                        <input
                          type="text"
                          value={videoForm.channelName}
                          onChange={e => setVideoForm({ ...videoForm, channelName: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                          placeholder="Ví dụ: @tiembanh_a"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Lượt xem hiển thị</label>
                        <input
                          type="text"
                          value={videoForm.views}
                          onChange={e => setVideoForm({ ...videoForm, views: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                          placeholder="Ví dụ: 1.2M hoặc 850K"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Tiêu đề video cảm nhận *</label>
                      <input
                        type="text"
                        required
                        value={videoForm.title}
                        onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                        placeholder="Ví dụ: Đạt 1 triệu lượt xem đầu tiên sau 3 buổi coach"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Đoạn trích bình luận cảm nhận *</label>
                      <textarea
                        required
                        rows={3}
                        value={videoForm.quote}
                        onChange={e => setVideoForm({ ...videoForm, quote: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                        placeholder="Cảm nghĩ chi tiết của học viên..."
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Đường dẫn Video (.mp4 / Link mẫu) *</label>
                      <input
                        type="text"
                        required
                        value={videoForm.videoUrl}
                        onChange={e => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222] font-mono"
                        placeholder="Đường dẫn video trực tiếp (MP4)"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">
                        Mặc định sử dụng video loop chất lượng cao nếu bạn không có link riêng.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#A82222] hover:bg-[#8F1D1D] text-white rounded-xl font-bold transition-colors shadow-sm"
                    >
                      Lưu và Hiển thị Video
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Video Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className="cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#EADFC9]/50 shadow-xs hover:border-[#A82222]/60 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full relative"
                  >
                    {/* Video Thumbnail area */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-black shrink-0">
                      <img
                        src={isYouTubeUrl(vid.videoUrl) ? getYouTubeThumbnail(vid.videoUrl) : vid.avatar}
                        alt={vid.name}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Play overlay button */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#A82222]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#C59B27] transition-all duration-300">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>

                      {/* Views Badge */}
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-xs">
                        🔥 {vid.views} Lượt xem
                      </span>

                      {/* Delete icon for Custom elements */}
                      {vid.id.startsWith('custom-') && (
                        <button
                          onClick={(e) => handleDeleteVideo(vid.id, e)}
                          className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-lg transition-colors z-10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Meta & Description */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-[#2E2522] leading-snug group-hover:text-[#A82222] transition-colors line-clamp-2">
                          {vid.title}
                        </h4>
                        <p className="text-xs text-[#5C4D49] line-clamp-2 italic font-light">
                          “{vid.quote}”
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center space-x-3">
                        <img
                          src={isYouTubeUrl(vid.videoUrl) && vid.avatar.includes('youtube.com') ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' : vid.avatar}
                          alt={vid.name}
                          className="w-8 h-8 rounded-full border border-[#C59B27] object-cover"
                        />
                        <div className="overflow-hidden">
                          <h5 className="text-xs font-bold text-[#2E2522] truncate">{vid.name}</h5>
                          <p className="text-[10px] text-stone-400 truncate">{vid.role}</p>
                        </div>
                        <span className="ml-auto text-[10px] font-semibold text-[#A82222] bg-[#FBEAEA] px-2 py-0.5 rounded-sm shrink-0">
                          {vid.channelName}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Add Image Button & Form inline */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddImageForm(!showAddImageForm)}
                  className="px-4 py-2 bg-white border border-[#EADFC9] text-[#A82222] hover:bg-[#FAF8F5] rounded-xl font-medium text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  {showAddImageForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{showAddImageForm ? 'Hủy tải ảnh' : 'Tải lên ảnh phản hồi mới'}</span>
                </button>
              </div>

              {showAddImageForm && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#EADFC9] rounded-2xl p-6 shadow-sm max-w-2xl mx-auto"
                >
                  <h3 className="text-sm font-bold text-[#2E2522] mb-4 flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4 text-[#A82222]" />
                    <span>Tải ảnh cảm nhận mới từ thiết bị</span>
                  </h3>
                  <form onSubmit={handleAddImage} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Tên học viên *</label>
                        <input
                          type="text"
                          required
                          value={imageForm.studentName}
                          onChange={e => setImageForm({ ...imageForm, studentName: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                          placeholder="Ví dụ: Chị Lan Anh"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Mô tả / Công việc</label>
                        <input
                          type="text"
                          value={imageForm.studentRole}
                          onChange={e => setImageForm({ ...imageForm, studentRole: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                          placeholder="Ví dụ: Kinh doanh Online"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Tiêu đề thành tựu / Chú thích ảnh *</label>
                      <input
                        type="text"
                        required
                        value={imageForm.caption}
                        onChange={e => setImageForm({ ...imageForm, caption: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82222]"
                        placeholder="Ví dụ: Kênh TikTok cán mốc 100K view chỉ sau 1 tuần áp dụng kịch bản AI"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Chọn ảnh chụp phản hồi (Zalo, Chat...) *</label>
                      <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-stone-300 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer relative">
                        <input
                          type="file"
                          required={!imageForm.image}
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="space-y-1 text-center pointer-events-none">
                          {imageForm.image ? (
                            <div className="flex flex-col items-center">
                              <img src={imageForm.image} alt="Xem trước" className="max-h-32 rounded-lg mb-2 border border-[#EADFC9]" />
                              <span className="text-[10px] text-emerald-600 font-semibold">Đã tải ảnh lên thành công! Bấm để đổi ảnh khác</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="mx-auto h-8 w-8 text-stone-400" />
                              <div className="text-stone-600">
                                <span>Kéo thả hoặc Click để chọn ảnh</span>
                              </div>
                              <p className="text-[10px] text-stone-400">Hỗ trợ định dạng PNG, JPG, WEBP</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#A82222] hover:bg-[#8F1D1D] text-white rounded-xl font-bold transition-colors shadow-sm"
                    >
                      Lưu và Đăng ảnh phản hồi
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Layout Bento for Images and styled Chat screenshot mockups */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {images.map((item: any) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl border border-[#EADFC9]/50 shadow-xs p-6 sm:p-8 flex flex-col ${
                      item.isFacebookComment ? 'lg:col-span-2 md:flex-row' : 'md:flex-row'
                    } gap-6 hover:shadow-md hover:border-[#A82222]/40 transition-all duration-300 relative group`}
                  >
                    {/* Delete icon for Custom user uploads */}
                    {item.id.startsWith('custom-') && (
                      <button
                        onClick={(e) => handleDeleteImage(item.id, e)}
                        className="absolute top-4 right-4 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-lg transition-colors z-10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Image / Screen display area or Facebook Mockup */}
                    {item.isFacebookComment ? (
                      <div className="w-full md:w-3/5 shrink-0 rounded-2xl overflow-hidden bg-[#F0F2F5] border border-stone-200 p-4 font-sans text-stone-900 shadow-inner flex flex-col justify-between max-h-[380px] overflow-y-auto scrollbar-thin">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                          <span className="font-bold text-xs text-stone-800">Bài viết của An</span>
                          <span className="text-stone-400 text-xs hover:text-stone-600 cursor-pointer">✕</span>
                        </div>
                        
                        <div className="space-y-4 flex-1">
                          {item.comments.map((comment: any) => (
                            <div key={comment.id} className="flex items-start space-x-2">
                              <img
                                src={comment.avatar}
                                alt={comment.author}
                                className="w-8 h-8 rounded-full border border-stone-200 object-cover mt-0.5 shrink-0"
                              />
                              <div className="flex-1">
                                <div className="bg-white rounded-2xl px-3.5 py-2.5 shadow-2xs inline-block max-w-[95%]">
                                  <span className="block font-bold text-stone-950 text-[11px] mb-0.5">
                                    {comment.author}
                                  </span>
                                  {comment.isSticker ? (
                                    <div className="space-y-1">
                                      <span className="text-[11px] text-stone-800 font-medium block italic">{comment.text}</span>
                                      <div className="w-16 h-16 bg-[#FBEAEA] rounded-xl flex items-center justify-center border border-[#A82222]/20">
                                        <ThumbsUp className="w-8 h-8 text-[#A82222] fill-[#A82222]/10" />
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-[11px] text-[#2E2522] leading-relaxed whitespace-pre-line font-light font-sans">
                                      {comment.text}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center space-x-3 text-[10px] text-stone-500 mt-1 pl-2 font-medium">
                                  <span>{comment.time}</span>
                                  <button className="hover:underline cursor-pointer">Thích</button>
                                  <button className="hover:underline cursor-pointer">Trả lời</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full md:w-1/2 shrink-0 aspect-[4/3] md:aspect-auto md:h-64 rounded-2xl overflow-hidden bg-stone-100 border border-stone-100">
                        <img
                          src={item.image}
                          alt={item.studentName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Chat or textual caption details */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#C59B27] bg-[#FAF8F5] border border-[#EADFC9] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {item.isFacebookComment ? 'Phản hồi Facebook' : item.isChatFeedback ? 'Tin nhắn phản hồi' : 'Ảnh kết quả'}
                          </span>
                        </div>

                        <h4 className={`font-sans font-bold text-[#2E2522] leading-snug ${item.isFacebookComment ? 'text-base text-[#A82222]' : 'text-sm'}`}>
                          {item.caption}
                        </h4>

                        {item.isFacebookComment && (
                          <div className="text-xs text-[#5C4D49] space-y-2 leading-relaxed font-light">
                            <p>🎯 <strong className="font-semibold text-[#2E2522]">Tập trung đúng hướng đi:</strong> Thay vì làm nhiều nội dung dàn trải, cô Đỗ Ba được Tống An định hướng tập trung hoàn toàn vào ngách <span className="font-semibold text-[#A82222]">Giáo dục Tiền Tiểu học</span>.</p>
                            <p>⚡ <strong className="font-semibold text-[#2E2522]">Tiết kiệm thời gian:</strong> Nhờ có người đi trước đồng hành chỉ dẫn thực tế, cô đã rũ bỏ sự loay hoay để vững bước xây dựng thương hiệu cá nhân bền vững.</p>
                          </div>
                        )}

                        {/* Zalo Styled Chat Bubbles if defaultChat exists */}
                        {item.isChatFeedback && item.chatMessages && (
                          <div className="space-y-2 bg-[#FAF8F5] border border-[#EADFC9]/30 rounded-2xl p-3 max-h-40 overflow-y-auto custom-scrollbar text-[11px] font-light">
                            {item.chatMessages.map((msg: any, mIdx: number) => (
                              <div
                                key={mIdx}
                                className={`flex flex-col ${msg.sender === 'student' ? 'items-start' : 'items-end'}`}
                              >
                                <span className={`max-w-[85%] rounded-2xl px-3 py-1.5 shadow-2xs ${
                                  msg.sender === 'student'
                                    ? 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'
                                    : 'bg-[#A82222] text-white rounded-tr-none font-normal'
                                }`}>
                                  {msg.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-stone-100">
                        <h5 className="text-xs font-bold text-[#2E2522]">{item.studentName}</h5>
                        <p className="text-[10px] text-[#5C4D49]">{item.studentRole}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Player Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FAF6F0] rounded-3xl overflow-hidden max-w-4xl w-full border border-[#EADFC9] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Video Area */}
                <div className="md:col-span-7 bg-black aspect-video md:aspect-[4/3] flex items-center justify-center relative min-h-[250px] sm:min-h-[300px]">
                  {isYouTubeUrl(selectedVideo.videoUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                      className="w-full h-full border-0 absolute inset-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={selectedVideo.title}
                    />
                  ) : (
                    <video
                      src={selectedVideo.videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      playsInline
                      loop
                    />
                  )}
                </div>

                {/* Info Area */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full bg-white">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#A82222] uppercase tracking-wider bg-[#FBEAEA] px-2.5 py-1 rounded-md inline-block">
                      Video học viên thực tế
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#2E2522] leading-snug">
                      {selectedVideo.title}
                    </h3>
                    
                    <div className="flex items-center space-x-3 pt-2">
                      <img
                        src={isYouTubeUrl(selectedVideo.videoUrl) && selectedVideo.avatar.includes('youtube.com') ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' : selectedVideo.avatar}
                        alt={selectedVideo.name}
                        className="w-10 h-10 rounded-full border border-[#C59B27] object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#2E2522]">{selectedVideo.name}</h4>
                        <p className="text-[10px] text-[#5C4D49]">{selectedVideo.role}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EADFC9]/50 text-xs text-[#5C4D49] leading-relaxed italic relative">
                      <Quote className="w-4 h-4 text-[#C59B27]/30 absolute top-2 right-2" />
                      “{selectedVideo.quote}”
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>🔥 {selectedVideo.views} lượt xem</span>
                    <span className="font-semibold text-[#C59B27] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#EADFC9]/40">
                      {selectedVideo.channelName}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
