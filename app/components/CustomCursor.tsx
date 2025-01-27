'use client'

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Using springs for smoother cursor movement
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 500,
            damping: 30,
          }
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 500,
            damping: 30,
          }
        }}
      >
        <div className="w-8 h-8 rounded-full border border-white/30" />
      </motion.div>

      {/* Gradient glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[997] opacity-30"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.3 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 30,
          }
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/50 to-cyan-500/50 blur-sm" />
      </motion.div>
    </>
  );
}; 