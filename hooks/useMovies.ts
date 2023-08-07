import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useMovies = (catId?: string) => {
  const { data, error, isLoading } = useSWR(catId ? `/api/movies/category/${catId}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovies;
