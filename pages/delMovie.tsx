import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieListDel from '@/components/MovieListDel';
import useMovieList from '@/hooks/useMovieList';
import useDeleteModal from '@/hooks/useDeleteModal';
import DeleteModal from '@/components/DeleteModal';
import axios from 'axios';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
      // router.push('/');
    }
  }, [currentUser]); 

  
  return (
    <>
      <DeleteModal visible={isOpen} onClose={closeModal} />
      <Navbar home={false} />
      <div className='pt-60 flex flex-col items-center'>
          <MovieListDel title="Select Movies to Delete" data={movies} />
      </div>
    </>
  )
}
