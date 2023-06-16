import React, { useEffect } from 'react';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useEpisode from '@/hooks/useEpisode';
import AdModal from '@/components/AdModal';
import useAdModal from '@/hooks/useAdModal';

const Watch = () => {
  const router = useRouter();
  const { episodeId } = router.query;
  const { isOpen, closeModal } = useAdModal();
  const { data } = useEpisode(episodeId as string);
  const { openModal } = useAdModal();
  
  useEffect(() => {
    setTimeout(() => openModal(data?.id), 2000);
  }, []);
  
  return (
    <>
    <AdModal visible={isOpen} onClose={closeModal} />
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        {/* <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" /> */}
        <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={40} />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
    </div>
    </>
  )
}

export default Watch;
