import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      {/* Testing his custom text gradient */}
      <h1 className="font-display text-5xl font-black uppercase tracking-widest text-gradient">
        SS Collection
      </h1>
      
      {/* Testing his frosted glass panel asset and base border tokens */}
      <div className="glass max-w-sm rounded-xl p-8 text-center border">
        <p className="font-body text-sm text-gray-400 tracking-wide">
          If you can see this text gradient above and a blurry, translucent card outline right here, your setup is completely successful.
        </p>
      </div>

      {/* Testing his bold red glow-primary button animation */}
      <button className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-md border border-red-600/35 glow-primary transition-smooth">
        Initialize Terminal
      </button>
    </div>
  )
}

export default App;