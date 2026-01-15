

import React from 'react';
import { LetterContent } from '../types';

interface LetterPaperProps {
  content: LetterContent;
}

const LetterPaper: React.FC<LetterPaperProps> = ({ content }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto p-10 md:p-20 bg-[#fffefc] shadow-[0_40px_80px_-20px_rgba(225,29,72,0.1)] border border-rose-50 paper-texture rounded-sm transition-all overflow-hidden">
      {/* Decorative floral/romantic background corner */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor" className="text-rose-400">
           <path d="M50 0 C 60 20, 90 30, 100 50 C 80 60, 70 90, 50 100 C 40 80, 10 70, 0 50 C 20 40, 30 10, 50 0" />
        </svg>
      </div>

      {/* Subtle paper line accents in pink */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ 
        backgroundImage: 'linear-gradient(rgba(244, 114, 182, 0.1) 1px, transparent 1px)',
        backgroundSize: '100% 3.5rem',
        backgroundPosition: '0 4.5rem'
      }}></div>

      <div className="relative z-10 space-y-12">
        <h2 className="text-4xl font-handwriting text-rose-950">
          {content.greeting}
        </h2>

        <div className="space-y-8 text-xl md:text-2xl font-serif-elegant leading-relaxed text-slate-900 italic">
          {content.body.map((paragraph, index) => (
            <p key={index} className="indent-12 text-justify first-letter:text-4xl first-letter:font-handwriting first-letter:text-rose-700 first-letter:mr-1 first-letter:float-left">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="pt-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-100"></div>
            <p className="text-xl md:text-2xl font-serif-elegant text-rose-900 italic">
              {content.closing}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-100"></div>
          </div>
          
          <div className="text-right pt-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-rose-300 mb-2">Thương Khánh Chi rất nhiều,</p>
            <p className="text-5xl font-handwriting text-rose-950 pr-4 drop-shadow-sm">
              {content.signature}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPaper;
