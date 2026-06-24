import React from 'react';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col antialiased overflow-x-hidden">

      <Header />

      <main className="flex-grow flex flex-col justify-center pt-[160px] md:pt-[180px]">
        <LoginPage />
      </main>

      <Footer />
    </div>
  );
}

export default App;