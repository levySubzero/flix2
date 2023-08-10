import React, { useEffect, useRef, useState } from 'react';
import { CategoryInterface, ItemInterface, MovieInterface, ShowInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import SeriesList from './SeriesList';
import SeriesCard from './SeriesCard';
import axios from 'axios';
import useSeries from '@/hooks/useFindSeries';
import useMovies from '@/hooks/useMovies';
import useShows from '@/hooks/useShows';
import { BsArrowLeftShort, BsArrowRightShort, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface MVInteface {
  data: CategoryInterface
}

const MovieList: React.FC<MVInteface> = ({ data }) => {
  const { data: movies = [] } = useMovies(data.id);
  const { data: series = [] } = useShows(data.id);
  const items = Array.from({ length: 5 }, (_, index) => index)
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: string) => {
    console.log("TESTING")
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
    <div className="flex justify-center flex-col">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{data.name}</p>
      </div>
      <div className="relative flex mt-2 overflow-scroll no-scrollbar transition duration-200 hover:h-[280px]" ref={scrollRef}>
        <div className='h-full sticky my-auto z-20 left-0 bg-black bg-opacity-30 '>
          <BsChevronLeft onClick={() => scroll('left')} className='h-full w-[50px] text-white'/>
        </div>
        {series.length > 0 && items.map((item, i) => (
          <React.Fragment key={i}>
            {movies[i] && <MovieCard key={`movie-${movies[i].id}`} data={movies[i]} />}
            {series[i] && <SeriesCard key={`series-${series[i].id}`} data={series[i]} />}
          </React.Fragment>
        ))}

        {series.length === 0 && movies.map((movie: MovieInterface) => (
          <>
            <MovieCard key={movie.id} data={movie} />
          </>
        ))}
        <div className='h-full sticky my-auto z-20 right-0 bg-black bg-opacity-30 '>
          <BsChevronRight  onClick={() => scroll('right')} className='h-full w-[50px] text-white'/>
        </div>
      </div>
    </div>
  );
}

export default MovieList;