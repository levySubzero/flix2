import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Input from "../../components/input";
import useCurrentUser from '@/hooks/useCurrentUser';
import { useParams, useRouter } from 'next/navigation';
import { NextPageContext } from 'next';
import { SeriesInterface } from '@/types';
import { useRouter as RouterUse } from 'next/router';


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

interface SeriesListProps {
  data: SeriesInterface[];
}

const AddGenre= () => {
  const [name, setName] = useState('');
  const { data: currentUser } = useCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const route = RouterUse();
  const { id } = route.query;
  useEffect(() => {
    if (currentUser?.isAdmin) { 
        setIsAdmin(true)
    } else {
      // router.push('/');
    }

  }, [currentUser]);

  const saveGenre = useCallback(async () => {
    try {
      await axios.put('/api/newGenre', {
        id, name
      });
      router.push('/');
    } catch (error) {
        console.log(error);
    }
  }, [name]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div>{!isAdmin && <p className='mt-80 text-green'>ARE YOU LOST</p>}</div>
    
    {isAdmin && 
      <div className="bg-black w-full h-full lg:bg-opacity-50">
         <nav className="px-12 py-5 h-28">
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-28" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Update Genre
            </h2>
            <div className="flex flex-col gap-4">
              <Input 
                id="name"
                type="name"
                label="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}  
              />
              
            </div>
            <button onClick={saveGenre} className="bg-green-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Update
            </button>
          </div>    
        </div>
      </div>
     }
    </div>
  )
}

export default AddGenre;