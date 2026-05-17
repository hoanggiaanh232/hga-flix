'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getMoviesByCategory, getMoviesByCountry, getMoviesByYear } from '@/lib/api/ophim';
import type { Movie, ListResponse } from '@/lib/types';
import MovieCard from '@/components/MovieCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';

type FilterType = 'category' | 'country' | 'year';

export default function ListPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const type = (searchParams.get('type') as FilterType) || 'category';
  const page = parseInt(searchParams.get('page') || '1');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let response: ListResponse;

        switch (type) {
          case 'country':
            response = await getMoviesByCountry(slug, page);
            setTitle(`Phim ${slug}`);
            break;
          case 'year':
            response = await getMoviesByYear(parseInt(slug), page);
            setTitle(`Phim năm ${slug}`);
            break;
          default:
            response = await getMoviesByCategory(slug, page);
            setTitle(`Phim thể loại ${slug}`);
        }

        setMovies(response.data.items || []);
        setTotalPages(response.data.params.pagination.totalPages);
      } catch (err) {
        setError('Không thể tải danh sách phim');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [slug, type, page]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
