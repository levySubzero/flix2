import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';
import { useRouter } from 'next/navigation';
import MovieListSearch from '@/components/MovieListSearch';
import axios from 'axios';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  return {
    props: {}
  }
}

interface RInteface {
  selected: string;
  onSelect: any
}

const RadioButton: React.FC<RInteface> = ({ selected, onSelect }) => {


  return (
    <div className='flex gap-5 mb-3'>
      <div className='flex align-center gap-2 justify-center' >
        <input
          type="radio"
          value="movie"
          checked={selected === "movie"}
          onChange={(e) => onSelect(e.target.value)}
          className="h-6 w-6"
        />
        <p className='text-white mt-[-3px] text-lg'>Movies</p>
      </div>
      <div className='flex  gap-2 justify-center' >
      <input
          type="radio"
          value="series"
          checked={selected === "series"}
          onChange={(e) => onSelect(e.target.value)}
          className="h-6 w-6"
        />
        <p className='text-white mt-[-3px] text-lg'>Series</p>
      </div>
    </div>
  );
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("movie");
  
  const router = useRouter();

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    console.log(query);
    // Perform a search API request
    if (query.length > 0) {
      if (selectedOption === 'movie') {
        const response = await axios.get(`/api/search/${query}`);
        setSearchResults(response.data.results);
      } else {
        const response = await axios.get(`/api/searchSeries/${query}`);
        console.log(response.data.results);
        setSearchResults(response.data.results);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Navbar home={false} />
      <div className='pt-40 flex flex-col items-center'>
        <RadioButton selected={selectedOption} onSelect={handleOptionChange}/>
        <p className='text-white'>{selectedOption}</p>
        <Search onChange={handleSearch} value={searchQuery} />
        <div className='pt-3 flex flex-col items-center'>
            {selectedOption === 'movie' && <MovieListSearch title="Search Results" data2={[]} type={selectedOption} data={searchResults} />}
            {selectedOption === 'series' && <MovieListSearch title="Search Results" data2={searchResults} type={selectedOption} data={[]} />}
        </div>
      </div>
    </>
  )
}
