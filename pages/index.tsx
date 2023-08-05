import React, { useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import InfoModal from '@/components/InfoModal';
import SeriesList from '@/components/SeriesList';
import useShowList from '@/hooks/useShowList';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';
import useCategories from '@/hooks/useCategories';
import { Category } from '@prisma/client';
import { CategoryInterface, MovieInterface, SeriesInterface, ShowInterface } from '@/types';
import axios from 'axios';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }



  return {
    props: {}
  }
}

export default function Home() {
  const { data: favorites = [] } = useFavorites();
  const { data: categories = [] } = useCategories();
  const { data: shows = [] } = useShowList();
  const [series, setSeries] = useState<ShowInterface[]>([]);
  const [movie, setMovies] = useState<MovieInterface[]>([]);
  const { isOpen: modalOpen, closeModal: modalClose } = useInfoModalSeriesStore();
  const { isOpen, closeModal } = useInfoModalStore();

  const getMovies = (catId: string) => {
    axios.get(`/api/movies/category/${catId}`)
      .then((response) => console.log('m', response.data))
      .catch((error) => console.error('Error fetching data:', error))
    return '';
  }

  const getSeries = (catId: string) => {
    axios.get(`/api/show/category${catId}`)
      .then((response) => console.log('s', response.data))
      .catch((error) => console.error('Error fetching data:', error))
    return '';
  }

  return (
    <>
      <InfoModalSeries visible={modalOpen} onClose={modalClose} />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar home={true} />
      <Billboard />
      <div className="pb-4 z-30 xl:absolute xl:top-[60%]">
        <div className='mx-3'>
          <MovieList  title="My List" data={favorites} />
        </div>
          {categories.map((cat: CategoryInterface) => (
            cat.home ? (
              <div key={cat.id}>
              { getMovies(cat.id) }
              <MovieList title={`${cat.name}`} data={movie} />
              { getSeries(cat.id) }
              <SeriesList title={`${cat.name} Shows`} data={series} />
              </div>
            ) : null
          ))}

          {/* <MovieList title="Trending Now" data={movies} />
        
          <SeriesList title="Series" data={shows} />
        
          <MovieList title="My List" data={favorites} /> */}
        
      </div>
      
    </>
  )
}
