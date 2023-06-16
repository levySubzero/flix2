import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

const useEpisodeList = (id?: string) => {
  const { data, error, isLoading } = useSWR(id ? `/api/episodes/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  // console.log(id)
  // console.log("how")
  return {
    data,
    error,
    isLoading,
  }
};

export default useEpisodeList;
