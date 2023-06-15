import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import useSeriesList from '@/hooks/useSeriesList';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';
import SeriesManagerList from '@/components/SeriesManagerList';

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

export default function SeriesManager() {
  const { data: series = [] } = useSeriesList();
  const { isOpen, closeModal } = useInfoModalSeriesStore();

  return (
    <>
      <InfoModalSeries visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className='pt-60 flex flex-col items-center'>
        <SeriesManagerList title="Tap Series to Add or Remove Episodes" data={series} />
      </div>
    </>
  )
}
