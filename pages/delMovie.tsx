import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieListDel from '@/components/MovieListDel';
import useMovieList from '@/hooks/useMovieList';
import useDeleteModal from '@/hooks/useDeleteModal';
import DeleteModal from '@/components/DeleteModal';
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

export default function DeleteMovie() {
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useDeleteModal();
  
  return (
    <>
      <DeleteModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className='pt-60 flex flex-col items-center'>
          <MovieListDel title="Select Movies to Delete" data={movies} />
      </div>
    </>
  )
}
