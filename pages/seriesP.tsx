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
      <Navbar home={true}/>
      <SeriesBillboard />
      <div className="pb-40 absolute xl:top-[70%] lg:top-[60%] md:top-[50%] sm:top-[40%] z-30">
        <SeriesList title="Series" data={series} />
      </div>
    </>
  )
}
