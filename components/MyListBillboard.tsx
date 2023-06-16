import React, { useCallback } from 'react';
import useMyListBillboard from '@/hooks/useMyListBillboard';

const MyListBillboard: React.FC = () => {
  const { data } = useMyListBillboard();

  return (
    <div className="relative h-[46.25vw]">
      <img src={data?.thumbnailUrl} className="w-full brightness-[85%] object-cover h-full" />  
    </div>
  )
}
export default MyListBillboard;
