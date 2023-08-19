import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import Input from "../../components/input";
import serverAuth from '@/lib/serverAuth';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { NextPageContext } from 'next';
import Select from 'react-select';
import useCategories from '@/hooks/useCategories';
import useGenres from '@/hooks/useGenres';
import BackButton from '@/components/BackButton';


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
    if (session) {
      // User is authenticated
      console.log(session.user); // Access user data like username, email, etc.
    }
    return {
        props: {}
    }
}

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [genreId, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [year, setYear] = useState('');
  const [subGenres, setSubGenres] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [cast, setCast] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const { data: currentUser } = useCurrentUser();
  const { data: cats = [] } = useCategories();
  const { data: gnres = [] } = useGenres();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  interface Category {
    label: string;
    value: string;
  }

  const genres: Category[] = [];
  cats.forEach((genre: { name: string; id: string; }) => {
    genres.push({label: genre.name, value: genre.id })
  });

  const categories: Category[] = [];
  gnres.forEach((category: { name: string; id: string; }) => {
    categories.push({label: category.name, value: category.id })
  });

  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
      // router.push('/');
    }

  }, [currentUser]); 

  const saveMovie = useCallback(async () => {
    try {
      await axios.post('/api/newMovie', {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genreId,
        categoryId,
        duration,
        year,
        subGenres, 
        trailerUrl, 
        cast, 
        shortDesc
      });
      router.push('/films');
    } catch (error) {
        console.log(error);
    }
  }, [title, description, videoUrl, thumbnailUrl, genreId, duration, categoryId, year, subGenres, trailerUrl, cast, shortDesc]);

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "black" : "black", 
      opacity: 1,
    }),

    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "black",
      opacity: 1, // Set the opacity to 1 to make it fully opaque
      zIndex: 100
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "rgba(160, 160, 160, 1)",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  const handlecChange = (selected: any) => {
    setCategoryId(selected.value);
    console.log(categoryId);
  };

  const handlegChange = (selected: any) => {
    setGenre(selected.value);
    console.log(genreId);
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>{!isAdmin && <p className='mt-80 text-green'>ADMIN ONLY</p>}</div>
    
    {isAdmin && 
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-2 md:py-5 h-[168px]">
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-[168px] cursor-pointer" alt="Logo" />
        </nav>
        <div className="flex justify-center mx-4">
          <div className="relative bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md w-full">
            <BackButton />
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Add New Movie
            </h2>
            <div className="space-y-2 flex items-center grid md:grid-cols-2 gap-2">
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
                label="Description" 
                value={description}
                onChange={(e: any) => setDescription(e.target.value)} 
              />
              <Input 
                id="videoUrl"
                type="videoUrl"
                label="Enter Movie Url/link"
                value={videoUrl}
                onChange={(e: any) => setVideoUrl(e.target.value)}  
              />
              <Input
                type="thumbnailUrl" 
                id="Enter Thumbnail Url/link" 
                label="thumbnailUrl" 
                value={thumbnailUrl}
                onChange={(e: any) => setThumbnailUrl(e.target.value)} 
              />
              <Select
                styles={customStyles}
                onChange={handlecChange}
                options={categories}
              />
              <Select
                styles={customStyles}
                onChange={handlegChange}
                options={genres}
              />
              <Input
                type="duration" 
                id="duration" 
                label="Movie duration" 
                value={duration}
                onChange={(e: any) => setDuration(e.target.value)} 
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
          </div>
          <div className="flex justify-center">
            <button onClick={saveMovie} className="bg-green-600 py-3 text-white rounded-md w-1/2 md:w-1/4 mt-10 hover:bg-red-700 transition">
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

export default AddMovie;