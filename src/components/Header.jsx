import React from 'react';
import { Shield } from 'lucide-react';

const Header = ({ badgeText = "Secure Platform" }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 h-auto gap-4 sm:gap-0 w-full px-2 sm:px-0">
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start">
        <div className="relative group w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
          {/* Simple glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl transition-all duration-500" />
          <img
            className="h-24 w-24 object-contain"
            src="/GalleryApp-Logo.png"
            alt="GalleryApp Logo"
          />
        </div>
        <div className="flex-shrink-0">
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight animate-gradient whitespace-nowrap text-center sm:text-left">
            SnapVault
          </h1>
          <p className="text-white/80 text-xs sm:text-sm mt-1 tracking-wide whitespace-nowrap text-center sm:text-left">Secure. Private. Effortless.</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-sm border border-slate-700/30 flex-shrink-0 mt-2 sm:mt-0">
        <Shield className="w-6 h-6 text-white" />
        <span className="text-sm font-medium text-white tracking-wide whitespace-nowrap">{badgeText}</span>
      </div>
    </div>
  );
};

export default Header; 