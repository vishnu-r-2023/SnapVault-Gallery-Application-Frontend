import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Image as ImageIcon, BookOpen, LogOut, LogIn, UserPlus, Search } from 'lucide-react';

import { Menu, X } from 'lucide-react';

const FloatingMenu = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation links as a fragment for reuse
  const navLinks = (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-indigo-500/20 transition-colors duration-200">
              <Home className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 whitespace-nowrap">Home</span>
          </Link>
          <Link to="/photos" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-purple-500/20 transition-colors duration-200">
              <ImageIcon className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-purple-400 whitespace-nowrap">Your Photos</span>
          </Link>
          <Link to="/aisearch" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-blue-500/20 transition-colors duration-200">
              <Search className="w-5 h-5 text-slate-300 group-hover:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-blue-400 whitespace-nowrap">AI Search</span>
          </Link>
          <Link to="/publish" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-pink-500/20 transition-colors duration-200">
              <BookOpen className="w-5 h-5 text-slate-300 group-hover:text-pink-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-pink-400 whitespace-nowrap">Publications</span>
          </Link>
          <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="group flex items-center space-x-2">
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-red-500/20 transition-colors duration-200">
              <LogOut className="w-5 h-5 text-slate-300 group-hover:text-red-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-red-400 whitespace-nowrap">Logout</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-indigo-500/20 transition-colors duration-200">
              <Home className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 whitespace-nowrap">Home</span>
          </Link>
          <Link to="/publish" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-pink-500/20 transition-colors duration-200">
              <BookOpen className="w-5 h-5 text-slate-300 group-hover:text-pink-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-pink-400 whitespace-nowrap">Publications</span>
          </Link>
          <Link to="/login" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-emerald-500/20 transition-colors duration-200">
              <LogIn className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-emerald-400">Login</span>
          </Link>
          <Link to="/signup" className="group flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-purple-500/20 transition-colors duration-200">
              <UserPlus className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-purple-400">Sign Up</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="z-50">
      {/* Hamburger for mobile only */}
      <button
        className="fixed top-4 left-4 z-[100] p-2 rounded-md bg-slate-800/80 border border-slate-700/40 shadow-lg md:hidden"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen(true)}
        style={{ display: isMobileMenuOpen ? 'none' : undefined }}
      >
        <Menu className="w-7 h-7 text-white" />
      </button>

      {/* Mobile overlay menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[101] bg-slate-900/80 backdrop-blur-md border border-slate-700/40 flex flex-col justify-center md:hidden animate-fade-in">
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 border border-slate-700/40 shadow-lg"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-7 h-7 text-white" />
          </button>
          <nav className="flex flex-col gap-6 text-lg w-full max-w-xs pl-8 items-start text-left">
            {navLinks}
          </nav>
        </div>
      )}

      {/* Tablet/Desktop floating menu (top) */}
      <div className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-800/30 backdrop-blur-sm px-8 py-3 rounded-full border border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-indigo-500/20 transition-colors duration-200">
                    <Home className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
                    
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 whitespace-nowrap">Home</span>
                </Link>
                <Link to="/photos" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-purple-500/20 transition-colors duration-200">
                    <ImageIcon className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-purple-400 whitespace-nowrap">Your Photos</span>
                </Link>
                <Link to="/aisearch" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-blue-500/20 transition-colors duration-200">
                    <Search className="w-5 h-5 text-slate-300 group-hover:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-blue-400 whitespace-nowrap">AI Search</span>
                </Link>
                <Link to="/publish" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-pink-500/20 transition-colors duration-200">
                    <BookOpen className="w-5 h-5 text-slate-300 group-hover:text-pink-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-pink-400 whitespace-nowrap">Publications</span>
                </Link>
                <button onClick={handleLogout} className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-red-500/20 transition-colors duration-200">
                    <LogOut className="w-5 h-5 text-slate-300 group-hover:text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-red-400 whitespace-nowrap">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-indigo-500/20 transition-colors duration-200">
                    <Home className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 whitespace-nowrap">Home</span>
                </Link>
                <Link to="/publish" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-pink-500/20 transition-colors duration-200">
                    <BookOpen className="w-5 h-5 text-slate-300 group-hover:text-pink-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-pink-400 whitespace-nowrap">Publications</span>
                </Link>
                <Link to="/login" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-emerald-500/20 transition-colors duration-200">
                    <LogIn className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-emerald-400">Login</span>
                </Link>
                <Link to="/signup" className="group flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-slate-700/30 group-hover:bg-purple-500/20 transition-colors duration-200">
                    <UserPlus className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
                  </div>
                  <span className="ext-sm font-medium text-slate-300 group-hover:text-purple-400 whitespace-nowrap">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;