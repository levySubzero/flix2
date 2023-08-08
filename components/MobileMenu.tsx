import { useRouter } from 'next/navigation';
import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const router = useRouter();
  if (!visible) {
    return null;
  }


  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div onClick={() => router.push(`/`)} className="px-3 text-center text-white hover:underline">
          Home
        </div>
        <div onClick={() => router.push(`/seriesP`)} className="px-3 text-center text-white hover:underline">
          Series
        </div>
        <div onClick={() => router.push(`/films`)} className="px-3 text-center text-white hover:underline">
          Films
        </div>
        <div onClick={() => router.push(`/myList`)} className="px-3 text-center text-white hover:underline">
          My List
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;
