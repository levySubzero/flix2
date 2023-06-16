import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill  } from 'react-icons/bs';
import { BiChevronDown  } from 'react-icons/bi';
import { EpisodeInterface } from '@/types';
import useInfoModalEpisodeStore from '@/hooks/useInfoModalEpisodeStore';
import { Card } from 'flowbite-react';

interface EpisodeCardProps {
    data: EpisodeInterface;
  }

const EpisodeCardd: React.FC<EpisodeCardProps> = ({ data }) => {
    const router = useRouter();
    const { openModal } = useInfoModalEpisodeStore();
    const redirectToWatch = useCallback(() => router.push(`/watchEpisode/${data.id}`), [router, data.id]);

    return (
        <Card
        horizontal
        imgSrc={data.thumbnailUrl}
      >
        <h5 className="text-green-400 font-semibold mt-4">
          <p>
          {data.title}
          </p>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <p>
          {data.description}
          </p>
          
        </p>
      </Card>
    );
}

export default EpisodeCardd;


