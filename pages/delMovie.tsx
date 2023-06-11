import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useDeleteModal from '@/hooks/useDeleteModal';
import DeleteModal from '@/components/DeleteModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

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
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  if (!currentUser?.isAdmin) {
    router.push('/');
  }


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
