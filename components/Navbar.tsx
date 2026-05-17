'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 glass rounded-b-3xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-2xl hover:text-accent transition-colors"
          >
            <span className="text-accent">HGA</span>
            <span>Flix</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            <Link
              href="/danh-sach/phim-moi?type=category"
              className="hover:text-accent transition-colors"
            >
              Phim Mới
            </Link>
            <Link
              href="/danh-sach/phim-bo?type=category"
              className="hover:text-accent transition-colors"
            >
              Phim Bộ
            </Link>
            <Link
              href="/danh-sach/phim-le?type=category"
              className="hover:text-accent transition-colors"
            >
              Phim Lẻ
            </Link>
            <Link
              href="/danh-sach/hanh-dong?type=category"
              className="hover:text-accent transition-colors"
            >
              Hành Động
            </Link>
          </div>

          {/* Search and Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-64">
              <SearchBar onSearch={handleSearch} />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3">
            <Link
              href="/"
              className="block py-2 hover:text-accent transition-colors"
            >
              Trang Chủ
            </Link>
            <Link
              href="/danh-sach/phim-moi?type=category"
              className="block py-2 hover:text-accent transition-colors"
            >
              Phim Mới
            </Link>
            <Link
              href="/danh-sach/phim-bo?type=category"
              className="block py-2 hover:text-accent transition-colors"
            >
              Phim Bộ
            </Link>
            <Link
              href="/danh-sach/phim-le?type=category"
              className="block py-2 hover:text-accent transition-colors"
            >
              Phim Lẻ
            </Link>
            <div className="pt-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
