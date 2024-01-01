import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useParams, useRouter } from 'next/navigation';
import useEpisode from '@/hooks/useEpisode';
import AdModal from '@/components/AdModal';
import useAdModal from '@/hooks/useAdModal';
import { useRouter as RouterUse } from 'next/router';
import Head from 'next/head';

const Watch = () => {
  const router = useRouter();
  const route = RouterUse();
  const { episodeId } = route.query;
  const { isOpen, closeModal } = useAdModal();
  const { data } = useEpisode(episodeId as string);
  const { openModal } = useAdModal();
  const [adOver, setAdOver] = useState(false);
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    setTimeout(() => openModal(data?.id), 1500);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Add the event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function handleClose () {
    closeModal();
    setAdOver(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }
  
  return (
    <>
    <Head>
      <link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet"/>
      <script src="https://unpkg.com/video.js/dist/video.min.js"></script>
    </Head>
    <AdModal visible={isOpen} onClose={handleClose} />
    <div className="h-screen w-screen bg-black">
    <div style={{ display: isVisible ? 'block' : 'none',}}>
        <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
          <AiOutlineArrowLeft onClick={() => router.push('/')} className="text-white cursor-pointer" size={40} />
          <p className="text-white text-1xl md:text-3xl font-bold" >
            <span className="font-light">Watching:</span> {data?.title}
          </p>
        </nav>
      </div>
      {adOver && <div className="relative" style={{  height: '100vh', width: '100%', margin: 'auto' }}>
        
        <video
            id="my-player"
            className="video-js absolute top-0 w-full h-full my-auto"
            controls
            autoPlay
            preload="auto"
            poster={data?.thumbnailUrl}
            data-setup='{}'>
          <source src={data?.videoUrl} type="video/mp4"></source>
          <source src={data?.videoUrl} type="video/webm"></source>
          <source src={data?.videoUrl} type="video/ogg"></source>
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
        </video>
      </div>}
    </div>
    </>
  )
}

export default Watch;
