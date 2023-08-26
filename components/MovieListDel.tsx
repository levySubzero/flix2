import React, { useRef } from 'react';

import { MovieInterface, SeriesInterface, ShowInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';
import SeriesCard from './SeriesCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface MovieListProps {
  data: MovieInterface[];
  data2: ShowInterface[];
  title: string;
  type: string;
}

const MovieListDel: React.FC<MovieListProps> = ({ data, data2, title, type }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === 'left') {
        current.scrollLeft -= 300;
      } else {
        current.scrollLeft += 300;
      }
    }
  };

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="relative flex mt-2 min-w-full overflow-scroll no-scrollbar transition duration-200" ref={scrollRef}>
            {type === 'movie' && data.map((movie: MovieInterface) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
            {type === 'series' && data2.map((movie: ShowInterface) => (
              <SeriesCard key={movie.id} data={movie} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieListDel;
