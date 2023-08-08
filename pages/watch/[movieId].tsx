import React, { useEffect, useState } from 'react';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useRouter as RouterUse } from 'next/router';
import useMovie from '@/hooks/useMovie';
import useAdModal from '@/hooks/useAdModal';
import AdModal from '@/components/AdModal';

const Watch = () => {
  const route = RouterUse();
  const router = useRouter();
  const { movieId } = route.query;
  const { data } = useMovie(movieId as string);
  const { isOpen, closeModal } = useAdModal();
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
