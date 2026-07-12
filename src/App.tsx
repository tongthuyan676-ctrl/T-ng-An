/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Gift, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoIntro from './components/VideoIntro';
import About from './components/About';
import Ebook from './components/Ebook';
import Testimonials from './components/Testimonials';
import Ecosystem from './components/Ecosystem';
import Gifts from './components/Gifts';
import Contact from './components/Contact';
import Courses from './components/Courses';
import Enterprise from './components/Enterprise';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showFloatingGift, setShowFloatingGift] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Scroll handler to show the floating badge
  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      if (window.scrollY > 400) {
        setShowFloatingGift(true);
      } else {
        setShowFloatingGift(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Smooth scroll helper with sticky header offset
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // 1. Detect Pathname (e.g. /khoahoc, /ebook, /quatang, /dichvu)
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    
    // 2. Detect Hash (e.g. #khoahoc, #ebook, #quatang, #dichvu)
    const rawHash = window.location.hash.toLowerCase().replace('#', '');

    // Map keywords to section IDs
    const keywordToSectionId: { [key: string]: string } = {
      'khoahoc': 'courses',
      'course': 'courses',
      'courses': 'courses',
      'ebook': 'ebook',
      'quatang': 'qua-tang',
      'qua-tang': 'qua-tang',
      'dichvu': 'dich-vu',
      'dich-vu': 'dich-vu'
    };

    const targetSectionId = keywordToSectionId[rawPath] || keywordToSectionId[rawHash];

    if (targetSectionId) {
      // Small timeout to make sure DOM is fully loaded and images/CSS won't jump the scroll position
      const timer = setTimeout(() => {
        scrollToSection(targetSectionId);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#2E2522] font-sans antialiased overflow-x-hidden selection:bg-[#C59B27]/30 selection:text-[#2E2522]">
      {/* Sticky Top Header */}
      <Header onScrollTo={scrollToSection} />

      {/* Main Page Layout Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onScrollTo={scrollToSection} />

        {/* Video Giới thiệu Thực Chiến */}
        <VideoIntro />

        {/* 2. Về An (Story & Transformation story) */}
        <About />

        {/* Ebook Lộ Trình Xây Kênh đặc biệt */}
        <Ebook />

        {/* Khóa học Video Thu Sẵn */}
        <Courses />

        {/* Hợp tác doanh nghiệp B2B */}
        <Enterprise />

        {/* 7. Kết quả & Cảm nhận học viên (Stats + Testimonials) */}
        <Testimonials />

        {/* 8. Hệ sinh thái nội dung */}
        <Ecosystem />

        {/* 9. Quà tặng miễn phí (with registration form) */}
        <Gifts />

        {/* 10. Liên hệ & Đăng ký tư vấn 1-1 */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onScrollTo={scrollToSection} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Dashboard Modal Overlay */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Floating high-converting Gift Badge */}
      {showFloatingGift && !isDismissed && (
        <div 
          onClick={() => scrollToSection('qua-tang')}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#A82222] text-white p-3 pr-4 rounded-2xl shadow-2xl border-2 border-white/30 animate-bounce cursor-pointer hover:scale-105 hover:bg-[#8B1A1A] transition-all max-w-[280px] sm:max-w-xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform">
            <Gift className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex-1 pr-1">
            <p className="text-[9px] font-bold tracking-widest uppercase text-[#C59B27] leading-none mb-1">QUÀ TẶNG MIỄN PHÍ</p>
            <h4 className="text-xs font-black leading-tight">Chỉ còn 12 suất bộ tài liệu trị giá 499K!</h4>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
              setShowFloatingGift(false);
            }}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white/70 hover:text-white shrink-0 self-start -mt-1 -mr-2"
            title="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
