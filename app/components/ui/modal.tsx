'use client'

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="custom-scrollbar relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-xl border border-white/10 bg-navy-900"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-md border border-white/10 bg-navy-800 p-2 transition-colors hover:bg-navy-700"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-white" />
        </button>
        {children}
      </div>
    </div>
  );
};
