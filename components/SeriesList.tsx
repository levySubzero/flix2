import React from 'react';
import { SeriesInterface, ShowInterface } from '@/types';
import SeriesCard from '@/components/SeriesCard';

interface ShowListProps {
  data: ShowInterface[];
  title: string;
}

const SeriesList: React.FC<ShowListProps> = ({ data, title }) => {
   return (
    <div className="flex justify-center flex-col py-16">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="flex">
          {data.map((series) => (
            <SeriesCard key={series.id} data={series} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeriesList;
