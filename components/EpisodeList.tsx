import React from 'react';

import { EpisodeInterface } from '@/types';
import EpisodeCard from '@/components/EpisodeCard';
import { isEmpty } from 'lodash';

interface EpisodeListProps {
  data: EpisodeInterface[];
  title: string;
}
const EpisodeList: React.FC<EpisodeListProps> = ({ data, title }) => {
  return (
    <div className="w-full md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="relative w-full mb-8">
          {data.map((episode) => (
            <EpisodeCard key={episode.id} data={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EpisodeList;
