import React from 'react';

import { EpisodeInterface } from '@/types';
import EpisodeCard from '@/components/EpisodeCard';
import { isEmpty } from 'lodash';

interface EpisodeListProps {
  data: EpisodeInterface[];
  title: string;
}
const EpisodeList: React.FC<EpisodeListProps> = ({ data, title }) => {
//   if (isEmpty(data)) {
//     return null;
//   }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((episode) => (
            <EpisodeCard key={episode.id} data={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EpisodeList;
