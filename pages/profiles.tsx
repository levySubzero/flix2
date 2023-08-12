import useCurrentUser from "@/hooks/useCurrentUser";
import useData from "@/hooks/useData";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import prismadb from '@/lib/prismadb';


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
  const user = session.user;
  if (user) {
    const cat = await prismadb.user.findFirstOrThrow({
      where: {
          name: user.name as string,
          email: user.email as string
      },
      select: {
        isAdmin: true
      }
    });
    const { isAdmin } = cat;
    if (isAdmin) {
      return {
        redirect: {
          destination: '/validate2fa',
          permanent: false,
        }
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
    const { data: stats } = useData();

  

    const selectProfile = useCallback(() => {
      router.push('/');
    }, [router]);

    return (
      <div>
        <div className="flex items-center h-full mt-36 justify-center">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div onClick={() => selectProfile()}>
                <UserCard name={currentUser?.name} />
              </div>
              
              <hr className="bg-gray-600 border-0 h-px/ my-4" />
              <div className="mt-4 text-green-400 text-2xl text-center group-hover:text-white">Activate 2FA</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profiles;