import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FloatingMenu from './components/FloatingMenu.jsx';
import Home from './components/Home.jsx';
import AISearch from './components/AISearch.jsx';
import Publications from './components/Publications.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import BackgroundEffect from './components/BackgroundEffect';
import YourPhotos from './components/YourPhotos.jsx';

import { ToastContainer, Bounce } from './components/ToastifyConfig';

const AppContent = () => {
  return (
      <>
        <BackgroundEffect />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="App">
          <FloatingMenu />
          <div className="pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/aisearch" element={<AISearch apiKey={process.env.REACT_APP_GEMINI_API_KEY} />} />
              <Route path="/photos" element={<YourPhotos />} />
              <Route path="/publish" element={<Publications />} />
            </Routes>
          </div>
        </div>
      </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
