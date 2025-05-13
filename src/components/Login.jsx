import React, { useState } from 'react';
import { showSuccessToast, showErrorToast } from "./ToastifyConfig";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import FloatingMenu from './FloatingMenu';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        showSuccessToast('Login successful!');
        navigate('/');
      } else {
        showErrorToast(result.error || 'Login failed');
        return;
      }
    } catch (error) {
      showErrorToast('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <FloatingMenu />
    <div className="min-h-screen text-white pt-4 px-2 sm:px-8 relative overflow-hidden group/bg overflow-y-auto">
      {/* Interactive background elements */}
      <div className="fixed inset-0 transition-all duration-700 group-hover/bg:backdrop-blur-sm z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 group-hover/bg:opacity-30 transition-opacity duration-700">
          <div className="absolute top-0 -left-4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-10 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative mt-10 sm:mt-16 z-10">
        {/* Content */}
        <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-3 sm:p-8 shadow-2xl border border-slate-700/40">
          <div className="mt-4 sm:mt-12 flex justify-center">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 border border-slate-700/40 z-20">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center justify-center mb-6 relative">
                      {/* Simple glow effect to match header */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl transition-all duration-500 z-0" />
                      <img 
                        src="/GalleryApp-Logo.png" 
                        alt="GalleryApp Logo" 
                        className="h-20 w-20 sm:h-24 sm:w-24 object-contain relative z-10"
                      />
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-5 drop-shadow">Login to Your Account</h2>
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 text-base sm:text-sm text-white hover:text-indigo-200 font-medium tracking-wide px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600/70 to-purple-600/70 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200 border border-indigo-700/40 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>

                  <p className="mt-6 text-center">
                    <a 
                      href="/signup" 
                      className="group inline-flex items-center gap-2 text-sm hover:scale-105 transition-all duration-200"
                    >
                      <span className="text-white/70">Don't have an account?</span>
                      <span className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium">
                        Create account
                        <UserPlus 
                          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" 
                          strokeWidth={2.5}
                        />
                      </span>
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login; 