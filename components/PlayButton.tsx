import React from 'react';
// import { PlayIcon } from '@heroicons/react/24/solid';
import { BsFillPlayFill, BsPlayFill  } from 'react-icons/bs';

import { useRouter } from 'next/navigation';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        bg-black
        text-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
      >
        {/* <PlayIcon className="w-4 md:w-7 text-black mr-1" /> */}
        <BsPlayFill className="w-4 md:w-7 text-white mr-1" />
        Play
    </button>
  );
}

export default PlayButton;
