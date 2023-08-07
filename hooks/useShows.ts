import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useShows = (catId?: string) => {
  const { data, error, isLoading } = useSWR(catId ? `/api/show/category/${catId}` : null, fetcher, {
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

export default useShows;
