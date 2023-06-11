import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useDeleteModal from '@/hooks/useDeleteModal';
import DeleteModal from '@/components/DeleteModal';
import useCurrentUser from '@/hooks/useCurrentUser';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const { data: currentUser } = useCurrentUser();
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  if (!currentUser?.isAdmin) {
    return  {
      redirect: {
        destination: '/',
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
      <div>
        <p className="text-red-400 font-semibold mt-4">
            Tap on Movie to Delete
        </p>
      </div>
      <div className="pb-40">
        <MovieList title="Movies" data={movies} />
      </div>
    </>
  )
}
