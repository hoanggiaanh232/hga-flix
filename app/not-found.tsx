import React from 'react';

export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="glass text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold text-accent mb-4">404</h1>
        <p className="text-gray-300 mb-6">Trang không tìm thấy</p>
        <a href="/" className="btn-primary inline-block">
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}
