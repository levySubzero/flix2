import React, { useCallback } from 'react';
import useSeriesBillboard from '@/hooks/useSeriesBillboard';
import { SeriesInterface } from '@/types';
import useEpisodeList from '@/hooks/useEpisodeList';
import useSeries from '@/hooks/useSeries';

interface SeriesCardProps {
    id: string
  }

const SeriesEpBillboard: React.FC<SeriesCardProps> = ({ id }) => {
  const { data } = useSeries(id);
  console.log(data)

  return (
    <div className="relative h-[46.25vw]">
      <img src={data?.thumbnailUrl} className="w-full brightness-[85%] object-cover h-full" />  
    </div>
  )
}
export default SeriesEpBillboard
