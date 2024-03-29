import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import InfoModal from '@/components/InfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);  

  return {
    props: {}
  }
}

export default function Episodes() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar home={false} />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" movies={movies} shows={[]}/>
        <MovieList title="My List" movies={favorites} shows={[]}/>
      </div>
    </>
  )
}
