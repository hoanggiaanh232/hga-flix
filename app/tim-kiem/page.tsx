'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/lib/api/ophim';
import type { Movie } from '@/lib/types';
import MovieCard from '@/components/MovieCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get('q') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(!!keyword);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!keyword) {
      setLoading(false);
      return;
    }

    const performSearch = async () => {
      try {
        setLoading(true);
        const data = await searchMovies(keyword);
        setResults(data);
        setSearched(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [keyword]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary py-12">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} initialValue={keyword} />
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        ) : searched ? (
          <div>
            <h2 className="text-2xl font-bold mb-8">
              Kết quả tìm kiếm cho "{keyword}"
            </h2>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Không tìm thấy phim nào</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
