import React from 'react';

export const Progress = ({ value, className }) => {
  return (
    <div className={`w-full h-1 bg-slate-700/30 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-indigo-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}; 