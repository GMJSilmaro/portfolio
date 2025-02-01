import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-[#1a1a1a] rounded-2xl border border-white/10
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-track]:bg-black/20 
            [&::-webkit-scrollbar-thumb]:bg-white/20 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            [&::-webkit-scrollbar-track]:rounded-full 
            hover:[&::-webkit-scrollbar-thumb]:bg-white/30"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};