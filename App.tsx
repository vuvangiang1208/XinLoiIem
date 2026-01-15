
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LetterContent, AppState } from './types';
import { CONFIG } from './constants';
import LetterPaper from './components/LetterPaper';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [letter, setLetter] = useState<LetterContent | null>(null);
  const letterSectionRef = useRef<HTMLDivElement>(null);

  const loadLetter = useCallback(() => {
    setState(AppState.GENERATING);
    // Thay vì gọi API, chúng ta lấy trực tiếp từ file constants để bạn có thể chỉnh sửa
    setTimeout(() => {
      setLetter(CONFIG.LETTER_CONTENT);
      setState(AppState.DISPLAYING);
    }, 800); // Tạo hiệu ứng tải nhẹ cho mượt mà
  }, []);

  useEffect(() => {
    loadLetter();
  }, [loadLetter]);

  const scrollToLetter = () => {
    letterSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-4 hero-gradient overflow-hidden">
        <div className="z-10 text-center space-y-6 max-w-2xl animate-fade-in">
          <span className="text-rose-500/70 uppercase tracking-[0.4em] text-xs font-bold">Gửi trọn yêu thương</span>
          <h1 className="text-6xl md:text-8xl font-handwriting text-rose-950 leading-tight">
            {CONFIG.RECEIVER_NAME}
          </h1>
          <p className="text-xl md:text-2xl font-serif-elegant italic text-rose-800/80 max-w-lg mx-auto leading-relaxed">
            "{CONFIG.HERO_SUBTITLE}"
          </p>
          <div className="pt-10">
            <button 
              onClick={scrollToLetter}
              className="px-10 py-4 bg-rose-600 text-white rounded-full font-medium shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 group"
            >
              Mở bức thư này
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating Hearts Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute floating"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
               <svg width={15 + Math.random() * 15} height={15 + Math.random() * 15} viewBox="0 0 20 20" fill="currentColor" className={i % 2 === 0 ? "text-rose-200" : "text-pink-100"}>
                  <path d="M10 18l-1.45-1.32C3.4 11.99 0 8.89 0 5.5 0 2.42 2.42 0 5.5 0 7.24 0 8.91.81 10 2.09 11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.50c0 3.39-3.4 6.49-8.55 11.19L10 18z" />
               </svg>
            </div>
          ))}
        </div>
      </section>

      {/* Romantic Quote Section */}
      <section className="py-24 bg-white px-4 border-y border-rose-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-rose-300"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"></div>
          <p className="text-2xl md:text-3xl font-serif-elegant text-rose-950 italic leading-relaxed px-4">
            "{CONFIG.MIDDLE_QUOTE}"
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Main Letter Section */}
      <section ref={letterSectionRef} className="py-20 bg-[#fff9fa] px-4 min-h-screen flex flex-col items-center">
        {state === AppState.GENERATING ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
            <p className="text-rose-800 font-serif-elegant italic animate-pulse">Đang chuẩn bị tâm tư...</p>
          </div>
        ) : letter ? (
          <div className="w-full max-w-4xl flex flex-col items-center animate-fade-in">
             <div className="mb-12 text-center">
               <h2 className="text-4xl font-handwriting text-rose-900 mb-2">{CONFIG.APP_TITLE}</h2>
               <div className="h-0.5 w-16 bg-rose-200 mx-auto"></div>
             </div>
             
             <LetterPaper content={letter} />

             {/* Footer space */}
             <div className="mt-20 text-rose-300 font-serif-elegant italic text-sm">
               Dành trọn tấm lòng này cho em.
             </div>
          </div>
        ) : null}
      </section>

      {/* Final Closing Section */}
      <section className="py-32 bg-rose-900 text-rose-50 px-4 relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center space-y-10 relative z-10">
          <h3 className="text-5xl font-handwriting">{CONFIG.FINAL_FOOTER_TITLE}</h3>
          <p className="text-lg font-serif-elegant italic opacity-80 leading-relaxed">
            {CONFIG.FINAL_FOOTER_SUBTITLE}
          </p>
          <div className="pt-8 opacity-50 text-[10px] tracking-[0.5em] uppercase">
            {CONFIG.COPYRIGHT}
          </div>
        </div>
        {/* Subtle decorative heart backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </section>
      
      {/* Floating Scroll Indicator */}
      {state !== AppState.GENERATING && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40 animate-bounce pointer-events-none">
          <div className="w-0.5 h-16 bg-rose-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default App;
