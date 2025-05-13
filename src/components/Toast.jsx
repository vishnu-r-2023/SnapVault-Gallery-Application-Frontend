import React, { useEffect } from "react";

const Toast = ({ message, type = "error", onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-xl text-white text-base font-medium transition-all animate-fade-in-down ${type === "error" ? "bg-red-600" : "bg-green-600"}`}>
      {message}
      <button className="ml-4 text-white/70 hover:text-white text-xl font-bold" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
