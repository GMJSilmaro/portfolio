import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      setIsScrolled(window.scrollY > 50);
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

    // Observe all sections
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0c1b2a]/80 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text"
            >
              My Portfolio
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`text-gray-300 hover:text-white transition-colors relative group py-2 ${
                    activeSection === item.sectionId ? 'text-white' : ''
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ${
                      activeSection === item.sectionId ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 md:hidden pt-20 bg-[#0c1b2a]/95 backdrop-blur-lg"
        >
          <nav className="flex flex-col items-center gap-6 p-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`text-lg text-gray-300 hover:text-white transition-colors ${
                  activeSection === item.sectionId ? 'text-white' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
}; 