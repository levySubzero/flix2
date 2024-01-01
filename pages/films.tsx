import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import InfoModal from '@/components/InfoModal';
import Billboard from '@/components/Billboard';

export default function Films() {
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar home={true} />
      <Billboard />
      <div className="flex flex-col gap-4 mx-4 my-4">
        <MovieList title="Films" movies={movies} shows={[]}/>
      </div>
    </>
  )
}
