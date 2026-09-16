'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: 'Home', href: '#hero', sectionId: 'hero' },
    { name: 'About', href: '#about', sectionId: 'about' },
    { name: 'Projects', href: '#projects', sectionId: 'projects' },
    { name: 'Skills', href: '#skills', sectionId: 'skills' },
    { name: 'Contact', href: '#contact', sectionId: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(scrolled > 40);
      setScrollProgress(height > 0 ? Math.min(scrolled / height, 1) : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px', threshold: 0 }
    );

    navItems.forEach(({ sectionId }) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'border-b border-white/10 bg-navy-950/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <nav className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group text-base font-semibold tracking-wide text-white"
          >
            GMJ
            <span className="text-accent transition-all duration-300 group-hover:tracking-widest">
              .
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                  activeSection === item.sectionId
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-1 left-3 h-px bg-accent transition-all duration-300 ${
                    activeSection === item.sectionId ? 'right-3' : 'right-full'
                  }`}
                />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="ml-3 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-navy-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
            >
              Hire Me
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white transition-colors hover:bg-white/5 active:scale-95 md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Scroll progress */}
      <div
        className="h-px origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Compact mobile dropdown */}
      <div
        className={`overflow-hidden border-b border-white/10 bg-navy-950/98 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 pb-4 pt-1">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-[15px] font-medium transition-colors ${
                activeSection === item.sectionId
                  ? 'bg-navy-800 text-white'
                  : 'text-slate-300 active:bg-navy-800'
              }`}
            >
              <span className="w-5 text-[11px] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.name}
            </a>
          ))}

          <a
            href="mailto:gmjsilmaro03@gmail.com"
            className="mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-navy-950 active:scale-[0.99]"
          >
            <Mail className="h-4 w-4" />
            Email Me
          </a>
        </nav>
      </div>
    </header>
  );
};
