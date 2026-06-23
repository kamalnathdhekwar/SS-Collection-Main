import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header/Header'
import Hero_Section from './components/Hero-Section/Hero-Section'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <div className="">
        <Header />
      </div>
       <div className="">
        <Hero_Section />
      </div>
       <div className="">
        <Footer />
      </div>
      
    </>
  )
}

export default App;