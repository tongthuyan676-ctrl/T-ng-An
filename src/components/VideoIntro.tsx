/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, Clock, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VideoIntro() {
  const [videoSrc, setVideoSrc] = useState<string>('https://www.youtube.com/watch?v=Qd8FLft1zSw');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [youtubeInputUrl, setYoutubeInputUrl] = useState('');
  const [startTime, setStartTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // IndexedDB database name and store name
  const DB_NAME = 'VideoIntroDB';
  const STORE_NAME = 'videos';

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isYouTube = !!getYouTubeId(videoSrc);
  const youtubeId = getYouTubeId(videoSrc);

  // Load video from IndexedDB on mount
  useEffect(() => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get('intro_video');

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          const data = getRequest.result;
          if (typeof data === 'string') {
            setVideoSrc(data);
            setYoutubeInputUrl(data);
          } else if (data instanceof Blob) {
            const url = URL.createObjectURL(data);
            setVideoSrc(url);
          }
        }
      };
    };
  }, []);

  // Save video file to IndexedDB
  const saveVideoToDB = (file: File) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const putRequest = store.put(file, 'intro_video');
      putRequest.onsuccess = () => {
        console.log('Video saved to IndexedDB successfully!');
      };
    };
  };

  // Save YouTube link string to IndexedDB
  const saveYoutubeToDB = (url: string) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const putRequest = store.put(url, 'intro_video');
      putRequest.onsuccess = () => {
        console.log('YouTube link saved to IndexedDB successfully!');
      };
    };
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const objectUrl = URL.createObjectURL(file);
            setVideoSrc(objectUrl);
            saveVideoToDB(file);
            setIsPlaying(false);
            if (videoRef.current) {
              videoRef.current.load();
            }
            setShowUploadAlert(true);
            setTimeout(() => setShowUploadAlert(false), 4000);
            return 0;
          }
          return prev + 15;
        });
      }, 150);
    }
  };

  const handleSaveYoutubeLink = () => {
    if (!youtubeInputUrl.trim()) return;
    const ytId = getYouTubeId(youtubeInputUrl);
    if (!ytId) {
      setErrorMessage('Đường dẫn YouTube không hợp lệ. Vui lòng thử lại với định dạng đúng (ví dụ: https://www.youtube.com/watch?v=...)');
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 5000);
      return;
    }
    setVideoSrc(youtubeInputUrl);
    setStartTime(0);
    setIsPlaying(true);
    saveYoutubeToDB(youtubeInputUrl);
    setShowUploadAlert(true);
    setTimeout(() => setShowUploadAlert(false), 4000);
  };

  const handleResetVideo = () => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const deleteRequest = store.delete('intro_video');
      
      deleteRequest.onsuccess = () => {
        setVideoSrc('https://www.youtube.com/watch?v=Qd8FLft1zSw');
        setYoutubeInputUrl('');
        setStartTime(0);
        setIsPlaying(false);
        if (videoRef.current) {
          videoRef.current.load();
        }
      };
    };
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Playback error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 60; // fallback to 60s
    setCurrentTime(current);
    setProgress((current / dur) * 100);

    // Auto-update highlight step based on progress
    updateActiveChapter(current);
  };

  const updateActiveChapter = (timeInSeconds: number) => {
    if (timeInSeconds < 15) {
      setActiveTimeline(0);
    } else if (timeInSeconds < 30) {
      setActiveTimeline(1);
    } else if (timeInSeconds < 45) {
      setActiveTimeline(2);
    } else if (timeInSeconds < 55) {
      setActiveTimeline(3);
    } else {
      setActiveTimeline(4);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    const dur = videoRef.current.duration || 60;
    const targetTime = (val / 100) * dur;
    videoRef.current.currentTime = targetTime;
    setProgress(val);
    setCurrentTime(targetTime);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error entering fullscreen:', err);
      });
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timelineSteps = [
    {
      time: '00:00',
      title: 'Khát khao xây kênh',
      desc: 'Mong muốn xây dựng nhân hiệu độc bản, khẳng định giá trị riêng của bản thân.',
      range: [0, 15]
    },
    {
      time: '00:15',
      title: 'Những rào cản ban đầu',
      desc: 'Sợ ống kính, bí ý tưởng nội dung, viết kịch bản khô khan và đăng bài không chuyển đổi.',
      range: [15, 30]
    },
    {
      time: '00:30',
      title: 'Bước ngoặt thay đổi',
      desc: 'Ngừng chạy theo các trào lưu ngắn hạn, tập trung vào 3 trụ cột giá trị thực chất.',
      range: [30, 45]
    },
    {
      time: '00:45',
      title: 'Ứng dụng AI đột phá',
      desc: 'Tối ưu hóa 80% thời gian rảnh rỗi nhờ công cụ AI, thảnh thơi sáng tạo video.',
      range: [45, 55]
    },
    {
      time: '01:00',
      title: 'Đồng hành thực chiến',
      desc: 'Từng bước xây dựng hệ sinh thái marketing bền vững cùng Tống An.',
      range: [55, 120]
    }
  ];

  const seekToTime = (seconds: number) => {
    setActiveTimeline(timelineSteps.findIndex(step => step.range[0] === seconds));
    if (isYouTube) {
      setStartTime(seconds);
      setIsPlaying(true);
    } else {
      if (!videoRef.current) return;
      videoRef.current.currentTime = seconds;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <section id="video-gioi-thieu" className="py-24 bg-[#FAF6F0] relative overflow-hidden border-t border-b border-[#EADFC9]/50">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl -mr-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A82222]/5 rounded-full blur-3xl -ml-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F3ECE0] rounded-full border border-[#EADFC9]">
            <Film className="w-4 h-4 text-[#C59B27]" />
            <span className="text-xs font-bold tracking-wider uppercase text-[#5C4D49]">
              Gặp gỡ Coach Tống An
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-[#2E2522]">
            Video Giới Thiệu: Xây Kênh Online Bền Vững & Ứng Dụng AI
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D49] leading-relaxed">
            Nghe An chia sẻ về hành trình vượt qua nỗi sợ ống kính, cách tối giản quy trình sáng tạo và phương pháp biến nhân hiệu thành cỗ máy chuyển đổi chân thành.
          </p>
        </div>

        {/* Video Player & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Custom Video Player Container */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div 
              ref={containerRef}
              className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-[#EADFC9] group"
            >
              {isYouTube ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?start=${startTime}&autoplay=${isPlaying ? 1 : 0}&rel=0`}
                  className="w-full h-full absolute inset-0 border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video Giới Thiệu"
                />
              ) : (
                <>
                  {/* Actual Video Element */}
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={togglePlay}
                    className="w-full h-full object-cover cursor-pointer"
                    playsInline
                    poster="/About-tong-an.png"
                  />

                  {/* Big Centered Play Button Overlay when Paused */}
                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-3xs cursor-pointer z-10"
                      >
                        <div className="w-20 h-20 rounded-full bg-[#A82222]/90 hover:bg-[#A82222] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group/play">
                          <Play className="w-10 h-10 fill-white ml-1.5" />
                          <span className="absolute inset-0 rounded-full bg-[#A82222] animate-ping opacity-25 group-hover/play:opacity-40" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Custom Control Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-20">
                    {/* Progress bar slider */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-1.5 rounded-lg bg-white/30 accent-[#A82222] cursor-pointer appearance-none outline-none focus:ring-1 focus:ring-[#C59B27] transition-all"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Left Controls: Play, Time, Mute */}
                      <div className="flex items-center space-x-4 text-white">
                        <button 
                          onClick={togglePlay}
                          className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white cursor-pointer"
                          title={isPlaying ? 'Tạm dừng' : 'Phát video'}
                        >
                          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                        </button>

                        <button 
                          onClick={toggleMute}
                          className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white cursor-pointer"
                          title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <span className="text-xs font-mono select-none">
                          {formatTime(currentTime)} / {formatTime(duration || 60)}
                        </span>
                      </div>

                      {/* Right Controls: Fullscreen */}
                      <button 
                        onClick={handleFullscreen}
                        className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white cursor-pointer"
                        title="Toàn màn hình"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Premium Interactive Chapter Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#EADFC9] shadow-sm flex flex-col justify-between h-full space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#C59B27]">
                  <Sparkles className="w-4 h-4 text-[#C59B27]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">Tóm tắt nội dung</span>
                </div>
                <h3 className="text-lg font-bold text-[#2E2522]">Nội Dung Chính Trong Video</h3>
                <p className="text-xs text-[#5C4D49] leading-relaxed">
                  Nhấp vào từng chương mốc thời gian bên dưới để chuyển tiếp video đến phân cảnh cần xem nhanh:
                </p>
              </div>

              {/* Timeline Steps wrapper */}
              <div className="space-y-4 relative pl-3 border-l-2 border-[#EADFC9]/50">
                {timelineSteps.map((step, idx) => {
                  const isActive = activeTimeline === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => seekToTime(step.range[0])}
                      className={`group/item relative flex flex-col gap-1 cursor-pointer transition-all duration-300 ${
                        isActive ? 'scale-[1.02] pl-2' : 'hover:pl-1'
                      }`}
                    >
                      {/* Interactive dot */}
                      <span className={`absolute -left-[19px] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#A82222] border-white scale-125 ring-4 ring-[#A82222]/15 shadow-sm' 
                          : 'bg-white border-[#EADFC9] group-hover/item:border-[#C59B27]'
                      }`} />

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded-md font-semibold transition-colors ${
                          isActive 
                            ? 'bg-[#A82222] text-white' 
                            : 'bg-stone-100 text-[#5C4D49] group-hover/item:bg-[#F3ECE0]'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </span>
                        <h4 className={`text-sm font-bold transition-colors ${
                          isActive ? 'text-[#A82222]' : 'text-[#2E2522] group-hover/item:text-[#C59B27]'
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                      
                      <p className={`text-xs leading-relaxed transition-colors ${
                        isActive ? 'text-[#3E322E]' : 'text-[#5C4D49]'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Helpful Advice banner */}
              <div className="p-3 bg-[#FCFAF7] rounded-2xl border border-[#EADFC9]/40 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#5C4D49] leading-normal">
                  <strong>Mẹo:</strong> Chị có thể tự cập nhật link video YouTube giới thiệu bất kỳ lúc nào bằng bảng điều khiển trực quan bên trái!
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
