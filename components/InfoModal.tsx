 import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovie from '@/hooks/useMovie';
import ModalList from '@/components/ModalList';
import useMovieList from '@/hooks/useMovieList';
import ModalCard from './ModalCard';
import EditButton from './EditButton';
import { useRouter } from 'next/navigation';
import useMovies from '@/hooks/useMovies';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);
  const { data: movies = [] } = useMovies(data.categoryId);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  if (!visible) {
    return null;
  }

  const edit = (id: string) => {
    router.push(`/addMovie/${movieId}`)
  }

  return (
    <div onClick={handleClose} className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-screen mx-auto my-auto max-w-5xl rounded-md overflow-hidden">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

          <div className="relative md:h-96">
            <video poster={data?.thumbnailUrl} autoPlay muted loop src={data?.trailerUrl} className="w-full hidden md:block brightness-[60%] object-cover h-full" />
            <div className='flex flex-col align-center md:hidden h-[496px] justify-center'>
            <img onClick={() => router.push(`/watch/${movieId}`)} src={data.thumbnailUrl} alt="Series" draggable={false} className="
              cursor-pointer
              object-cover
              transition
              duration
              shadow-xl
              group-hover:opacity-90
              sm:group-hover:opacity-0
              delay-300
              w-1/2
              h-full
              mt-2
              object-fill
              mx-auto
            " />
            <div className="flex flex-col ml-4 mt-4 md:hidden">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-white">
                  {data?.year}
                </p>
                <p className="text-white">
                  {data?.duration}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-white">
                  {data?.description}
                </p>
              </div>
              <div className="flex flex-row my-4 justify-between px-8">
                
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
                <EditButton movieId={data?.id} clicked={edit} title={'Edit Movie'}/>
              </div>
            </div>
            </div>
            
            <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <AiOutlineClose className="text-white w-6" />
            </div>
            <div className="absolute hidden md:block bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
                <EditButton movieId={data?.id} clicked={edit} title={'Edit Movie'}/>
              </div>
            </div>
          </div>
          <div className="px-12 py-8 hidden md:block">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
              <div className="col-span-1 ">
                <div className="flex flex-col items-start gap-2 mb-8">
                  <div className="flex flex-row text-left gap-2 mb-8">
                    <p className="text-green-400 font-semibold text-lg">
                      {data?.year}
                    </p>
                    <p className="text-white">
                      {data?.duration}
                    </p>
                  </div>
                  <p className="text-white mt-[-20px]">
                    {data?.genre}
                  </p>
                  <div className="">
                    <p className="text-white">
                      {data?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-0 md:col-span-1 md:mt-20">
                <div className="flex flex-col md:ml-20 flex items-start justify-end gap-2 mb-8">
                  <p className="text-white">
                    <span className="text-gray-400">Cast:  </span>{data?.cast}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Genres:  </span>{data?.subGenres}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">The film is:  </span>{data?.shortDesc}
                  </p>
                </div>    
              </div>
            </div>
          </div>
          <div className="pb-4 z-30  hidden md:block">
            <ModalList title="More Like this" data={movies} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
