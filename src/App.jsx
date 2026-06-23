import React from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between antialiased overflow-x-hidden">
      
      {/* Central E-Commerce Form Focus Area */}
      <main className="flex-grow flex flex-col justify-center">
        <LoginPage />
      </main>
      
      {/* Structural Amazon/Flipkart Baseline Footer */}
      <Footer />
    </div>
  );
}

export default App;