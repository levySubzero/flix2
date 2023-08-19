import React, { useEffect, useState } from 'react';
// import { PlayIcon } from '@heroicons/react/24/solid';
import { MdOutlineDelete  } from 'react-icons/md';

import { useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';

interface PlayButtonProps {
  movieId: string;
  clicked: any;
  title: string;
}

const DelButton: React.FC<PlayButtonProps> = ({ movieId, clicked, title }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser?.isAdmin) { 
      setIsVisible(true)
    } else {
      // router.push('/');
    }

  }, [currentUser]);

  return (
    <button 
      onClick={clicked}
      className={`
        ${isVisible ? 'block' : 'hidden'} 
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
        `}
      >
        {/* <PlayIcon className="w-4 md:w-7 text-black mr-1" /> */}
        <MdOutlineDelete className="w-4 md:w-7 text-black mr-1" />
        {title}
    </button>
  );
}

export default DelButton;
