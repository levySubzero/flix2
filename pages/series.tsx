import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieList from '@/components/MovieList';
import useSeriesList from '@/hooks/useSeriesList';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';

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

export default function Series() {
  const { data: series = [] } = useSeriesList();
  const { isOpen, closeModal } = useInfoModalSeriesStore();

  return (
    <>
      <InfoModalSeries visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className='pt-60 flex flex-col items-center'>
        <MovieList title="Series" data={series} />
      </div>
    </>
  )
}
