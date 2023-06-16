import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import useEpisodeList from '@/hooks/useEpisodeList';
import useInfoModalSeriesStore from '@/hooks/useInfoModalSeriesStore';
import InfoModalSeries from '@/components/InfoModalSeries';
import { useRouter } from 'next/router';
import EpisodeList from '@/components/EpisodeList';

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
  const router = useRouter();
  const { seriesId } = router.query;
  const { data: episodes = [] } = useEpisodeList(seriesId as string);
  const { isOpen, closeModal } = useInfoModalSeriesStore();

  return (
    <>
      <InfoModalSeries visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className='pt-60 flex flex-col items-center'>
        <EpisodeList title="Episodes" data={episodes} />
      </div>
    </>
  )
}
