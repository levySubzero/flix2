import React from 'react';
import { ItemInterface, MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import SeriesList from './SeriesList';
import SeriesCard from './SeriesCard';

const MovieList: React.FC<ItemInterface> = ({ movies, shows, title }) => {
  const items = Array.from({ length: 5 }, (_, index) => index)
  return (
    <div className="flex justify-center flex-col ">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{title}</p>
      </div>
      <div className="flex mt-2 overflow-hidden">
      {shows.length > 0 && items.map((item, i) => (
        <React.Fragment key={i}>
          {movies[i] && <MovieCard key={`movie-${movies[i].id}`} data={movies[i]} />}
          {shows[i] && <SeriesCard key={`series-${shows[i].id}`} data={shows[i]} />}
        </React.Fragment>
      ))}

        {shows.length === 0 && movies.map((movie) => (
          <>
            <MovieCard key={movie.id} data={movie} />
          </>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
