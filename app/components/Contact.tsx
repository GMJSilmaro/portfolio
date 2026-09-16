'use client'

import React from 'react'
import { FileText, Github, Mail, Send } from 'lucide-react'
import { Reveal } from './ui/reveal'

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name}\n${formData.email}`
    )
    window.location.href = `mailto:gmjsilmaro03@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="relative border-t border-[color:var(--rule)] bg-ink py-20 text-paper sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(13,110,86,0.35),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:pl-28">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-signal-soft">
            04 — Clearance
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
            Let&apos;s work together
          </h2>
          <p className="mt-3 text-base leading-relaxed text-paper/65 sm:text-lg">
            Have a product idea or role in mind? Reach out — I usually reply within a day.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 border border-white/10 bg-white/[0.03] p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-paper">Direct channels</h3>
            <p className="mb-6 text-sm leading-relaxed text-paper/60">
              Prefer email or social? Use any of these channels.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:gmjsilmaro03@gmail.com"
                className="group flex min-h-[48px] items-center gap-3 border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/50 hover:text-paper"
              >
                <Mail className="h-4 w-4 shrink-0 text-signal-soft" />
                <span className="truncate">gmjsilmaro03@gmail.com</span>
              </a>
              <a
                href="https://github.com/GMJSilmaro"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/50 hover:text-paper"
              >
                <Github className="h-4 w-4 shrink-0 text-signal-soft" />
                github.com/GMJSilmaro
              </a>
              <a
                href="https://www.facebook.com/yobb03"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/50 hover:text-paper"
              >
                <svg className="h-4 w-4 shrink-0 text-signal-soft" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/its_boramlis"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/50 hover:text-paper"
              >
                <svg className="h-4 w-4 shrink-0 text-signal-soft" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @its_boramlis
              </a>
              <a
                href="./Gilbert-Michael-Jay-Silmaro-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[48px] items-center gap-3 border border-signal/40 bg-signal/15 px-4 py-3 text-sm font-medium text-signal-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-signal hover:text-paper"
              >
                <FileText className="h-4 w-4 shrink-0 text-signal-soft" />
                Download CV (PDF)
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xl font-semibold text-paper">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="min-h-[48px] w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-signal focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="min-h-[48px] w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-signal focus:outline-none"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project…"
                required
                rows={5}
                className="w-full resize-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-signal focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-signal px-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-signal-soft"
              >
                <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                {submitted ? 'Opening mail…' : 'Dispatch message'}
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-paper/45">
          © {new Date().getFullYear()} Gilbert Michael Jay Silmaro · Living Dossier
        </footer>
      </div>
    </section>
  )
}
