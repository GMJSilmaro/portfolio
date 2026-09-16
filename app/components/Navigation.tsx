'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      rootMargin: '-50% 0px',
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/5 bg-navy-950/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <nav className="flex h-16 items-center justify-between">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="text-sm font-semibold tracking-wide text-white"
            >
              GMJ<span className="text-accent">.</span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative py-2 text-sm transition-colors ${
                    activeSection === item.sectionId
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                      activeSection === item.sectionId ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 transition-colors hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy-950/98 pt-16 md:hidden">
          <nav className="flex flex-col items-center gap-6 p-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`text-base transition-colors ${
                  activeSection === item.sectionId
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
