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
    if (session) {
      // User is authenticated
      console.log(session.user); // Access user data like username, email, etc.
    }
    return {
        props: {}
    }
}

const AddEpisode = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
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

  const saveEpisode = useCallback(async () => {
    try {
      await axios.post('/api/newEpisode', {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration
      });
      router.push('/');
    } catch (error) {
        console.log(error);
    }
  }, [title, description, videoUrl, thumbnailUrl, duration]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>{!isAdmin && <p className='mt-80 text-green'>ADMIN ONLY</p>}</div>
    
    {isAdmin && 
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.jpeg" className="h-full w-16" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
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
                label="Movie Description" 
                value={description}
                onChange={(e: any) => setDescription(e.target.value)} 
              />
                <Input 
                  id="genre"
                  type="genre"
                  label="Movie genre"
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
                label="Movie duration" 
                value={duration}
                onChange={(e: any) => setDuration(e.target.value)} 
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