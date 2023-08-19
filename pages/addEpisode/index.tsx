import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Input from "../../components/input";
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { NextPageContext } from 'next';
import Dropdown from '@/components/Dropdown';
import useSeriesList from '@/hooks/useSeriesList';
import { SeriesInterface } from '@/types';
import prismadb from '@/lib/prismadb';
import Select from 'react-select';
import useShows from '@/hooks/useShowList';
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
    try{
      const series = await prismadb.series.findMany();
      return {
        props: {
          
        }
      }

    } catch (error){
      console.log(error)
      return {
        props: {}
      }
    }
}

interface SeriesListProps {
  data: SeriesInterface[];
}

const AddEpisode= () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [showId, setShowId] = useState('');
  const { data: currentUser } = useCurrentUser();
  const { data: series = [] } = useSeriesList();
  const { data: shows = [] } = useShows();
  const [options, setOptions] = useState<SeriesInterface[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
      // router.push('/');
    }

  }, [currentUser]);

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
    const showId: string = selected.value
    setShowId(showId)
    axios.get(`/api/series/${showId}`)
      .then((response) => setOptions(response.data))
      .catch((error) => console.error('Error fetching data:', error));
    console.log(options);
  };

  const saveEpisode = useCallback(async () => {
    try {
      await axios.post('/api/newEpisode', {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        seriesId
      });
      alert('Episode added successfully!');
      router.push('/seriesP');
    } catch (error) {
        console.log(error);
    }
  }, [title, description, videoUrl, thumbnailUrl, duration, seriesId]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>{!isAdmin && <p className='mt-80 text-green'>ADMIN ONLY</p>}</div>
    
    {isAdmin && 
      <div className="bg-black w-full h-full lg:bg-opacity-50">
         <nav className="px-12 py-2 md:py-5 h-[168px]">
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-[168px] cursor-pointer" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="relative bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <BackButton />
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Add New Episode
            </h2>
            <div className="flex flex-col gap-4">
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
                label="Episode Description" 
                value={description}
                onChange={(e: any) => setDescription(e.target.value)} 
              />
              <Input 
                id="videoUrl"
                type="videoUrl"
                label="Episode video Url"
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
              <Input
                type="duration" 
                id="duration" 
                label="Episode duration" 
                value={duration}
                onChange={(e: any) => setDuration(e.target.value)} 
              />
              <Select
                styles={customStyles}
                onChange={handleShowChange}
                options={showslist}
              />
              <Dropdown 
                id="seriesId" 
                label="Select Series" 
                value={seriesId}
                series={options}
                onChange={(e: any) => setSeriesId(e.target.value)} 
              />
              
            </div>
            <button onClick={saveEpisode} className="bg-green-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Save
            </button>
          </div>    
        </div>
      </div>
     }
    </div>
  )
}

export default AddEpisode;