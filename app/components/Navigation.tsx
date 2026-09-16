'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { name: 'Home', href: '#hero', sectionId: 'hero' },
    { name: 'About', href: '#about', sectionId: 'about' },
    { name: 'Projects', href: '#projects', sectionId: 'projects' },
    { name: 'Skills', href: '#skills', sectionId: 'skills' },
    { name: 'Contact', href: '#contact', sectionId: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-45% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    navItems.forEach(({ sectionId }) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach(({ sectionId }) => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'border-b border-white/10 bg-navy-950'
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
              className="text-base font-semibold tracking-wide text-white"
            >
              GMJ<span className="text-accent">.</span>
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
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    activeSection === item.sectionId
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-px bg-accent transition-opacity ${
                      activeSection === item.sectionId ? 'opacity-100' : 'opacity-0'
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
                className="ml-3 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-navy-950 transition-opacity hover:opacity-90"
              >
                Hire Me
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-[120] flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white transition-colors hover:bg-white/5 md:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-navy-950 md:hidden">
          <div className="flex flex-1 flex-col justify-center px-6 pb-10 pt-20">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex min-h-[52px] items-center gap-4 rounded-lg px-4 text-lg font-medium transition-colors ${
                    activeSection === item.sectionId
                      ? 'bg-navy-900 text-white'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <span className="w-6 text-xs text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.name}
                </a>
              ))}
            </nav>

            <a
              href="mailto:gmjsilmaro03@gmail.com"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-navy-950"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
          </div>
        </div>
      )}
    </>
  );
};
