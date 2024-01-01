import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import SeriesList from '@/components/SeriesList';
import useShowList from '@/hooks/useShowList';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';
import SeriesBillboard from '@/components/SeriesBillboard';


export default function Series() {
  const { data: shows = [] } = useShowList();
  const { isOpen, closeModal } = useInfoModalSeriesStore();

  return (
    <>
      <InfoModalSeries visible={isOpen} onClose={closeModal} />
      <Navbar home={true}/>
      <SeriesBillboard />
      <div className="flex flex-col gap-4 mx-4 my-4">
        <SeriesList title="Series" data={shows} />
      </div>
    </>
  )
}
