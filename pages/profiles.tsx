import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";


const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]

interface UserCardProps {
  name: string;
}

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

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
        </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
    </div>
  );
}
  
const Profiles = () => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const [isAdmin, setIsAdmin] = useState(false);
    
    const usersNum = () => {
      return "67"
    };

    const moviessNum = () => {
      return "43"
    };

    const selectProfile = useCallback(() => {
      router.push('/');
    }, [router]);

    const addMovie = useCallback(() => {
      router.push('/addMovie');
    }, [router]);

    const delMovie = useCallback(() => {
      router.push('/delMovie');
    }, [router]);

    const adminPanel = () => {
      if (currentUser?.isAdmin) {
        setIsAdmin(true);
      }
    };
      
    adminPanel();

    return (
        <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div onClick={() => selectProfile()}>
                <UserCard name={currentUser?.name} />
              </div>
              {isAdmin && <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                  <h2 className="text-white text-4xl mb-8 font-semibold">
                    Users: {usersNum()}
                  </h2>
                  <h2 className="text-white text-4xl mb-8 font-semibold">
                    Movies: {moviessNum()}
                  </h2>
                  <button onClick={addMovie} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition">
                    + New Movie
                  </button>
                  <button onClick={delMovie} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    Delete Movie
                  </button>
                </div>    
              </div>}
            </div>
        </div>
        </div>
    );
}

export default Profiles;