import React from 'react';
import { 
  Plus, 
  Disc, 
  ShieldCheck, 
  MessageSquareQuote, 
  Music, 
  Sparkles, 
  Sliders, 
  Mic, 
  FolderPlus, 
  User, 
  LogOut,
  ChevronRight,
  Clock,
  Wand2
} from 'lucide-react';

export default function HomeScreen({ user, onSelectTool, onNewProject, onSignOut }) {
  return (
    <div className="min-h-screen pb-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col">
      
      {/* Top Navbar */}
      <header className="py-6 flex items-center justify-between border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl glass-box border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">AS AUDIO</span>
              <span className="font-curved text-xl text-indigo-400 font-bold">Editor</span>
            </div>
            <p className="text-xs text-slate-400">Translucent AI Studio</p>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">{user?.name || 'Pro Creator'}</span>
            <span className="text-[10px] text-slate-400">{user?.email || 'guest@asaudio.ai'}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl glass-box border border-white/20 p-0.5 relative overflow-hidden flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-300" />
          </div>
          <button
            onClick={onSignOut}
            title="Sign Out"
            className="p-2.5 rounded-2xl glass-box hover:text-rose-400 text-slate-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Banner / Hero Welcome */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 shadow-2xl mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-box text-xs font-semibold text-indigo-300 mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Audio Suite Ready
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create, Clean & Convert Audio with AI
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Transform tracks into Lofi vibes, eliminate background noise, or generate natural speech in Hindi, English & more using Web AI tools.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNewProject()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Quick Start</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Main AI Tool Icons Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-indigo-400" />
            AI Audio Core Tools
          </h2>
          <span className="text-xs text-slate-400">Tap icon to open tool studio</span>
        </div>

        {/* 3 Main Feature Cards in Translucent Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Tool 1: Lofi Converter */}
          <div
            onClick={() => onSelectTool('lofi')}
            className="group relative cursor-pointer p-6 rounded-3xl glass-panel border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/20"
          >
            {/* Translucent Box around icon */}
            <div className="w-14 h-14 rounded-2xl glass-box border border-purple-400/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:border-purple-400 transition-all shadow-lg shadow-purple-500/10">
              <Disc className="w-7 h-7 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                Lofi Converter
              </h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Convert music to relaxing slowed + reverb, vinyl crackle synthesis & warm tape hiss.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-purple-300">
                Slowed + Reverb
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-purple-300">
                Vinyl Crackle
              </span>
            </div>
          </div>

          {/* Tool 2: Noise Reducer */}
          <div
            onClick={() => onSelectTool('noise')}
            className="group relative cursor-pointer p-6 rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
          >
            {/* Translucent Box around icon */}
            <div className="w-14 h-14 rounded-2xl glass-box border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                Noise Reducer
              </h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI spectral noise gate filter to suppress background hum, hiss, static & wind noise.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-cyan-300">
                Spectral Gate
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-cyan-300">
                Vocal Clarity
              </span>
            </div>
          </div>

          {/* Tool 3: Text to AI Audio */}
          <div
            onClick={() => onSelectTool('tts')}
            className="group relative cursor-pointer p-6 rounded-3xl glass-panel border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/20"
          >
            {/* Translucent Box around icon */}
            <div className="w-14 h-14 rounded-2xl glass-box border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:border-indigo-400 transition-all shadow-lg shadow-indigo-500/10">
              <MessageSquareQuote className="w-7 h-7" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                Text to AI Audio
              </h3>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate speech in Hindi (हिंदी), English, Spanish, French, German & Japanese.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-indigo-300">
                Hindi 🇮🇳
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-indigo-300">
                English 🇺🇸
              </span>
              <span className="px-2.5 py-1 rounded-lg glass-box text-[10px] font-semibold text-indigo-300">
                +4 Languages
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Prominent "+ New Project" Card below the 3 AI icons */}
      <div className="mb-10">
        <div
          onClick={onNewProject}
          className="group relative cursor-pointer p-8 rounded-3xl glass-panel border border-indigo-500/30 hover:border-indigo-500/70 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          {/* Subtle glowing animated backdrop */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-600/10 group-hover:opacity-100 opacity-60 transition-opacity"></div>

          <div className="relative z-10 flex items-center gap-5">
            {/* Big Icon inside translucent glass box */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl glass-box border border-indigo-400/40 flex items-center justify-center text-indigo-300 group-hover:scale-105 group-hover:border-indigo-400 transition-all shadow-xl shadow-indigo-500/20">
              <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform duration-500 text-indigo-400" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-box text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-1">
                Studio Mode
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                New Project
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md">
                Open full Web Audio multi-track editor with live visualization, effects & multi-lingual AI speech generator.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto py-3.5 px-7 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all flex items-center justify-center gap-2">
              <FolderPlus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Audio Samples / Recent Demo Tracks */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          Recent Studio Demos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            onClick={() => onNewProject('lofi-beat')}
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/25 cursor-pointer flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-box flex items-center justify-center text-purple-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Lofi Midnight Chill Synth</h4>
                <p className="text-xs text-slate-400">44.1kHz • AI Lofi Presets Applied</p>
              </div>
            </div>
            <span className="text-xs text-indigo-400 font-semibold hover:underline">Open</span>
          </div>

          <div 
            onClick={() => onNewProject('hindi-podcast')}
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/25 cursor-pointer flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-box flex items-center justify-center text-cyan-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hindi Voiceover & Noise Clean</h4>
                <p className="text-xs text-slate-400">AI Speech • Reduced Noise Gate</p>
              </div>
            </div>
            <span className="text-xs text-indigo-400 font-semibold hover:underline">Open</span>
          </div>
        </div>
      </div>

    </div>
  );
}
