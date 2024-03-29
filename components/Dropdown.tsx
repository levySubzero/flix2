import { SeriesInterface } from '@/types';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';


interface DropdownProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  series: SeriesInterface[];
}

const Dropdown: React.FC<DropdownProps> = ({ id, onChange, value, label, series }) => {
  const [options, setOptions] = useState<SeriesInterface[]>([]);

  useEffect(() => {
    setOptions(series);
  }, [series]);

  return (
    <div className="relative">
    <label 
      className="
        absolute 
        text-md
        text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
      htmlFor={id}>
      {label}
    </label>
      <select
        onChange={onChange}
        value={value}
        id={id}
        className="
          border-2 
          border-white
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-3/4
          text-md
          text-white
          bg-black
          appearance-none
          focus:outline-none
          focus:ring-0
          peer"
      >
        <option key={0} value={0} >Select Season</option>
        {options?.map((seriesProp?) => (
          <option key={seriesProp?.id} value={seriesProp?.id}>
            {seriesProp?.title}
          </option>
        ))}
      </select>

    </div>
  )
}

export default Dropdown;