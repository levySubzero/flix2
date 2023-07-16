import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useShows = () => {
  const { data, error, isLoading } = useSWR('/api/show', fetcher, {
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
