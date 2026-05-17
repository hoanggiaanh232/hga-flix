'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetail } from '@/lib/api/ophim';
import type { MovieDetail } from '@/lib/types';
import MoviePlayer from '@/components/MoviePlayer';
import MovieInfo from '@/components/MovieInfo';
import EpisodeList from '@/components/EpisodeList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getImageUrl } from '@/lib/utils/image';

export default function MovieDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(slug);
        setMovie(data);
        // Set default episode
        if (data.episodes && data.episodes.length > 0) {
          const firstServer = data.episodes[0];
          if (firstServer.server_data && firstServer.server_data.length > 0) {
            setSelectedEpisode(firstServer.server_data[0].link_embed);
          }
        }
      } catch (err) {
        setError('Không thể tải thông tin phim. Vui lòng thử lại sau.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lỗi</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link href="/" className="btn-primary inline-block">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      {/* Backdrop */}
      <div className="relative h-96 -mb-20 overflow-hidden">
        {movie.thumb_url && (
          <Image
            src={getImageUrl(movie.thumb_url)}
            alt={movie.name}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Poster and Basic Info */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl overflow-hidden sticky top-24">
              {movie.poster_url && (
                <div className="relative w-full h-96">
                  <Image
                    src={getImageUrl(movie.poster_url)}
                    alt={movie.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <MovieInfo movie={movie} />

            {/* Player */}
            {selectedEpisode && (
              <div className="glass rounded-2xl overflow-hidden">
                <MoviePlayer embedUrl={selectedEpisode} title={movie.name} />
              </div>
            )}

            {/* Episodes */}
            {movie.episodes && movie.episodes.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Danh sách tập</h3>
                <EpisodeList
                  episodes={movie.episodes}
                  selectedEpisode={selectedEpisode}
                  onSelectEpisode={setSelectedEpisode}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
