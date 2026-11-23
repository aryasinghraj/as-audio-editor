import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Disc, Music, Sliders, Activity } from 'lucide-react';

export default function SplashScreen({ onContinue }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-6 overflow-hidden bg-[#070b14]">
      {/* Background ambient glowing shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Floating Translucent Glass Icon Boxes in background */}
      <div className="absolute top-16 left-10 p-3 rounded-2xl glass-box animate-float pointer-events-none hidden md:block">
        <Activity className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="absolute top-1/4 right-12 p-3.5 rounded-2xl glass-box animate-float pointer-events-none hidden md:block" style={{ animationDelay: '1.5s' }}>
        <Disc className="w-7 h-7 text-purple-400" />
      </div>
      <div className="absolute bottom-32 left-16 p-3 rounded-2xl glass-box animate-float pointer-events-none hidden md:block" style={{ animationDelay: '2.5s' }}>
        <Sliders className="w-6 h-6 text-cyan-400" />
      </div>

      {/* Top Header info */}
      <div className={`transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'} pt-8`}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-box text-xs font-medium text-indigo-300 tracking-wider uppercase border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} /> Next-Gen AI Audio Studio
        </span>
      </div>

      {/* Main Flash Screen Branding Center */}
      <div className={`relative z-10 flex flex-col items-center text-center my-auto transition-all duration-1000 transform ${loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        
        {/* Main Logo Container with Translucent Box */}
        <div className="relative mb-6 p-8 rounded-3xl glass-panel border border-white/15 shadow-2xl flex flex-col items-center justify-center min-w-[300px] sm:min-w-[380px]">
          {/* Subtle logo icon glow */}
          <div className="w-16 h-16 mb-4 rounded-2xl glass-box flex items-center justify-center border border-indigo-400/30 text-indigo-400 shadow-lg shadow-indigo-500/20">
            <Music className="w-9 h-9" />
          </div>

          {/* AS Audio - Big Normal Stylish Font */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200 drop-shadow-md">
            AS AUDIO
          </h1>

          {/* Curved "Editor" text on downside of AS */}
          <div className="relative w-full flex justify-center -mt-2 sm:-mt-3">
            <svg viewBox="0 0 300 60" className="w-64 h-16 overflow-visible pointer-events-none">
              <path id="curve" d="M 30,15 Q 150,55 270,15" fill="transparent" />
              <text className="font-curved text-3xl sm:text-4xl fill-indigo-400 font-bold tracking-wider text-shadow-sm">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  Editor ✨
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        <p className="text-slate-400 text-sm sm:text-base max-w-md px-4 leading-relaxed font-light">
          AI Lofi Converter • Intelligent Noise Reducer • Multi-lingual Text-to-Audio Engine
        </p>
      </div>

      {/* Bottom CTA Action Button */}
      <div className={`relative z-20 w-full max-w-xs transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} pb-10`}>
        <button
          type="button"
          onClick={() => {
            console.log("Splash Get Started clicked");
            onContinue();
          }}
          className="group relative z-30 w-full py-4 px-6 rounded-2xl glass-box border border-indigo-500/40 text-white font-semibold flex items-center justify-center gap-3 overflow-hidden shadow-xl hover:shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 via-purple-600/40 to-cyan-600/40 group-hover:opacity-100 opacity-60 transition-opacity pointer-events-none"></div>
          <span className="relative z-10 text-base pointer-events-none">Get Started</span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform text-indigo-300 pointer-events-none" />
        </button>
      </div>
    </div>
  );
}
