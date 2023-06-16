import React, { useCallback } from 'react';
import useFilmsBillboard from '@/hooks/useFilmsBillboard';

const FilmsBillboard: React.FC = () => {
  const { data } = useFilmsBillboard();

  return (
    <div className="relative h-[46.25vw]">
      <img src={data?.thumbnailUrl} className="w-full brightness-[85%] object-cover h-full" />  
    </div>
  )
}
export default FilmsBillboard;
