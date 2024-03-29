import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useCategories = () => {
  const { data, error, isLoading } = useSWR('/api/categories', fetcher, {
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

export default useCategories;
