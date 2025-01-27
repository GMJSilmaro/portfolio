import React from 'react';
import { motion } from 'framer-motion';
import { Background } from './Background';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 relative">
      <Background variant="contact" />
      
      {/* Top Divider */}
      <div className="absolute top-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="text-sm tracking-[0.4em] text-purple-400 uppercase mb-4">Contact</div>
          <h2 className="text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 blur-xl opacity-50"></span>
            <span className="relative">Let's Connect</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                    Get in Touch
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
                  </p>
                  <div className="space-y-4">
                    <a 
                      href="mailto:gmjsilmaro03@gmail.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-400" />
                      </div>
                      <span>gmjsilmaro03@gmail.com</span>
                    </a>
                    <a 
                      href="https://github.com/GMJSilmaro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                        <Github className="w-5 h-5 text-purple-400" />
                      </div>
                      <span>github.com/GMJSilmaro</span>
                    </a>
                    <a 
                      href="https://www.facebook.com/yobb03"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <span>Gilbert Michael Jay Silmaro</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/its_boramlis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span>@its_boramlis</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                    Send Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      className="w-full group relative px-6 py-3 rounded-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300 group-hover:scale-110" />
                      <div className="relative flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        <span className="font-medium">Send Message</span>
                      </div>
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </section>
  );
}; 