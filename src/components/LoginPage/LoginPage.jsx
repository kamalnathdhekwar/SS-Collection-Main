import React, { useState } from 'react';

export default function LoginPage() {
  // 'signin' displays the login interface, 'signup' displays the registration form
  const [mode, setMode] = useState('signin');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signin') {
      console.log('Logging in:', { email, password });
    } else {
      console.log('Registering:', { name, email, password });
    }
  };

  return (
    // FIXED: Added specific top padding (pt-[160px] on mobile, md:pt-[140px] on desktop) to handle fixed header overlap elegantly
    <div className="flex-grow w-full flex flex-col items-center justify-center px-4 pt-[160px] md:pt-[140px] pb-12 font-sans bg-white">
      
      {/* Central Isolated Authentication Deck */}
      <div className="w-full max-w-[400px] border border-neutral-300 rounded-lg p-6 md:p-8 space-y-6 bg-white">
        
        {/* Dynamic Header Label */}
        <div className="space-y-1">
          <h1 className="text-2xl font-normal text-neutral-900">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h1>
          <p className="text-xs text-neutral-500">
            {mode === 'signin' 
              ? 'Secure client authentication gateway' 
              : 'Join our multi-mart consumer retail network'}
          </p>
        </div>

        {/* Input Interface Wrapper */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {/* Your Name Input Box - Only shows up during Sign Up */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-800">
                Your name
              </label>
              <input
                type="text"
                required
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-neutral-400 rounded shadow-inner focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all text-neutral-900 placeholder-neutral-400"
              />
            </div>
          )}

          {/* Account Identifier Input Box */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-800">
              Email or mobile phone number
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-neutral-400 rounded shadow-inner focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all text-neutral-900"
              autoComplete="email"
            />
          </div>

          {/* Cipher Password Input Box */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-neutral-800">
                Password
              </label>
              {mode === 'signin' && (
                <a href="#" className="text-xs text-neutral-600 hover:text-neutral-900 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              required
              placeholder={mode === 'signup' ? 'At least 6 characters' : ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-neutral-400 rounded shadow-inner focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all text-neutral-900 placeholder-neutral-400"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {/* State Retention Checkbox - Only shows up during Sign In */}
          {mode === 'signin' && (
            <div className="flex items-start pt-1">
              <label className="flex items-center text-xs text-neutral-600 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="mr-2 rounded border-neutral-400 text-neutral-900 focus:ring-0 w-4 h-4 accent-neutral-900" 
                />
                Keep me signed in
              </label>
            </div>
          )}

          {/* Primary Submit CTA */}
          <button
            type="submit"
            className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded border border-neutral-950 shadow-sm transition-all cursor-pointer text-center"
          >
            {mode === 'signin' ? 'Continue' : 'Register'}
          </button>
        </form>

        {/* Dynamic Navigation Footer Area */}
        {mode === 'signin' ? (
          <>
            {/* Content Boundary Row */}
            <div className="relative flex py-2 items-center text-xs text-neutral-400 font-medium">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink mx-3 text-neutral-400 uppercase tracking-wider text-[10px]">New to the platform?</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            {/* Primary Creation Directives */}
            <button 
              type="button"
              onClick={() => setMode('signup')}
              className="w-full py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border border-neutral-300 text-sm font-medium rounded shadow-xs transition-colors cursor-pointer text-center"
            >
              Create your account
            </button>
          </>
        ) : (
          <div className="text-xs text-center text-neutral-600 pt-2">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => setMode('signin')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Sign in
            </button>
          </div>
        )}

      </div>

      {/* Basic Compliance Row */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-medium">
        <a href="#" className="hover:underline hover:text-neutral-900">Conditions of Use</a>
        <a href="#" className="hover:underline hover:text-neutral-900">Privacy Notice</a>
        <a href="#" className="hover:underline hover:text-neutral-900">Help Desk</a>
      </div>
    </div>
  );
}