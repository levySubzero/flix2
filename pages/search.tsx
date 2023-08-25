import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import MovieListDel from '@/components/MovieListDel';
import useMovieList from '@/hooks/useMovieList';
import useDeleteModal from '@/hooks/useDeleteModal';
import DeleteModal from '@/components/DeleteModal';
import axios from 'axios';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    console.log(query);
    // Perform a search API request
    if (query.length > 0) {
      const response = await axios.get(`/api/search/${query}`);
      console.log(response);
      setSearchResults(response.data.results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Navbar home={false} />
      <div className='mt-60 ml-60 flex flex-col items-center'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className='pt-60 flex flex-col items-center'>
          <MovieListDel title="Search Results" data={searchResults} />
      </div>
    </>
  )
}
