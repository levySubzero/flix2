import React, { useEffect, useState } from 'react';
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
  const [adOver, setAdOver] = useState(false);


  useEffect(() => {
    setTimeout(() => openModal(data?.id), 1500);
  }, []);

  function handleClose () {
    closeModal();
    setAdOver(true);
  }
  
  return (
    <>
    <AdModal visible={isOpen} onClose={handleClose} />
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={40} />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      {adOver && <div className="relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={data?.videoUrl}
          loading="lazy"
          className="absolute top-0 h-full w-full"
          style={{ border: 'none' }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>}
    </div>
    </>
  )
}

export default Watch;
