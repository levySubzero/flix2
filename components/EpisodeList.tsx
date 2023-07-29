import React from 'react';
import { EpisodeInterface } from '@/types';
import EpisodeCard from '@/components/EpisodeCard';

interface EpisodeListProps {
  data: EpisodeInterface[];
  title: string;
}
const EpisodeList: React.FC<EpisodeListProps> = ({ data, title }) => {
  return (
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="">
          {data.map((episode) => (
            <EpisodeCard key={episode.id} data={episode} />
          ))}
        </div>
      </div>
  );
}

export default EpisodeList;
