import React, { useState } from "react";
import Toast from "./Toast";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Building, LogIn } from 'lucide-react';
import FloatingMenu from './FloatingMenu';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        password: formData.password
      });

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred during signup');
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
    <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-3 sm:p-8 shadow-2xl border border-slate-700/40 relative overflow-hidden">
      {/* Watermark SnapVault logo */}
      <img 
        src="/GalleryApp-logo.png" 
        alt="SnapVault Watermark" 
        className="absolute top-0.5 left-1/2 w-20 h-20 opacity-15 pointer-events-none select-none z-0 transform -translate-x-1/2"
        style={{opacity:0.40}}
      />
      <div className="mt-4 sm:mt-12 flex justify-center">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 border border-slate-700/40 z-20 relative overflow-hidden">
            <CardContent className="p-4 sm:p-5 relative z-10">
                  <div className="flex items-center justify-center mb-6 relative">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl transition-all duration-500 z-0" />
  <img 
    src="/user-logo.png" 
    alt="User Logo" 
    className="w-16 h-16 rounded-full object-cover relative z-10"
  />
</div>
                  <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-5 drop-shadow">Create Your Account</h2>
                  <Toast message={error} type="error" onClose={() => setError("")} />
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">First Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Last Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Company</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800/20 border border-slate-700/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
  {isLoading ? 'Creating Account...' : 'Create Account'}
</button>
                  </form>
                  <p className="mt-6 text-center">
                    <a 
                      href="/login" 
                      className="group inline-flex items-center gap-2 text-sm hover:scale-105 transition-all duration-200"
                    >
                      <span className="text-white/70">Already have an account?</span>
                      <span className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium">
                        Login
                        <LogIn 
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

      {/* Footer */}
      <div className="max-w-6xl mx-auto relative mt-8 mb-4">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-700/30">
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} SnapVault. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup; 