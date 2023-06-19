import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import Input from "../components/input";
import serverAuth from '@/lib/serverAuth';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

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

const AddSeries = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [subGenres, setSubGenres] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [cast, setCast] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const { data: currentUser } = useCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
      // router.push('/');
    }

  }, [currentUser]); 

  const saveSeries = useCallback(async () => {
    try {
      await axios.post('/api/newSeries', {
        title,
        description,
        thumbnailUrl,
        genre,
        year,
        subGenres,
        trailerUrl,
        cast,
        shortDesc
      });
      router.push('/seriesP');
    } catch (error) {
        console.log(error);
    }
  }, [title, description, thumbnailUrl, genre, year, subGenres, trailerUrl, cast, shortDesc]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>{!isAdmin && <p className='mt-80 text-green'>ADMIN ONLY</p>}</div>
    
    {isAdmin && 
      <div className="bg-black w-full h-full lg:bg-opacity-50">
         <nav className="px-12 py-5 h-28">
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-28" alt="Logo" />
        </nav>
        <div className="flex justify-center mx-4">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Add New Series
            </h2>
            <div className="space-y-2 flex items-center md:grid grid-cols-2 gap-2">
              <Input 
                id="title"
                type="title"
                label="Title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}  
              />
              <Input
                type="description" 
                id="description" 
                label="Series Description" 
                value={description}
                onChange={(e: any) => setDescription(e.target.value)} 
              />
              <Input
                type="thumbnailUrl" 
                id="Enter Thumbnail Url/link" 
                label="thumbnailUrl" 
                value={thumbnailUrl}
                onChange={(e: any) => setThumbnailUrl(e.target.value)} 
              />
              <Input 
                id="genre"
                type="genre"
                label="Series genre"
                value={genre}
                onChange={(e: any) => setGenre(e.target.value)}  
              />
              <Input
                type="year" 
                id="year" 
                label="Year" 
                value={year}
                onChange={(e: any) => setYear(e.target.value)} 
              />
              <Input
                type="subGenres" 
                id="subGenres" 
                label="subGenres" 
                value={subGenres}
                onChange={(e: any) => setSubGenres(e.target.value)} 
              />
              <Input
                type="trailerUrl" 
                id="trailerUrl" 
                label="trailerUrl" 
                value={trailerUrl}
                onChange={(e: any) => setTrailerUrl(e.target.value)} 
              />
              <Input
                type="cast" 
                id="cast" 
                label="cast" 
                value={cast}
                onChange={(e: any) => setCast(e.target.value)} 
              />
              <Input
                type="shortDesc" 
                id="shortDesc" 
                label="shortDesc" 
                value={shortDesc}
                onChange={(e: any) => setShortDesc(e.target.value)} 
              />
            <button onClick={saveSeries} className="bg-green-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Save
            </button>
            </div>
          </div>    
        </div>
      </div>
     }
    </div>
  )
}

export default AddSeries;