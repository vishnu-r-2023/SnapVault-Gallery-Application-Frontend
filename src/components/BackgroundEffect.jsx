import React from 'react';

const BackgroundEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Dotted grid SVG */}
    <svg width="100%" height="100%" className="absolute inset-0 animate-gradient">
      <defs>
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="2" fill="#67e8f9" opacity="0.10" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
    {/* Animated blurred blobs */}
    <div className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-cyan-400/30 rounded-full mix-blend-lighten filter blur-2xl animate-blob" style={{animationDelay: '0s'}}></div>
    <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-violet-500/40 rounded-full mix-blend-lighten filter blur-2xl animate-blob" style={{animationDelay: '2s'}}></div>
    <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-blue-500/30 rounded-full mix-blend-lighten filter blur-2xl animate-blob" style={{animationDelay: '4s', transform: 'translate(-50%, -50%)'}}></div>
  </div>
);

export default BackgroundEffect;
