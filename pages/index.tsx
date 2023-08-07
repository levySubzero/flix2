import React, { useState } from 'react';
import { GetServerSideProps, NextPageContext } from 'next';
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
import { CategoryInterface, ItemInterface, MovieInterface, PropInterface, SeriesInterface, ShowInterface } from '@/types';
import axios from 'axios';
import prismadb from '@/lib/prismadb';
import useCatsHome from '@/hooks/useCatsHome';

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

  // const categorys: CategoryInterface[] = await prismadb.category.findMany({
  //   where: {
  //       home: true
  //   }
  // }); 

  // const categories: ItemInterface[] = [];

  // categorys.map(async (category) => {
  //   const moviesQuery = await prismadb.movie.findMany({
  //     where: {
  //         categoryId: category.id
  //     },
  //     take: 5,
  //   });
  
  //   const showsQuery = await prismadb.show.findMany({
  //     where: {
  //         categoryId: category.id
  //     },
  //     take: 5,
  //   });

  //   const [movies, shows] = await Promise.all([moviesQuery, showsQuery]);
  //   categories.push({'title' : `${category.name}`, movies, shows})
  // });
  // console.log(categories);
  return {
    props: {}
  }
}

const Home = () => {
  const { data: favorites = [] } = useFavorites();
  const { data: shows = [] } = useShowList();
  const { data: categorys = [] } = useCatsHome();
  const [series, setSeries] = useState<ShowInterface[]>([]);
  const [movie, setMovies] = useState<MovieInterface[]>([]);
  const { isOpen: modalOpen, closeModal: modalClose } = useInfoModalSeriesStore();
  const { isOpen, closeModal } = useInfoModalStore();

  const getMovies = async (catId: string) => {
    try {
        const response = await axios.get(`/api/movies/category/${catId}`);
        setMovies(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  const getSeries = async (catId: string) => {
    try {
        const response = await axios.get(`/api/show/category/${catId}`);
        setSeries(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <InfoModalSeries visible={modalOpen} onClose={modalClose} />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar home={true} />
      <Billboard />
      <div className="pb-4 z-30 xl:absolute xl:top-[60%]">
        <div className='mx-3'>
          <MovieList  title="My List" movies={favorites} shows={[]}/>
        </div>
          {categorys.map((cat: CategoryInterface, i: any) => {
            getMovies(cat.id as string);
            getSeries(cat.id as string);
            console.log(cat)
            return (
              <MovieList key={i} title={`${cat.name}`} movies={movie} shows={series}/>

            )
            })}

          {/* <MovieList title="Trending Now" data={movies} />
        
          <SeriesList title="Series" data={shows} />
        
          <MovieList title="My List" data={favorites} /> */}
        
      </div>
      
    </>
  )
}
export default Home;