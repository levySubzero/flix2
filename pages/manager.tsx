import useCurrentUser from "@/hooks/useCurrentUser";
import useData from "@/hooks/useData";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

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

  
const Profiles = () => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const [isAdmin, setIsAdmin] = useState(false);
    const { data: stats } = useData();

    useEffect(() => {
      if (currentUser?.isAdmin) { 
          setIsAdmin(true)
          
      }
  
    }, [currentUser]); 
    
    const usersNum = () => {
      return stats?.userCount
    };

    const moviessNum = () => {
      return stats?.moviesCount
    };

    const selectProfile = useCallback(() => {
      router.push('/');
    }, [router]);

    const addMovie = useCallback(() => {
      router.push('/addMovie');
    }, [router]);

    const addShow = useCallback(() => {
      router.push('/addShow');
    }, [router]);

    const addCategory = useCallback(() => {
      router.push('/addCategory');
    }, [router]);

    const addGenre = useCallback(() => {
      router.push('/addGenre');
    }, [router]);

    const addSeries = useCallback(() => {
      router.push('/addSeries');
    }, [router]);

    const addEpisode = useCallback(() => {
      router.push('/addEpisode');
    }, [router]);

    const delMovie = useCallback(() => {
      router.push('/delMovie');
    }, [router]);

    const selectCategories = useCallback(() => {
      router.push('/categorySelect');
    }, [router]);

    return (
      <div className="flex h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover items-center justify-center ">
        <div>{!isAdmin && <p className='mt-80 text-green'>LOST?</p>}</div>
         {isAdmin && <div className="flex flex-col py-5 w-full items-center bg-black bg-opacity-70 justify-center">
          <div className="flex flex-col md:grid">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                Users: {usersNum()}
              </h2>
              <h2 className="text-white text-4xl mb-8 font-semibold">
                Movies: {moviessNum()}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              
                <button onClick={addMovie} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  + New Movie
                </button>
                <button onClick={addShow} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  + New Show
                </button>
                <button onClick={addSeries} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  + New Show Season
                </button>
                <button onClick={addEpisode} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  + New Episode
                </button>
                <button onClick={addGenre} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  + New Genre
                </button>
                <button onClick={addCategory} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  + New Category
                </button>
                <button onClick={delMovie} className="bg-red-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                  Delete Movie
                </button>
                <button onClick={selectCategories} className="bg-green-600 px-3 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                  Home Categories
                </button>
            </div>    
          </div>}
        </div>
    );
}

export default Profiles;