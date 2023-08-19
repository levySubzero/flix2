import React from 'react';
import { BiArrowBack  } from 'react-icons/bi';

const BackButton: React.FC = () => {
  const navigateBack = () => {
    window.history.back();
  };

  return (
    <button 
      onClick={navigateBack}
      className={`
        absolute
        top-2
        left-2
        bg-gray-300  
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
        <BiArrowBack className="w-4 md:w-7 text-black mr-1" />
    </button>
  );
}

export default BackButton;
