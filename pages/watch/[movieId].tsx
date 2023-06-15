import React from 'react';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import useAdModal from '@/hooks/useAdModal';
import AdModal from '@/components/AdModal';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  const { isOpen, closeModal } = useAdModal();
  const { openModal } = useAdModal();
  setTimeout(() => openModal(data?.id), 2000);
  
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
