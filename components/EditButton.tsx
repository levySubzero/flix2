import React from 'react';
// import { PlayIcon } from '@heroicons/react/24/solid';
import { BsPencilFill  } from 'react-icons/bs';

import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
  clicked: any;
  title: string;
}

const EditButton: React.FC<PlayButtonProps> = ({ movieId, clicked, title }) => {
  const router = useRouter();

  return (
    <button 
      onClick={clicked}
      className="
        bg-white 
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
        <BsPencilFill className="w-4 md:w-7 text-black mr-1" />
        {title}
    </button>
  );
}

export default EditButton;
