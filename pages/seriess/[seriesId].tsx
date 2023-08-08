import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import useEpisodeList from '@/hooks/useEpisodeList';
import { useParams, useRouter } from 'next/navigation';
import EpisodeList from '@/components/EpisodeList';
import InfoModalEpisode from '@/components/InfoModalEpisode';
import useInfoModalEpisodeStore from '@/hooks/useInfoModalEpisodeStore';
import SeriesEpBillboard from '@/components/SeriesEpBillboard';

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
  const { seriesId } = useParams();
  const { data: episodes = [] } = useEpisodeList(seriesId as string);
  const { isOpen, closeModal } = useInfoModalEpisodeStore();
  return (
    <>
      <InfoModalEpisode visible={isOpen} onClose={closeModal} />
      <Navbar home={false} />
      {/* <SeriesEpBillboard id={seriesId as string}/> */}
      <div className='flex flex-col items-center'>
        <EpisodeList title="Episodes" data={episodes} />
      </div>
    </>
  )
}
