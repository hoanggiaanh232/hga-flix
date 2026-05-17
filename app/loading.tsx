import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-glass-light/20 border-t-accent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-glass-light/10 border-r-accent/50 animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
}
