import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import Input from "../../components/input";
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { NextPageContext } from 'next';
import useShows from '@/hooks/useShowList';
import Select from 'react-select';
import { useRouter as RouterUse } from 'next/router';
import { SeriesInterface, ShowInterface } from '@/types';
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
    
    return {
        props: {}
    }
}

const AddSeries = () => {
  const router = useRouter();
  const route = RouterUse();
  const { id } = route.query;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [showId, setShowId] = useState('');
  const [showName, setShowName] = useState('');
  const [year, setYear] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [cast, setCast] = useState('');
  const { data: currentUser } = useCurrentUser();
  const { data: shows = [] } = useShows();
  const [isAdmin, setIsAdmin] = useState(false);

  
  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
    }

  }, [currentUser]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/findSeries/${id}`);
        const eps: SeriesInterface = response.data;
        setTitle(eps.title);
        setDescription(eps.description);
        setThumbnailUrl(eps.thumbnailUrl);
        setYear(eps.year);
        setTrailerUrl(eps.trailerUrl);
        setCast(eps.cast);
        const showName = shows.find((show: ShowInterface) => show.id === eps.showId);
        setShowName(showName.title);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

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

  const showslist = shows.map((show: {id: string, title: string}) => (
    {label: show.title, value: show.id}  
  ));

  const handleShowChange = (selected: any) => {
    setShowId(selected.value);
  };

  const saveSeries = useCallback(async () => {
    try {
      await axios.put('/api/newSeries', {
        id,
        title,
        description,
        thumbnailUrl,
        year,
        trailerUrl,
        cast,
        showId
      });
      alert('Season updated successfully!');
      router.push('/seriesP');
    } catch (error) {
        console.log(error);
    }
  }, [title, description, thumbnailUrl, showId, year, trailerUrl, cast]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>{!isAdmin && <p className='mt-80 text-red'>ARE YOU LOST!!!</p>}</div>
    
    {isAdmin && 
      <div className="bg-black w-full h-full lg:bg-opacity-50">
         <nav className="px-12 py-2 md:py-5 h-[168px]">
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-[168px] cursor-pointer" alt="Logo" />
        </nav>
        <div className="flex justify-center mx-4">
          <div className="relative bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md w-full">
            <BackButton />
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Update {title}
            </h2>
            <p className="text-white text-lg mb-8 font-normal"> Current Show/Series: <span className="text-green-500">{showName}</span></p>
            <div className="space-y-2 flex flex-col items-center md:grid grid-cols-2 gap-2">
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
              <Select
                styles={customStyles}
                onChange={handleShowChange}
                options={showslist}
              />
              <Input
                type="year" 
                id="year" 
                label="Year" 
                value={year}
                onChange={(e: any) => setYear(e.target.value)} 
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
            </div>
            <div className="flex justify-center">
              <button onClick={saveSeries} className="bg-green-600 py-3 text-white rounded-md w-1/2 md:w-1/4 mt-10 hover:bg-red-700 transition">
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