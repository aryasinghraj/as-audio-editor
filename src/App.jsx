import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen.jsx';
import SignInScreen from './components/SignInScreen.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import PermissionModal from './components/PermissionModal.jsx';
import AudioEditor from './components/AudioEditor.jsx';
import { Sparkles, Layout, User, Disc, Wand2 } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'auth' | 'home' | 'editor'
  const [user, setUser] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [activePreset, setActivePreset] = useState(null); // 'lofi' | 'noise' | 'tts'

  // Load saved session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('as_audio_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser({ name: 'Audio Creator', email: 'guest@asaudio.ai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' });
      }
    } catch (e) {}
  }, []);

  // Step 1: Splash Screen -> Sign In
  const handleSplashContinue = () => {
    // If already signed in, go straight to home screen
    const savedUser = localStorage.getItem('as_audio_user');
    if (savedUser) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('auth');
    }
  };

  // Step 2: Auth Screen -> Home Screen
  const handleSignInSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('as_audio_user', JSON.stringify(userData));
    setCurrentScreen('home');
  };

  const handleSkipAuth = () => {
    const guestUser = { name: 'Guest Creator', email: 'guest@asaudio.ai', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' };
    setUser(guestUser);
    setCurrentScreen('home');
  };

  // Step 3: Home Screen Tool Selection -> Permission Modal -> Editor
  const handleSelectTool = (toolName) => {
    setActivePreset(toolName);
    setShowPermissionModal(true);
  };

  const handleNewProject = (preset = null) => {
    setActivePreset(preset);
    setShowPermissionModal(true);
  };

  // Step 4: Permission Granted -> Open Editing Screen
  const handlePermissionGranted = () => {
    setShowPermissionModal(false);
    setCurrentScreen('editor');
  };

  const handlePermissionCancel = () => {
    setShowPermissionModal(false);
  };

  // Back to Home
  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // Sign Out
  const handleSignOut = () => {
    localStorage.removeItem('as_audio_user');
    setUser(null);
    setCurrentScreen('auth');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      
      {/* Top Floating Glass Navigation Bar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full glass-panel border border-white/20 shadow-2xl flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setCurrentScreen('splash')}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentScreen === 'splash' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Splash</span>
        </button>

        <button
          onClick={() => setCurrentScreen('auth')}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentScreen === 'auth' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>

        <button
          onClick={() => setCurrentScreen('home')}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentScreen === 'home' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentScreen('editor')}
          className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentScreen === 'editor' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Editor Studio</span>
        </button>
      </div>

      {/* Screen 1: Flash / Splash Screen */}
      {currentScreen === 'splash' && (
        <SplashScreen onContinue={handleSplashContinue} />
      )}

      {/* Screen 2: Sign-In Screen */}
      {currentScreen === 'auth' && (
        <SignInScreen 
          onSignInSuccess={handleSignInSuccess} 
          onSkip={handleSkipAuth} 
        />
      )}

      {/* Screen 3: Home Screen Dashboard */}
      {currentScreen === 'home' && (
        <HomeScreen
          user={user}
          onSelectTool={handleSelectTool}
          onNewProject={handleNewProject}
          onSignOut={handleSignOut}
        />
      )}

      {/* Permission Request Modal */}
      {showPermissionModal && (
        <PermissionModal
          onGrant={handlePermissionGranted}
          onCancel={handlePermissionCancel}
        />
      )}

      {/* Screen 4: Full Multi-Track Audio Editing Studio */}
      {currentScreen === 'editor' && (
        <AudioEditor
          initialPreset={activePreset}
          onBackToHome={handleBackToHome}
        />
      )}

    </div>
  );
}
