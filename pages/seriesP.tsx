import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import SeriesList from '@/components/SeriesList';
import useSeriesList from '@/hooks/useSeriesList';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';
import SeriesBillboard from '@/components/SeriesBillboard';

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
      <Navbar home={false}/>
      {/* <SeriesBillboard /> */}
      <div className='flex flex-col items-center'>
        <SeriesList title="Series" data={series} />
      </div>
    </>
  )
}
