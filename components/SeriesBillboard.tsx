import React, { useCallback } from 'react';
import useSeriesBillboard from '@/hooks/useSeriesBillboard';

const SeriesBillboard: React.FC = () => {
  const { data } = useSeriesBillboard();

  return (
    <div className="relative h-[46.25vw]">
      <img src={data?.thumbnailUrl} className="w-full brightness-[85%] object-cover h-full" />  
    </div>
  )
}
export default SeriesBillboard;