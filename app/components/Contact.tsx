'use client'

import React from 'react';
import { Mail, Github, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="border-t border-white/10 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">04 — Contact</p>
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="text-slate-400">
            Have a product idea or role in mind? Reach out — I usually reply within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-navy-900 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Direct links</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Prefer email or social? Use any of these channels.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:gmjsilmaro03@gmail.com"
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span className="truncate">gmjsilmaro03@gmail.com</span>
              </a>
              <a
                href="https://github.com/GMJSilmaro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                <Github className="h-4 w-4 shrink-0 text-accent" />
                github.com/GMJSilmaro
              </a>
              <a
                href="https://www.facebook.com/yobb03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                <svg className="h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/its_boramlis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-slate-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                <svg className="h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @its_boramlis
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="min-h-[48px] w-full rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="min-h-[48px] w-full rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project…"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-navy-950 transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Gilbert Michael Jay Silmaro
        </footer>
      </div>
    </section>
  );
};
