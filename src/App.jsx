import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero_Section from './components/Hero_Section/Hero_Section';
import AddToCart from './components/addToCart/addToCart';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  // 'login' manages both sign-in/sign-up; 'home' displays the marketplace catalog
  // const [currentView, setCurrentView] = useState('login'); 

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between antialiased overflow-x-hidden">

      <Header onViewChange={setCurrentView} />

      <main className="flex-1">
        {currentView === 'login' ? (
          <LoginPage />
        ) : (
          <>
            <Hero_Section />
            {/* <AddToCart /> */}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;