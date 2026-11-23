# AS Audio Editor - Android AI Audio Studio 🎵

A modern, high-performance audio editing and AI-powered sound studio web and mobile application built with **React**, **Vite**, **Tailwind CSS**, and **Capacitor**.

## ✨ Key Features

- **Multi-Track Waveform Audio Visualizer**: Interactive audio waveform rendering with precise trimming, cutting, and time-scrubbing.
- **AI Sound Enhancement**: Noise suppression, vocal isolation, pitch shifting, tempo adjustments, and bass boosting.
- **Audio Effects Rack**: Reverb, echo, distortion, equalizer, compressor, and spatial stereo imaging.
- **Voiceover & Recording**: Built-in high-fidelity microphone recording with live decibel metering and pause/resume support.
- **Multi-Format Export**: Export audio directly to MP3, WAV, AAC, and OGG formats with customizable bitrates.
- **Android Ready (Capacitor)**: Built with `@capacitor/android` for seamless deployment as a native mobile APK.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Lucide Icons, Canvas Confetti
- **Styling**: Tailwind CSS (Dark Mode by default)
- **Audio Processing**: Web Audio API, AudioContext, AudioNodes
- **Mobile Engine**: Capacitor 8 (Android)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aryasinghraj/as-audio-editor.git
cd as-audio-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build Web App

```bash
npm run build
```

### Android Build (Capacitor)

```bash
npx cap sync
npx cap open android
```

---
Developed by **[aryasinghraj](https://github.com/aryasinghraj)**
