import React from 'react';

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {

  return (
    <div className="relative pt-2 md:px-12 mt-4 bg-black bg-opacity-10 space-y-8">
      <div>
        <div className=''>
          <p className="relative text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
