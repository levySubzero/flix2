import { SeriesInterface } from '@/types';

interface SeriesProps {
    data: SeriesInterface;
}

interface DropdownProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  series?: SeriesProps[];
}

const Dropdown: React.FC<DropdownProps> = ({ id, onChange, value, label, series }) => {

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
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer"
      >
        <option value="">Series</option>
        {series?.map((seriesProp?) => (
          <option key={seriesProp?.data.id} value={seriesProp?.data.id}>
            {seriesProp?.data.title}
          </option>
        ))}
      </select>

    </div>
  )
}

export default Dropdown;