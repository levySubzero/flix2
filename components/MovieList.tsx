import React from 'react';
import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';

interface MovieListProps {
  data: MovieInterface[];
  title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  return (
    <div className="flex justify-center flex-col py-16">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{title}</p>
      </div>
      <div className="flex flex-row max-w-max overflow-x-scroll no-scrollbar">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
