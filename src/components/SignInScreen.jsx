import React, { useState } from 'react';
import { Mail, Phone, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, Check, X, KeyRound, User, AlertCircle } from 'lucide-react';

export default function SignInScreen({ onSignInSuccess, onSkip }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [rememberMe, setRememberMe] = useState(true);

  // Active Modals state
  const [activeModal, setActiveModal] = useState(null); // 'google' | 'facebook' | 'apple' | 'otp' | 'signup' | null
  const [otpCode, setOtpCode] = useState(['1', '2', '3', '4']);
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sample Google Accounts for authentic selection
  const googleAccounts = [
    { name: 'Alex Rivera', email: 'alex.rivera@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { name: 'Dei Miller', email: 'dei.audio@gmail.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' }
  ];

  // Submit standard Form
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email && !phone) {
      setErrorMsg('Please enter an email or phone number.');
      return;
    }

    if (phone && !email) {
      // Trigger OTP verification modal for Phone login
      setActiveModal('otp');
      return;
    }

    // Direct Email Sign-In
    const userSession = {
      name: email.split('@')[0],
      email: email,
      provider: 'email',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      loginTime: new Date().toLocaleTimeString()
    };
    saveAndComplete(userSession);
  };

  // Complete Auth & Save to LocalStorage
  const saveAndComplete = (userData) => {
    if (rememberMe) {
      localStorage.setItem('as_audio_user', JSON.stringify(userData));
    }
    onSignInSuccess(userData);
  };

  // OTP Code Verification Submit
  const handleOtpVerify = () => {
    const codeStr = otpCode.join('');
    if (codeStr.length < 4) {
      setErrorMsg('Please enter a 4-digit code.');
      return;
    }
    const userSession = {
      name: `User ${phone.slice(-4) || 'Creator'}`,
      email: `${countryCode}${phone}@phone.asaudio.ai`,
      phone: `${countryCode} ${phone}`,
      provider: 'phone',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      loginTime: new Date().toLocaleTimeString()
    };
    saveAndComplete(userSession);
  };

  // Complete Sign Up
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpEmail || !signUpName) return;
    const userSession = {
      name: signUpName,
      email: signUpEmail,
      provider: 'email',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      loginTime: new Date().toLocaleTimeString()
    };
    saveAndComplete(userSession);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden bg-[#070b14]">
      {/* Background lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-[110px] pointer-events-none"></div>

      {/* Header Bar */}
      <div className="w-full max-w-md flex justify-between items-center z-10 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl glass-box flex items-center justify-center border border-white/10 text-indigo-400">
            <span className="font-bold text-sm">AS</span>
          </div>
          <span className="font-semibold text-white tracking-wide text-sm">Audio Editor</span>
        </div>
        <button
          onClick={onSkip}
          className="px-3.5 py-1.5 rounded-full glass-box text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          Guest Mode
        </button>
      </div>

      {/* Floating Avatars matching user design inspiration */}
      <div className="relative w-full max-w-md h-44 sm:h-52 flex items-center justify-center my-2 z-10">
        <div className="absolute top-2 left-8 sm:left-14 p-1.5 rounded-full glass-panel border border-white/20 shadow-2xl animate-float">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/40 shadow-inner">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="absolute top-0 right-8 sm:right-14 p-1.5 rounded-full glass-panel border border-white/20 shadow-2xl animate-float" style={{ animationDelay: '1.2s' }}>
          <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-white/40 shadow-inner">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Avatar 2" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="absolute bottom-4 p-1 rounded-full glass-panel border border-white/20 shadow-2xl animate-float" style={{ animationDelay: '0.6s' }}>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" alt="Avatar 3" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full glass-box text-[11px] font-bold text-white shadow-md border border-white/30 whitespace-nowrap">
            Dei • Pro Member
          </div>
        </div>
      </div>

      {/* Main Glass Sign-In Card */}
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl z-10 my-auto">
        <div className="text-center mb-5">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Let's get you signed in!</h2>
          <p className="text-slate-400 text-xs mt-1">Full access to AI Lofi, Noise Reducer & TTS Studio</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* OAuth Social Buttons */}
        <div className="space-y-2.5 mb-5">
          {/* Google */}
          <button
            onClick={() => setActiveModal('google')}
            className="w-full py-3 px-4 rounded-2xl glass-box border border-white/15 flex items-center justify-center gap-3 text-slate-100 font-medium text-sm hover:border-indigo-500/50 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 pointer-events-none" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="pointer-events-none">Sign in with Google</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => setActiveModal('facebook')}
            className="w-full py-3 px-4 rounded-2xl glass-box border border-white/15 flex items-center justify-center gap-3 text-slate-100 font-medium text-sm hover:border-blue-500/50 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-[#1877F2] pointer-events-none" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="pointer-events-none">Sign in with Facebook</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => setActiveModal('apple')}
            className="w-full py-3 px-4 rounded-2xl glass-box border border-white/15 flex items-center justify-center gap-3 text-slate-100 font-medium text-sm hover:border-slate-400/50 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-white pointer-events-none" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.22.67-2.93 1.5-.64.74-1.2 1.92-1.05 3.05 1.12.09 2.26-.58 2.99-1.44z"/>
            </svg>
            <span className="pointer-events-none">Sign in with Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute px-3 glass-box rounded-full text-[11px] font-medium text-slate-400">
            or Phone / Email
          </span>
        </div>

        {/* Phone / Email Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3">
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-3 py-3 rounded-2xl glass-input text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="+1" className="bg-slate-900 text-white">🇺🇸 +1</option>
              <option value="+91" className="bg-slate-900 text-white">🇮🇳 +91</option>
              <option value="+44" className="bg-slate-900 text-white">🇬🇧 +44</option>
              <option value="+33" className="bg-slate-900 text-white">🇫🇷 +33</option>
              <option value="+49" className="bg-slate-900 text-white">🇩🇪 +49</option>
            </select>

            <input
              type="text"
              placeholder="Phone or Email"
              value={phone || email}
              onChange={(e) => {
                const val = e.target.value;
                if (val.includes('@')) {
                  setEmail(val);
                  setPhone('');
                } else {
                  setPhone(val);
                  setEmail('');
                }
              }}
              className="w-full py-3 px-4 rounded-2xl glass-input text-sm focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-4 pr-11 rounded-2xl glass-input text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-indigo-500"
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-indigo-400 hover:underline">Forgot password?</button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={() => setActiveModal('signup')}
              className="text-indigo-300 font-semibold hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Interactive Google OAuth Modal */}
      {activeModal === 'google' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-5">
              <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h3 className="text-lg font-bold text-white">Choose a Google Account</h3>
              <p className="text-xs text-slate-400">to continue to AS Audio Editor</p>
            </div>

            <div className="space-y-2 mb-5">
              {googleAccounts.map((acc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveModal(null);
                    saveAndComplete({ name: acc.name, email: acc.email, avatar: acc.avatar, provider: 'google' });
                  }}
                  className="p-3 rounded-2xl glass-box hover:border-indigo-500/50 cursor-pointer flex items-center gap-3 transition-all"
                >
                  <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{acc.name}</h4>
                    <p className="text-[11px] text-slate-400">{acc.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                saveAndComplete({ name: 'Google Creator', email: 'creator@gmail.com', avatar: googleAccounts[0].avatar, provider: 'google' });
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-500 text-white font-bold text-xs"
            >
              Use Another Account
            </button>
          </div>
        </div>
      )}

      {/* Interactive Facebook Modal */}
      {activeModal === 'facebook' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <svg className="w-12 h-12 mx-auto mb-3 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <h3 className="text-lg font-bold text-white">Log in with Facebook</h3>
            <p className="text-xs text-slate-400 mb-5">AS Audio Editor will receive your name & profile picture.</p>
            
            <button
              onClick={() => {
                setActiveModal(null);
                saveAndComplete({ name: 'Sam Taylor', email: 'sam.taylor@facebook.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', provider: 'facebook' });
              }}
              className="w-full py-3 rounded-2xl bg-[#1877F2] text-white font-bold text-xs shadow-lg shadow-blue-500/25 mb-2"
            >
              Continue as Sam Taylor
            </button>
          </div>
        </div>
      )}

      {/* Interactive Apple Modal */}
      {activeModal === 'apple' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <svg className="w-12 h-12 mx-auto mb-3 fill-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.22.67-2.93 1.5-.64.74-1.2 1.92-1.05 3.05 1.12.09 2.26-.58 2.99-1.44z"/>
            </svg>
            <h3 className="text-lg font-bold text-white">Sign in with Apple ID</h3>
            <p className="text-xs text-slate-400 mb-5">Use your Apple ID to sign in to AS Audio Editor.</p>

            <button
              onClick={() => {
                setActiveModal(null);
                saveAndComplete({ name: 'Chris Miller', email: 'chris@icloud.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', provider: 'apple' });
              }}
              className="w-full py-3 rounded-2xl bg-white text-black font-bold text-xs shadow-lg mb-2"
            >
              Continue with Touch ID / Password
            </button>
          </div>
        </div>
      )}

      {/* Phone OTP Code Modal */}
      {activeModal === 'otp' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl glass-box border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Enter OTP Verification Code</h3>
            <p className="text-xs text-slate-400 mb-4">Sent 4-digit code to {countryCode} {phone || '555-0192'}</p>

            {/* OTP Code Boxes */}
            <div className="flex justify-center gap-2 mb-5">
              {otpCode.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => {
                    const newArr = [...otpCode];
                    newArr[i] = e.target.value;
                    setOtpCode(newArr);
                  }}
                  className="w-12 h-12 text-center text-lg font-bold rounded-xl glass-input focus:outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleOtpVerify}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25"
            >
              Verify Code & Continue
            </button>
          </div>
        </div>
      )}

      {/* Registration / Sign Up Modal */}
      {activeModal === 'signup' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-5">
              <h3 className="text-xl font-extrabold text-white">Create New Account</h3>
              <p className="text-xs text-slate-400">Join AS Audio Editor Creator Platform</p>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full py-3 px-4 rounded-2xl glass-input text-sm focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="w-full py-3 px-4 rounded-2xl glass-input text-sm focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className="w-full py-3 px-4 rounded-2xl glass-input text-sm focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 mt-2"
              >
                Create Free Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Security Footer */}
      <div className="z-10 pb-2 flex items-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-indigo-400" />
        <span>End-to-End Encrypted Authentication</span>
      </div>
    </div>
  );
}
