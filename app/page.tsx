'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import MovieSlider from '@/components/MovieSlider';
import { getHomeData } from '@/lib/api/ophim';
import type { Movie, Collection } from '@/lib/types';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
  const [singlePageMovies, setSinglePageMovies] = useState<Movie[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const data = await getHomeData();
        setSinglePageMovies(data.singlePage || []);
        setCollections(data.collections || []);
      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lỗi</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      {singlePageMovies.length > 0 && (
        <HeroSection movies={singlePageMovies.slice(0, 5)} />
      )}

      {/* Movie Collections */}
      <div className="space-y-12 py-12">
        {collections.map((collection) => (
          <MovieSlider
            key={collection._id}
            title={collection.name}
            movies={collection.items}
            collectionSlug={collection.slug}
          />
        ))}
      </div>

      {/* All Single Page Movies */}
      {singlePageMovies.length > 0 && (
        <MovieSlider
          title="Phim Lẻ Mới Nhất"
          movies={singlePageMovies}
          viewAllLink="/phim-le"
        />
      )}
    </div>
  );
}
