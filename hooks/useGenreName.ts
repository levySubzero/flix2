import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useCategories = (id?: string) => {
  const { data, error, isLoading } = useSWR(id ? `/api/genres/${id}` : null, fetcher, {
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
