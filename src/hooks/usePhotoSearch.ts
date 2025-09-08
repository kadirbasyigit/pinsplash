import { useState, useCallback } from 'react';
import { searchPhotos, getRandomPhotos } from '../services/unsplash';
import type { UnsplashPhoto, SearchPhotosResponse } from '../services/unsplash';

interface UsePhotoSearchReturn {
  photos: UnsplashPhoto[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalPages: number;
  currentPage: number;
  search: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
  loadRandomPhotos: () => Promise<void>;
  reset: () => void;
}

export const usePhotoSearch = (): UsePhotoSearchReturn => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const reset = useCallback(() => {
    setPhotos([]);
    setCurrentPage(1);
    setTotalPages(0);
    setHasMore(false);
    setError(null);
    setCurrentQuery('');
  }, []);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      reset();
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentQuery(query);
    setCurrentPage(1);

    try {
      const response: SearchPhotosResponse = await searchPhotos(query, 1, 30);
      setPhotos(response.results);
      setTotalPages(response.total_pages);
      setHasMore(response.total_pages > 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search photos');
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !currentQuery) return;

    setLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const response: SearchPhotosResponse = await searchPhotos(currentQuery, nextPage, 30);
      
      setPhotos(prev => [...prev, ...response.results]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < response.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more photos');
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, currentQuery, currentPage]);

  const loadRandomPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentQuery('');

    try {
      const randomPhotos = await getRandomPhotos(30);
      setPhotos(randomPhotos);
      setCurrentPage(1);
      setTotalPages(1);
      setHasMore(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load random photos');
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    photos,
    loading,
    error,
    hasMore,
    totalPages,
    currentPage,
    search,
    loadMore,
    loadRandomPhotos,
    reset,
  };
};