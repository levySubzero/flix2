import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useSeries = (id?: string) => {
  const { data, error, isLoading } = useSWR(id ? `/api/show/${id}` : null, fetcher, {
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

export default useSeries;
