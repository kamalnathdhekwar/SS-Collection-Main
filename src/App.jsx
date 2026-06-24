import React, { useState } from 'react';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';

function App() {
  // 'login' manages both sign-in/sign-up; 'home' displays the marketplace catalog
  const [currentView, setCurrentView] = useState('login'); 

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between antialiased overflow-x-hidden">

      {/* Shared navigation matrix deck */}
      <Header onViewChange={setCurrentView} />

      {/* Dynamic Main Body Content viewport */}
      <main className={`flex-grow flex flex-col pt-[160px] md:pt-[180px] ${currentView === 'login' ? 'justify-center' : ''}`}>
        {currentView === 'login' ? (
          <LoginPage />
        ) : (
          <div className="text-center py-20 text-neutral-500 font-medium max-w-7xl mx-auto px-4 w-full">
            <p className="text-xl font-bold text-neutral-800">Main E-Commerce Landing Page Content</p>
            <p className="text-sm text-neutral-400 mt-1">Product collections & layout grids will mount here.</p>
            <button 
              onClick={() => setCurrentView('login')}
              className="mt-6 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs font-medium cursor-pointer transition-colors shadow-xs"
            >
              Go to Sign In / Sign Up
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;