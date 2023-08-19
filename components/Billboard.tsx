import React, { useCallback, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { VscUnmute, VscMute  } from "react-icons/vsc";
import PlayButton from '@/components/PlayButton';
import useBillboard from '@/hooks/useBillboard';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface Muter {
  mute: boolean;
  toggler: any;
}

const Mute: React.FC<Muter> = ({mute, toggler}) => {

  return (
    <div className="flex flex-row w-[96vw] sm:w-[99vw] md:w-[95vw] xl:w-[96vw] p-0">
      <div className="flex flex-row w-2/5 md:w-1/4 lg:w-1/5 h-[40px] md:h-[50px] ml-auto gap-4 items-center justify-start">
        <div onClick={toggler} className="flex flex-row border-2 border-zinc-600 rounded-full bg-black bg-opacity-5 p-1 items-center justify-center">
          {mute ? <VscMute className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] text-white" /> : <VscUnmute className="w-[25px] h-[25px] md:w-40 md:h-50 text-white" />}
        </div>
        <div className="flex justify-start align-center border-l border-l-2 h-full w-full border-zinc-500 bg-zinc-800 ml-0">
          <p className="text-gray-400 my-auto ml-2 text-[18px]">15</p>
        </div>
      </div>
    </div>
  )}

const Billboard: React.FC = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModalStore();
  const [mute, setMute] = useState(true);

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  const toggleMute = useCallback(() => {
    setMute(!mute);
  }, [mute]);

  return (
    <div className="relative flex h-[56.25vw] w-full">
      <video poster={data?.thumbnailUrl} className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
       autoPlay 
       loop 
       src={data?.videoUrl}
       muted={mute ? true : false}></video>
      <div className="absolute top-[30%] md:top-[40%] lg:top-[30%] ml-4 md:ml-16">
        <p className="text-white whitespace-nowrap text-1xl sm:text-3xl md:text-7xl h-full w-[50%] lg:text-9xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[10px] truncate w-16 md:whitespace-normal md:text-lg mt-3 md:mt-8 md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
              bg-gray-300
              text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
            >
              <AiOutlineInfoCircle className="w-4 md:w-7 mr-1" />
              More Info
          </button>
        </div>
      <Mute mute={mute} toggler={toggleMute} />
      </div>
      {/* <div onClick={toggleMute} className="absolute top-[70%] left-[60%] md:top-[70%] sm:left-[70%] md:left-[85%] ml-4 md:ml-16">
        <div className="flex flex-row bg-black bg-opacity-5 items-center mt-3 md:mt-4 gap-3">
          {mute ? <VscMute className="w-40 h-50 text-white text-3xl md:w-7 mr-1" /> : <VscUnmute className="w-40 h-50 text-white text-3xl md:w-7 mr-1" />}
        </div>
      </div> */}
    </div>
  )
}
export default Billboard;
