/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Header({ onScrollTo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Về An', target: 've-an' },
    { label: 'Ebook', target: 'ebook' },
    { label: 'Khóa học', target: 'courses' },
    { label: 'Hợp tác doanh nghiệp', target: 'enterprise' },
    { label: 'Quà tặng', target: 'qua-tang' },
    { label: 'Liên hệ', target: 'lien-he' },
  ];

  const handleItemClick = (target: string) => {
    onScrollTo(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm border-b border-[#EADFC9]/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleItemClick('hero')}
              className="text-2xl font-sans font-bold tracking-widest text-[#3C2F2F] hover:text-[#C59B27] transition-colors cursor-pointer"
            >
              TỐNG AN<span className="text-[#C59B27] font-serif">.</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleItemClick(item.target)}
                className="text-sm font-medium text-[#5C4D49] hover:text-[#C59B27] transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#C59B27] after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleItemClick('lien-he')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#A82222] text-white hover:bg-[#8B1A1A] transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md cursor-pointer group"
            >
              Đăng ký coaching 1-1
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#3C2F2F] hover:text-[#C59B27] transition-colors p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 bg-[#FAF8F5] border-b border-[#EADFC9] shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-40 ${
          isMobileMenuOpen ? 'max-h-screen py-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 space-y-4 flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleItemClick(item.target)}
              className="text-base font-medium text-[#5C4D49] hover:text-[#C59B27] text-left py-2 border-b border-[#FAF8F5] hover:border-[#EADFC9] transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleItemClick('lien-he')}
            className="w-full mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#C59B27] text-white hover:bg-[#A9831E] transition-all duration-200 text-sm font-medium shadow-sm cursor-pointer"
          >
            Đăng ký coaching 1-1
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
