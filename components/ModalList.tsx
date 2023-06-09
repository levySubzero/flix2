import React from 'react';
import { MovieInterface } from '@/types';
import ModalCard from '@/components/ModalCard';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}
const ModalList: React.FC<MovieListProps> = ({ data, title }) => {
  return (
    <div className="px-4 my-6 md:px-12 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{title}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5">
          {data.map((movie) => (
            <ModalCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalList;
