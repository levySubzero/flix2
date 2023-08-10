import React, { useRef } from 'react';
import { SeriesInterface, ShowInterface } from '@/types';
import SeriesCard from '@/components/SeriesCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface ShowListProps {
  data: ShowInterface[];
  title: string;
}

const SeriesList: React.FC<ShowListProps> = ({ data, title }) => {
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
    <div className="flex justify-center flex-col">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{title}</p>
      </div>
      <div className="relative flex mt-2 overflow-scroll no-scrollbar transition duration-200 md:hover:h-[280px]" ref={scrollRef}>
        <div className='h-full sticky my-auto z-20 left-0 bg-black bg-opacity-30 '>
          <BsChevronLeft onClick={() => scroll('left')} className='h-full w-[50px] text-white hidden md:block'/>
        </div>
        {data.map((movie: ShowInterface) => (
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

export default SeriesList;
