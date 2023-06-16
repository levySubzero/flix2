import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useMyListBillboard = () => {
  const { data, error, isLoading } = useSWR('/api/random', fetcher, { 
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

export default useMyListBillboard;
