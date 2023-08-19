import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';
import Input from "../../components/input";
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { NextPageContext } from 'next';
import useEpisode from '@/hooks/useEpisode';
import { SeriesInterface, EpisodeInterface } from '@/types';
import prismadb from '@/lib/prismadb';
import useShows from '@/hooks/useShowList';
import { useRouter as RouterUse } from 'next/router';
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
  const router = useRouter();
  const route = RouterUse();
  const { id } = route.query;
  const { data: episode = {} } = useEpisode(id as string);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [showId, setShowId] = useState('');
  const { data: currentUser } = useCurrentUser();
  const { data: shows = [] } = useShows();
  const [options, setOptions] = useState<SeriesInterface[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
    }
  }, [currentUser]);

  useEffect(() => {
    const eps: EpisodeInterface = episode;
    setTitle(eps.title);
    setDescription(eps.description);
    setThumbnailUrl(eps.thumbnailUrl);
    setVideoUrl(eps.videoUrl);
    setDuration(eps.duration);
  }, [episode]);

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
      await axios.put('/api/newEpisode', {
        id,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
      });
      alert('Episode updated successfully!');
      router.push('/seriesP');
    } catch (error) {
        console.log(error);
    }
  }, [title, description, videoUrl, thumbnailUrl, duration]);


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
              Update Episode
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
            </div>
            <button onClick={saveEpisode} className="bg-green-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Update
            </button>
          </div>    
        </div>
      </div>
     }
    </div>
  )
}

export default AddEpisode;