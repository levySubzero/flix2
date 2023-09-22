import React, { useState } from 'react';
import { GetServerSideProps, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Footer from '@/components/Footer';
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
      <div className="flex flex-col gap-4 mx-4 my-[-55px] md:my-[-85px] lg:my-[-130px] xl:my-[-235px] 2xl:my-[-265px] z-30">
        <div className="absolute inset-x-0 top-0 h-5 bg-gray-800 filter blur-lg"></div>
          {favorites.length > 0 && (<MovieList  title="My List" movies={favorites} shows={[]}/>)}
          {categorys.map((cat: CategoryInterface, i: any) => {
            return (
              <MovieListHome key={i} data={cat}/>
            )
            })}
          <Footer />
      </div>
    </>
  )
}
export default Home;

<footer className="footer-1 py-8 sm:py-12">

<div className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t">
    <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full mx-auto w-20 md:h-[150px] md:w-[150px]" alt="Logo" />
</div>
<div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
                <h6 className="font-bold text-white mb-2">Address</h6>
                <address className="not-italic  text-white mb-4 text-sm">
                123 6th St.<br/>
                Melbourne, FL 32904
                </address>
            </div>
</footer>