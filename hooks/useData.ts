import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useData = () => {
  const { data, error, isLoading } = useSWR('/api/adminData', fetcher, { 
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

export default useData;
