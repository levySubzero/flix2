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
import MovieListHome from '@/components/MovieListHome';

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

const Home = () => {
  const { data: favorites = [] } = useFavorites();
  const { data: categorys = [] } = useCatsHome();
  const { isOpen: modalOpen, closeModal: modalClose } = useInfoModalSeriesStore();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModalSeries visible={modalOpen} onClose={modalClose} />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar home={true} />
      <Billboard />
      <div className="flex flex-col gap-4 mx-4 my-[-55px] md:my-[-85px] lg:my-[-130px] xl:my-[-215px] z-40">
          {favorites.length > 0 && (<MovieList  title="My List" movies={favorites} shows={[]}/>)}
          {categorys.map((cat: CategoryInterface, i: any) => {
            return (
              <MovieListHome key={i} data={cat}/>
            )
            })}
      </div>
      
    </>
  )
}
export default Home;