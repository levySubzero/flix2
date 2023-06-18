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
    <div className="flex bg-zinc-800 items-center my-3 py-4 w-full">
      <div className="w-1/3">
        <img onClick={redirectToWatch} className="my-6 mx-4" src={data.thumbnailUrl} alt="" />
      </div>
      <div className="w-2/3">
        <div className="ml-8">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
          <p className='text-white'>{data.duration}</p>
        </div>
      </div>
    </div>
  );
}
export default EpisodeCard;

{/* onClick={redirectToWatch} */}