import React, { useRef } from 'react';
import { ItemInterface, MovieInterface, ShowInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import SeriesList from './SeriesList';
import SeriesCard from './SeriesCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const MovieList: React.FC<ItemInterface> = ({ movies, shows, title }) => {
  const items = Array.from({ length: 5 }, (_, index) => index)
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
    <div className="flex justify-center flex-col z-40">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{title}</p>
      </div>
      <div className="relative flex mt-2 w-full overflow-scroll no-scrollbar transition duration-200" ref={scrollRef}>
        <div className='h-full sticky my-auto z-20 left-0 bg-black bg-opacity-30 '>
          <BsChevronLeft onClick={() => scroll('left')} className='h-full w-[50px] text-white hidden md:block'/>
        </div>
        {shows.length > 0 && items.map((item, i) => (
          <React.Fragment key={i}>
            {movies[i] && <MovieCard key={`movie-${movies[i].id}`} data={movies[i]} />}
            {shows[i] && <SeriesCard key={`series-${shows[i].id}`} data={shows[i]} />}
          </React.Fragment>
        ))}

        {shows.length === 0 && movies.map((movie: MovieInterface) => (
          <>
            <MovieCard key={movie.id} data={movie} />
          </>
        ))}

        {movies.length === 0 && shows.map((movie: ShowInterface) => (
          <>
            <SeriesCard key={movie.id} data={movie} />
          </>
        ))}
        <div className='h-full sticky my-auto z-20 right-0 bg-black bg-opacity-30 '>
          <BsChevronRight  onClick={() => scroll('right')} className='h-full w-[50px] text-white hidden md:block'/>
        </div>
      </div>
    </div>
  );
}
export default MovieList;