import React from 'react';
import { LogIn, Mail, FileText, Shield, BarChart2, Search, Lock, Cpu, CheckCircle, Upload, Brain, Link2, Cloud, ShieldOff, CreditCard, UserPlus, FolderOpen, Smartphone, Monitor, Laptop } from 'lucide-react';
import Header from './Header';
import FloatingMenu from "./FloatingMenu";

const Home = () => {
  return (
    <>
    <FloatingMenu />
     {/* Animated blurred background blobs */}
  <div className="fixed inset-0 transition-all duration-700 group-hover/bg:backdrop-blur-sm z-0 pointer-events-none">
    <div className="absolute inset-0 opacity-20 group-hover/bg:opacity-30 transition-opacity duration-700">
      <div className="absolute top-0 -left-4 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 -right-4 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-10 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>
  </div>
    <div className="min-h-screen text-white pt-4 px-2 sm:px-8 relative overflow-hidden group/bg overflow-y-auto">
      <div className="max-w-6xl mx-auto relative mt-10 sm:mt-16 z-10">
        {/* Content */}
        <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-3 sm:p-8 shadow-2xl border border-slate-700/40">
          <Header />

          {/* Welcome Section */}
          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">🌐 Welcome to SnapVault</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
            SnapVault is a secure, privacy-first photo gallery platform designed to keep your memories safe and under your control. With end-to-end encryption, smart organization, and private sharing features, SnapVault offers a seamless way to store, manage, and share your photos—without ads, tracking, or compromise. Whether you're preserving family moments, delivering client albums, or protecting sensitive media, SnapVault is the trusted solution for secure photo storage.
            </p>  
          </div>

          {/* What Makes SnapVault Unique Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">🔍 What Makes SnapVault Unique?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-green-400 transition-all duration-300 flex flex-col items-center text-center">
  <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
  <h3 className="text-lg font-semibold text-white mb-2">1. End-to-End Security</h3>
  <p className="text-gray-300">Your photos are encrypted on your device before they ever reach our servers.<br/>Only you—and those you explicitly authorize—can access your content.<br/>We use AES-256 and TLS 1.3 to keep data secure at all times.</p>
</div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-pink-400 transition-all duration-300 flex flex-col items-center text-center">
  <Brain className="w-8 h-8 text-pink-400 mb-2" />
  <h3 className="text-lg font-semibold text-white mb-2">2. Smart Photo Management</h3>
  <p className="text-gray-300">Auto-categorization by date, location, faces, and events—without compromising your privacy.<br/>Search your gallery with powerful filters, not AI models trained on your content.</p>
</div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-blue-400 transition-all duration-300 flex flex-col items-center text-center">
  <Link2 className="w-8 h-8 text-blue-400 mb-2" />
  <h3 className="text-lg font-semibold text-white mb-2">3. Private Sharing, Redefined</h3>
  <p className="text-gray-300">Share albums securely with expiring links, password-protection, and view/download tracking.<br/>Revoke access at any time.</p>
</div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-cyan-400 transition-all duration-300 flex flex-col items-center text-center">
  <Cloud className="w-8 h-8 text-cyan-400 mb-2" />
  <h3 className="text-lg font-semibold text-white mb-2">4. Cloud Convenience with Local Options</h3>
  <p className="text-gray-300">Access your gallery from any device.<br/>Choose to store backups on your device, private cloud, or encrypted drives.</p>
</div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-red-400 transition-all duration-300 flex flex-col items-center text-center">
  <ShieldOff className="w-8 h-8 text-red-400 mb-2" />
  <h3 className="text-lg font-semibold text-white mb-2">5. No Ads. No Tracking. Ever.</h3>
  <p className="text-gray-300">We are privacy-first, not ad-driven.<br/>No facial recognition sent to third parties.<br/>No hidden analytics. Just full transparency.</p>
</div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-yellow-400 transition-all duration-300 flex flex-col items-center text-center">
  <CreditCard className="w-8 h-8 text-yellow-400 mb-2" />
  <h3 className="text-lg font-semibold text-white mb-2">6. Secure Payments</h3>
  <p className="text-gray-300">All payments are processed with PCI DSS-compliant providers. Your financial data is never stored or shared.</p>
</div>
            </div>
          </div>

          {/* Who Is SnapVault For Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">📸 Who Is SnapVault For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-purple-400 transition-all duration-300 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">🧑‍👩‍👧 Families & Everyday Users</h3>
                <p className="text-gray-300">Preserve and protect your memories across generations.</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-pink-400 transition-all duration-300 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">📷 Professional Photographers</h3>
                <p className="text-gray-300">Deliver secure client albums with watermarking and download control.</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-blue-400 transition-all duration-300 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">🏢 Enterprises & Agencies</h3>
                <p className="text-gray-300">Manage sensitive media with granular permissions, audit logs, and access control.</p>
              </div>
            </div>
          </div>

          {/* How to Get Started Section */}
          <div className="mt-16">
  <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2"><Upload className="w-7 h-7 text-indigo-400" />How to Get Started</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-green-400 transition-all duration-300 flex flex-col items-center text-center">
      <UserPlus className="w-8 h-8 text-green-400 mb-2" />
      <h3 className="font-semibold text-white mb-2">Step 1: Create Your Free Account</h3>
      <p className="text-gray-300">Get started in seconds with just an email. No credit card required.</p>
    </div>
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-blue-400 transition-all duration-300 flex flex-col items-center text-center">
      <FolderOpen className="w-8 h-8 text-blue-400 mb-2" />
      <h3 className="font-semibold text-white mb-2">Step 2: Upload & Organize</h3>
      <p className="text-gray-300">Import photos from your device, Google Photos, Dropbox, or directly via drag-and-drop.</p>
    </div>
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-pink-400 transition-all duration-300 flex flex-col items-center text-center">
      <Lock className="w-8 h-8 text-pink-400 mb-2" />
      <h3 className="font-semibold text-white mb-2">Step 3: Secure & Share</h3>
      <p className="text-gray-300">Create albums, apply security controls, and share with peace of mind.</p>
    </div>
  </div>
</div>

          {/* Privacy Commitment Section */}
          <div className="mt-16">
  <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2"><Shield className="w-7 h-7 text-yellow-400" />Your Privacy Is Our Priority</h2>
  <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-yellow-400 transition-all duration-300 flex flex-col items-center text-center max-w-2xl mx-auto">
    <p className="text-gray-300 mb-4">We’re committed to digital freedom. With SnapVault:</p>
    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 text-left">
      <li>You own your photos.</li>
      <li>You control who sees them.</li>
      <li>You decide how long they stay.</li>
      <li>No third parties. No fine print. No compromises.</li>
    </ul>
  </div>
</div>

          {/* Platform Availability Section */}
          <div className="mt-16">
  <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2"><Smartphone className="w-7 h-7 text-cyan-400" />Available on All Devices</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-cyan-400 transition-all duration-300 flex flex-col items-center text-center">
      <Smartphone className="w-8 h-8 text-cyan-400 mb-2" />
      <h3 className="font-semibold text-white mb-2">iOS & Android Apps</h3>
      <p className="text-gray-300">Access SnapVault on the go with our full-featured mobile apps.</p>
    </div>
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-indigo-400 transition-all duration-300 flex flex-col items-center text-center">
      <Monitor className="w-8 h-8 text-indigo-400 mb-2" />
      <h3 className="font-semibold text-white mb-2">Web-based Dashboard</h3>
      <p className="text-gray-300">Manage your gallery from any browser, anywhere, anytime.</p>
    </div>
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-green-400 transition-all duration-300 flex flex-col items-center text-center">
      <Laptop className="w-8 h-8 text-green-400 mb-2" />
      <h3 className="font-semibold text-white mb-2">Desktop Upload Tool</h3>
      <p className="text-gray-300">Bulk upload and organize from Windows, Mac, or Linux desktops.</p>
    </div>
  </div>
</div>

          {/* Testimonials Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">💬 What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30">
                <p className="italic text-gray-200 mb-2">“SnapVault gave me peace of mind. I trust it with every baby photo of my daughter.”</p>
                <p className="text-right text-gray-400">— Aditi M., Mom & Engineer</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30">
                <p className="italic text-gray-200 mb-2">“Client delivery used to be a nightmare. Now it’s secure and seamless.”</p>
                <p className="text-right text-gray-400">— Ravi S., Wedding Photographer</p>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="/signup" className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/60 hover:bg-slate-800/80 text-white font-semibold text-base shadow-lg border border-cyan-400/30 hover:border-cyan-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
  <span>Sign Up Free</span>
  <UserPlus className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" strokeWidth={2.5} />
</a>
<a href="/login" className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/60 hover:bg-slate-800/80 text-white font-semibold text-base shadow-lg border border-cyan-400/30 hover:border-cyan-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
  <span>Log In to Your Account</span>
  <LogIn className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" strokeWidth={2.5} />
</a>
<a href="/support" className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/60 hover:bg-slate-800/80 text-white font-semibold text-base shadow-lg border border-cyan-400/30 hover:border-cyan-400 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
  <span>Contact Support</span>
  <Mail className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" strokeWidth={2.5} />
</a>
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

export default Home; 