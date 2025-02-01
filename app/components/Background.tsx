import React from 'react';

interface BackgroundProps {
  variant?: 'hero' | 'about' | 'projects' | 'skills' | 'contact';
}

export const Background: React.FC<BackgroundProps> = ({ variant = 'hero' }) => {
  const variants = {
    hero: (
      <>
        <div className="absolute inset-1">
          {/* Base gradient */}
          <div className="absolute inset-1 bg-gradient-to-br from-[#0c1b2a] via-[#111827] to-[#0f172a]" />
          
          {/* Colored gradients */}
          <div className="absolute inset-1 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
          
          {/* Radial gradients for depth */}
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-[radial-gradient(circle_at_25%_25%,_rgba(147,51,234,0.15)_0%,_transparent_50%)] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle_at_75%_75%,_rgba(34,211,238,0.15)_0%,_transparent_50%)] animate-pulse delay-75" />
          
          {/* Noise texture */}
          <div className="absolute inset-1 bg-noise opacity-[0.02]" />
          
          {/* Grid overlay with reduced opacity */}
          <div className="absolute inset-1 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Bottom blur effect with increased blur */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
        </div>
      </>
    ),
    about: (
      <>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#0c1b2a]" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Top and bottom blur effects with increased blur */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
        </div>
      </>
    ),
    projects: (
      <>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1b2a] via-[#111827] to-[#0f172a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.1)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Top and bottom blur effects with increased blur */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
        </div>
      </>
    ),
    skills: (
      <>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0c1b2a]" />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(34,211,238,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(147,51,234,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Top and bottom blur effects with increased blur */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
        </div>
      </>
    ),
    contact: (
      <>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b2a] via-[#111827] to-[#0f172a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(147,51,234,0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Top blur effect with increased blur */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0c1b2a] via-[#0c1b2a]/80 to-transparent backdrop-blur-md" />
        </div>
      </>
    ),
  };

  return variants[variant];
}; 