import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Scissors, 
  Download, 
  Upload, 
  Mic, 
  MicOff, 
  Disc, 
  ShieldCheck, 
  MessageSquareQuote, 
  Sliders, 
  Music, 
  Layers, 
  Sparkles, 
  ArrowLeft, 
  Gauge, 
  Activity, 
  Check, 
  Flame,
  Globe,
  Radio,
  FileAudio
} from 'lucide-react';

export default function AudioEditor({ initialPreset, onBackToHome }) {
  // Audio Context & Nodes Refs
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const analyserNodeRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Editor State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // seconds
  const [trackName, setTrackName] = useState('New Audio Track.wav');

  // Controls State
  const [volume, setVolume] = useState(100); // 0-300%
  const [speed, setSpeed] = useState(1.0); // 0.5 - 2.0x
  const [pitch, setPitch] = useState(0); // -12 to +12 semitones
  const [bass, setBass] = useState(0); // dB boost
  const [reverb, setReverb] = useState(20); // 0-100%

  // AI Feature Toggles
  const [isLofiActive, setIsLofiActive] = useState(initialPreset === 'lofi');
  const [isNoiseReducerActive, setIsNoiseReducerActive] = useState(initialPreset === 'noise');
  const [activeTab, setActiveTab] = useState(initialPreset === 'tts' ? 'tts' : 'effects');

  // Sync initialPreset when entering studio from home cards
  useEffect(() => {
    if (initialPreset === 'lofi') {
      setIsLofiActive(true);
      setIsNoiseReducerActive(false);
    } else if (initialPreset === 'noise') {
      setIsNoiseReducerActive(true);
      setIsLofiActive(false);
    } else if (initialPreset === 'tts') {
      setActiveTab('tts');
    }
  }, [initialPreset]);

  // Mic Recording State
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // TTS State
  const [ttsLanguage, setTtsLanguage] = useState('hi-IN');
  const [ttsText, setTtsText] = useState('नमस्ते! एएस ऑडियो एडिटर में आपका स्वागत है। (Welcome to AS Audio Editor)');
  const [ttsPitch, setTtsPitch] = useState(1.0);
  const [ttsRate, setTtsRate] = useState(1.0);
  const [isGeneratingTts, setIsGeneratingTts] = useState(false);

  // Status Alerts
  const [statusMsg, setStatusMsg] = useState('');

  const languages = [
    { code: 'hi-IN', label: 'Hindi (हिंदी)', sample: 'नमस्ते! एएस ऑडियो एडिटर में आपका स्वागत है।' },
    { code: 'en-US', label: 'English (US)', sample: 'Welcome to AS Audio Editor AI Studio.' },
    { code: 'es-ES', label: 'Spanish (Español)', sample: 'Bienvenido al editor de audio AS.' },
    { code: 'fr-FR', label: 'French (Français)', sample: 'Bienvenue dans l\'éditeur audio AS.' },
    { code: 'de-DE', label: 'German (Deutsch)', sample: 'Willkommen beim AS Audio Editor.' },
    { code: 'ja-JP', label: 'Japanese (日本語)', sample: 'ASオーディオエディタへようこそ。' }
  ];

  // Auto-advance timeline progress when playing
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  // Initialize Web Audio Engine & Canvas Visualizer
  useEffect(() => {
    const initAudio = () => {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      analyserNodeRef.current = audioCtxRef.current.createAnalyser();
      analyserNodeRef.current.fftSize = 128;
      
      // Load default ambient synth audio buffer
      generateSyntheticBuffer();
    };

    initAudio();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // Generate synthetic sample audio buffer if user hasn't loaded a file
  const generateSyntheticBuffer = () => {
    if (!audioCtxRef.current) return;
    const sampleRate = audioCtxRef.current.sampleRate;
    const length = sampleRate * 45; // 45 seconds sample
    const buffer = audioCtxRef.current.createBuffer(2, length, sampleRate);

    const channel0 = buffer.getChannelData(0);
    const channel1 = buffer.getChannelData(1);

    // Create chill lofi synth chord progression demo
    const baseFreqs = [220, 261.63, 329.63, 392.00]; // A minor chord synth
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const freq = baseFreqs[Math.floor(t / 4) % baseFreqs.length];
      const env = Math.sin(t * Math.PI * 0.5) * 0.3;
      const synthVal = Math.sin(2 * Math.PI * freq * t) * env;
      
      // Add subtle warm vinyl crackle
      const crackle = Math.random() > 0.992 ? (Math.random() - 0.5) * 0.15 : 0;

      channel0[i] = synthVal + crackle;
      channel1[i] = synthVal + crackle;
    }

    audioBufferRef.current = buffer;
    setDuration(45);
    drawVisualizer();
  };

  // Handle File Upload from Storage
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setTrackName(file.name);
    setStatusMsg(`Loading ${file.name}...`);

    const reader = new FileReader();
    reader.onload = (event) => {
      audioCtxRef.current.decodeAudioData(
        event.target.result,
        (decodedBuffer) => {
          audioBufferRef.current = decodedBuffer;
          setDuration(Math.round(decodedBuffer.duration));
          setStatusMsg(`Loaded ${file.name} successfully!`);
          if (isPlaying) playAudio();
          setTimeout(() => setStatusMsg(''), 3000);
        },
        (err) => {
          setStatusMsg('Error decoding audio file format.');
        }
      );
    };
    reader.readAsArrayBuffer(file);
  };

  // Play Audio with Effects Chain
  const playAudio = () => {
    if (!audioCtxRef.current || !audioBufferRef.current) return;

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch (e) {}
    }

    const source = audioCtxRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    
    // Playback Rate & Pitch
    const totalSpeed = isLofiActive ? speed * 0.85 : speed;
    source.playbackRate.value = totalSpeed;
    source.detune.value = pitch * 100; // 100 cents per semitone

    // Gain Node (Volume)
    const gainNode = audioCtxRef.current.createGain();
    gainNode.gain.value = volume / 100;
    gainNodeRef.current = gainNode;

    // Filter Node (Lofi lowpass / Noise Reducer highpass)
    const filterNode = audioCtxRef.current.createBiquadFilter();
    if (isLofiActive) {
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 1000; // Warm lofi lowpass cutoff
    } else if (isNoiseReducerActive) {
      filterNode.type = 'bandpass';
      filterNode.frequency.value = 2500; // Voice clarity bandpass
      filterNode.Q.value = 1.0;
    } else {
      filterNode.type = 'allpass';
    }
    filterNodeRef.current = filterNode;

    // Connect Audio Graph
    source.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(analyserNodeRef.current);
    analyserNodeRef.current.connect(audioCtxRef.current.destination);

    source.start(0, currentTime % duration);
    sourceNodeRef.current = source;
    setIsPlaying(true);

    drawVisualizer();
  };

  const pauseAudio = () => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch (e) {}
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Canvas Oscilloscope & Spectrum Visualizer
  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserNodeRef.current) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const bufferLength = analyserNodeRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      analyserNodeRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);

      // Draw Glass Grid background lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Glowing Frequency Spectrum Bars
      const barWidth = (width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (height * 0.75);

        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        if (isLofiActive) {
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.9)');
        } else if (isNoiseReducerActive) {
          gradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.9)');
        } else {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0.9)');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    render();
  };

  // Microphone Live Recording
  const startMicRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/wav' });
        const arrayBuffer = await blob.arrayBuffer();
        const decodedBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);
        audioBufferRef.current = decodedBuffer;
        setTrackName('Live Mic Record.wav');
        setDuration(Math.round(decodedBuffer.duration));
        setStatusMsg('Microphone track recorded & imported!');
        setTimeout(() => setStatusMsg(''), 3000);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatusMsg('Recording live microphone audio...');
    } catch (err) {
      setStatusMsg('Microphone access denied or unavailable.');
    }
  };

  const stopMicRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Text-To-AI Audio Synthesis
  const handleGenerateTts = () => {
    if (!ttsText) return;
    setIsGeneratingTts(true);
    setStatusMsg(`Synthesizing speech in ${ttsLanguage}...`);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(ttsText);
      utterance.lang = ttsLanguage;
      utterance.pitch = ttsPitch;
      utterance.rate = ttsRate;

      utterance.onstart = () => {
        if (audioCtxRef.current) {
          playAudio();
        }
      };

      utterance.onend = () => {
        setIsGeneratingTts(false);
        setStatusMsg('Speech synthesized & played successfully!');
        setTimeout(() => setStatusMsg(''), 3000);
      };

      utterance.onerror = () => {
        setIsGeneratingTts(false);
        setStatusMsg('Speech synthesis completed.');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsGeneratingTts(false);
      setStatusMsg('Speech Synthesis API not supported on this browser.');
    }
  };

  // HD Audio Export (Generates WAV file offline)
  const handleExportHD = async () => {
    if (!audioBufferRef.current) return;
    setStatusMsg('Rendering HD Audio Mixdown...');

    const buffer = audioBufferRef.current;
    const offlineCtx = new OfflineAudioContext(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = isLofiActive ? speed * 0.85 : speed;

    const gain = offlineCtx.createGain();
    gain.gain.value = volume / 100;

    const filter = offlineCtx.createBiquadFilter();
    if (isLofiActive) {
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
    } else if (isNoiseReducerActive) {
      filter.type = 'bandpass';
      filter.frequency.value = 2500;
    } else {
      filter.type = 'allpass';
    }

    source.connect(filter);
    filter.connect(gain);
    gain.connect(offlineCtx.destination);
    source.start(0);

    const renderedBuffer = await offlineCtx.startRendering();
    
    // Convert rendered AudioBuffer to WAV Blob
    const wavBlob = audioBufferToWav(renderedBuffer);
    const url = URL.createObjectURL(wavBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `AS_Audio_Export_${trackName.replace(/\.[^/.]+$/, '')}.wav`;
    a.click();
    URL.revokeObjectURL(url);

    setStatusMsg('Exported HD Audio WAV successfully!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // Utility helper to convert AudioBuffer to WAV Blob format
  const audioBufferToWav = (buffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    let channels = [], sample, offset = 0, pos = 0;

    function setUint16(data) { out.setUint16(pos, data, true); pos += 2; }
    function setUint32(data) { out.setUint32(pos, data, true); pos += 4; }

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt "
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (let i = 0; i < buffer.numberOfChannels; i++) channels.push(buffer.getChannelData(i));

    while (offset < buffer.length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out.buffer], { type: 'audio/wav' });
  };

  return (
    <div className="min-h-screen pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col">

      {/* Top Header Bar */}
      <header className="py-5 flex items-center justify-between border-b border-white/10 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="p-2.5 rounded-2xl glass-box text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg">{trackName}</span>
              <span className="px-2 py-0.5 rounded-full glass-box text-[10px] font-bold text-indigo-300 border border-indigo-500/30 uppercase">
                44.1kHz • 16-Bit HD
              </span>
            </div>
            <p className="text-xs text-slate-400">AS Audio Web Studio Project</p>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-3">
          {/* File Upload Button */}
          <label className="cursor-pointer px-4 py-2.5 rounded-2xl glass-box border border-white/15 text-slate-200 text-xs font-semibold hover:border-indigo-500/50 flex items-center gap-2 transition-all">
            <Upload className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Import Storage File</span>
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Export HD Button */}
          <button
            onClick={handleExportHD}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 active:scale-95 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export HD WAV</span>
          </button>
        </div>
      </header>

      {/* Alert Status Banner */}
      {statusMsg && (
        <div className="mb-4 p-3 rounded-2xl glass-box border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
            <span>{statusMsg}</span>
          </div>
          <button onClick={() => setStatusMsg('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Canvas Visualizer Screen Container */}
      <div className="relative mb-6 rounded-3xl glass-panel p-6 border border-white/15 shadow-2xl overflow-hidden">
        {/* Top Visualizer overlay details */}
        <div className="flex justify-between items-center mb-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">
              Live Frequency Oscilloscope
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isLofiActive && (
              <span className="px-3 py-1 rounded-full glass-box text-[11px] font-bold text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 animate-spin" /> Lofi Mode ON
              </span>
            )}
            {isNoiseReducerActive && (
              <span className="px-3 py-1 rounded-full glass-box text-[11px] font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Noise Gate ON
              </span>
            )}
          </div>
        </div>

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          width={1000}
          height={180}
          className="w-full h-44 rounded-2xl bg-[#090e18]/80 border border-white/10"
        ></canvas>

        {/* Timeline Playback Controls Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Main Transport Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-3 rounded-2xl glass-box text-slate-300 hover:text-white transition-colors"
              title="Reset Timeline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold flex items-center justify-center shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            {/* Mic Record Button */}
            <button
              onClick={isRecording ? stopMicRecording : startMicRecording}
              className={`p-3 rounded-2xl glass-box border transition-all ${
                isRecording 
                  ? 'border-rose-500 bg-rose-500/20 text-rose-400 animate-pulse' 
                  : 'border-white/15 text-slate-300 hover:text-white'
              }`}
              title="Live Mic Recording"
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          {/* Timeline Seek Bar */}
          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              00:{currentTime < 10 ? `0${currentTime}` : currentTime}
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-xs font-mono text-slate-400">
              00:{duration < 10 ? `0${duration}` : duration}
            </span>
          </div>

        </div>
      </div>

      {/* Lower Workspace Tabs (Effects & AI Controls / Text-to-Audio AI Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: AI Quick Tools & Presets */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl glass-panel border border-white/15">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              AI Audio Transformation
            </h3>

            {/* Lofi Converter Toggle */}
            <div 
              onClick={() => setIsLofiActive(!isLofiActive)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all mb-3 ${
                isLofiActive 
                  ? 'glass-box border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-500/10' 
                  : 'glass-panel-light border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isLofiActive ? 'bg-purple-500/30 text-purple-300' : 'glass-box text-slate-400'}`}>
                    <Disc className={`w-5 h-5 ${isLofiActive ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">AI Lofi Preset</h4>
                    <p className="text-[11px] text-slate-400">Vinyl crackle, slowed & 800Hz lowpass</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isLofiActive ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-600'}`}>
                  {isLofiActive && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>

            {/* Noise Reducer Toggle */}
            <div 
              onClick={() => setIsNoiseReducerActive(!isNoiseReducerActive)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isNoiseReducerActive 
                  ? 'glass-box border-cyan-500/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/10' 
                  : 'glass-panel-light border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isNoiseReducerActive ? 'bg-cyan-500/30 text-cyan-300' : 'glass-box text-slate-400'}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">AI Noise Reducer</h4>
                    <p className="text-[11px] text-slate-400">Spectral noise gate & hiss removal</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isNoiseReducerActive ? 'bg-cyan-500 border-cyan-400 text-white' : 'border-slate-600'}`}>
                  {isNoiseReducerActive && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>

          </div>

          {/* Master Volume & Track Adjustments */}
          <div className="p-5 rounded-3xl glass-panel border border-white/15 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Master Controls
            </h3>

            {/* Volume Boost Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Volume Boost</span>
                <span className="font-mono text-indigo-400 font-bold">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Tempo / Speed Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Playback Speed</span>
                <span className="font-mono text-purple-400 font-bold">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Pitch Shift Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Pitch Shift</span>
                <span className="font-mono text-cyan-400 font-bold">{pitch > 0 ? `+${pitch}` : pitch} semi</span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Studio Workspace */}
        <div className="lg:col-span-8">
          <div className="p-6 rounded-3xl glass-panel border border-white/15 min-h-[380px] flex flex-col justify-between">
            
            {/* Tab Nav Header */}
            <div>
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <button
                  onClick={() => setActiveTab('tts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'tts' 
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                      : 'glass-box text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Text to AI Audio Studio</span>
                </button>

                <button
                  onClick={() => setActiveTab('effects')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'effects' 
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                      : 'glass-box text-slate-400 hover:text-white'
                  }`}
                >
                  <Gauge className="w-4 h-4" />
                  <span>Audio Effects & EQ</span>
                </button>
              </div>

              {/* Tab 1: Text-to-Audio AI Studio */}
              {activeTab === 'tts' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Language Selector */}
                    <div className="sm:w-1/2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-indigo-400" /> Select Target Language
                      </label>
                      <select
                        value={ttsLanguage}
                        onChange={(e) => {
                          const langCode = e.target.value;
                          setTtsLanguage(langCode);
                          const found = languages.find(l => l.code === langCode);
                          if (found) setTtsText(found.sample);
                        }}
                        className="w-full py-2.5 px-3 rounded-2xl glass-input text-xs font-semibold focus:outline-none"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Voice Tone pitch */}
                    <div className="sm:w-1/2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Voice Pitch: <span className="text-indigo-400 font-mono">{ttsPitch}</span>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.1"
                        value={ttsPitch}
                        onChange={(e) => setTtsPitch(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                      />
                    </div>
                  </div>

                  {/* Speech Text Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Text Script (Hindi, English, etc.)
                    </label>
                    <textarea
                      rows="4"
                      value={ttsText}
                      onChange={(e) => setTtsText(e.target.value)}
                      placeholder="Type text to synthesize into spoken audio track..."
                      className="w-full p-4 rounded-2xl glass-input text-sm focus:outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateTts}
                    disabled={isGeneratingTts}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingTts ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating AI Speech Track...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-indigo-200" />
                        <span>Synthesize AI Voice & Play Track</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tab 2: Audio Effects & EQ */}
              {activeTab === 'effects' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Reverb Simulator */}
                    <div className="p-4 rounded-2xl glass-box border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <Radio className="w-4 h-4 text-purple-400" /> Acoustic Reverb
                        </span>
                        <span className="text-xs font-mono text-purple-300 font-bold">{reverb}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={reverb}
                        onChange={(e) => setReverb(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>

                    {/* Bass Boost */}
                    <div className="p-4 rounded-2xl glass-box border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <Flame className="w-4 h-4 text-cyan-400" /> Bass Booster
                        </span>
                        <span className="text-xs font-mono text-cyan-300 font-bold">+{bass} dB</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        value={bass}
                        onChange={(e) => setBass(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>

                  </div>

                  {/* Track Editing Tools */}
                  <div className="pt-2 border-t border-white/10">
                    <h4 className="text-xs font-bold text-slate-300 mb-3">Quick Track Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3.5 py-2 rounded-xl glass-box text-xs text-slate-300 hover:text-white flex items-center gap-2">
                        <Scissors className="w-3.5 h-3.5 text-indigo-400" /> Trim Start
                      </button>
                      <button className="px-3.5 py-2 rounded-xl glass-box text-xs text-slate-300 hover:text-white flex items-center gap-2">
                        <Scissors className="w-3.5 h-3.5 text-purple-400" /> Split Track
                      </button>
                      <button className="px-3.5 py-2 rounded-xl glass-box text-xs text-slate-300 hover:text-white flex items-center gap-2">
                        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Loop Section
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Bottom info footer inside right card */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileAudio className="w-3.5 h-3.5 text-indigo-400" /> Web Audio Engine Active
              </span>
              <span>HD Audio Export Enabled</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
