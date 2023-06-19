import React from 'react';

import { SeriesInterface } from '@/types';
import SeriesCard from '@/components/SeriesCard';
import { isEmpty } from 'lodash';

interface SeriesListProps {
  data: SeriesInterface[];
  title: string;
}

const SeriesList: React.FC<SeriesListProps> = ({ data, title }) => {
   return (
    <div className="px-4 my-6 md:px-12 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((series) => (
            <SeriesCard key={series.id} data={series} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeriesList;
