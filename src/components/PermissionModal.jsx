import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Mic, Music, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PermissionModal({ onGrant, onCancel }) {
  const [granting, setGranting] = useState(false);

  const handleGrant = async () => {
    setGranting(true);
    // Request actual microphone permission if supported
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
      }
    } catch (e) {
      console.log('Permission granted via simulation');
    }
    setTimeout(() => {
      setGranting(false);
      onGrant();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Top Header Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl glass-box border border-indigo-400/40 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/20">
            <HardDrive className="w-8 h-8" />
          </div>
        </div>

        {/* Text Details */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-box text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5 text-indigo-400" /> Permission Required
          </span>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Storage & Audio Access
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            AS Audio Editor needs your permission to read audio files from your device storage, record live microphone tracks, and export processed HD audio.
          </p>
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-3 mb-7">
          <div className="flex items-start gap-3 p-3 rounded-2xl glass-box border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Device Audio Storage</h4>
              <p className="text-[11px] text-slate-400">Import MP3, WAV, FLAC, M4A audio tracks into multi-track timeline.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl glass-box border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Microphone Input</h4>
              <p className="text-[11px] text-slate-400">Record high quality voiceovers directly with real-time noise reduction.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGrant}
            disabled={granting}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {granting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Granting Permission...
              </span>
            ) : (
              <>
                <span>Allow & Open Editing Screen</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={onCancel}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Security badge */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-500">
            Your files stay local on your device. We respect privacy.
          </p>
        </div>

      </div>
    </div>
  );
}
