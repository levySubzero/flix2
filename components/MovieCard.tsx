import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BsFillPlayFill  } from 'react-icons/bs';
import { BiChevronDown  } from 'react-icons/bi';
import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);  

  return (
    <div className="group relative
                    bg-zinc-900 
                    mx-1 relative 
                    w-[10px] 
                    min-w-[140px] 
                    md:min-w-[250px] 
                    h-[180px] md:h-[180px] 
                    my-auto mr-1 
                    flex justify-center 
                    items-center rounded-lg overflow-hidden md:rounded-none">
      <img onClick={() => openModal(data.id)} src={data.thumbnailUrl} alt="Movie" draggable={false} className="
        flex 
        absolute
        justify-center
        align-center
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        group-hover:hidden
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-full
        object-contain
      " />
        {/* <img onClick={redirectToWatch} src={data.thumbnailUrl} alt="Movie" draggable={false} className=" */}
        <video poster={data?.thumbnailUrl} className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500
          cursor-pointer
          absolute
          object-cover
          transition
          hidden
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-full
          object-fill
          group-hover:block"
          autoPlay muted loop src={data?.videoUrl}></video>
        <div  onClick={() => openModal(data.id)} className="
          z-10
          bg-transparent
          p-2
          lg:p-4
          absolute
          hidden
          w-full
          transition
          shadow-md
          group-hover:block
          rounded-b-md
          ">
          <div className="flex flex-row items-center gap-3">
            <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              {/* <PlayIcon className="text-black w-4 lg:w-6" /> */}
              <BsFillPlayFill className="text-black w-4 lg:w-6" />
            </div>
            {/* <FavoriteButton movieId={data?.id} /> */}
            <div onClick={() => openModal(data.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BiChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            {data.title} <span className="text-white">{data.year}</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center"> 
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
        </div>
      </div>
  )
}

export default MovieCard;
