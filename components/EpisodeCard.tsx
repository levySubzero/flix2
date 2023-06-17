import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill  } from 'react-icons/bs';
import { BiChevronDown  } from 'react-icons/bi';
import { EpisodeInterface } from '@/types';
import useInfoModalEpisodeStore from '@/hooks/useInfoModalEpisodeStore';

interface EpisodeCardProps {
  data: EpisodeInterface;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalEpisodeStore();

  const redirectToWatch = useCallback(() => router.push(`/watchEpisode/${data.id}`), [router, data.id]);

  return (
    <div className="w-100">
      <div onClick={redirectToWatch} className="  flex flex-col items-center bg-zinc-900 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img onClick={redirectToWatch} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={data.thumbnailUrl} alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
          <p className='text-white'>{data.duration}</p>
        </div>
      </div>
    </div>
  );
}
export default EpisodeCard;

