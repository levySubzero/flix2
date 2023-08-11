import useCategories from "@/hooks/useCategories";
import useCurrentUser from "@/hooks/useCurrentUser";
import useData from "@/hooks/useData";
import axios from "axios";
import { NextPageContext } from "next";
import { BsCheckLg, BsXLg  } from 'react-icons/bs';
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CategoryInterface } from "@/types";

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

interface CatProps {
  data: CategoryInterface;
  home: boolean;
}

const CategoryTab: React.FC<CatProps> = ({ data: cat, home }) => {
  const [isHome, setHome] = useState(home);

  useEffect(() => {
    
  }, [isHome]); 

  async function updater (catId: string)  {
    try {
      setHome(prevState => !prevState);
      const response = await axios.put(`/api/categories/${catId}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="px-3 py-2 flex flex-row items-center justify-between w-full">
      <p className="text-white text-xl">{cat.name}</p>
      { isHome ? <div onClick={() => updater(cat.id)} className="flex items-center justify-between border border-red-500 rounded-lg p-4 cursor-pointer gap-2">
        <BsXLg className="text-red-500 text-xl" />
        <p className="text-red-500 text-xl hover:underline">Remove</p>
      </div> : 
      <div onClick={() => updater(cat.id)} className="flex items-center justify-between cursor-pointer border border-green-500 rounded-lg p-4 gap-2">
        <BsCheckLg className="text-green-500 text-xl" />
        <p className="text-green-500 text-xl hover:underline">Add</p>
      </div>
      }
    </div>
  );
}
  
const CategorySelect = () => {
    const router = useRouter();
    const { data: categorys = [] } = useCategories();
    const { data: currentUser } = useCurrentUser();
    const [isAdmin, setIsAdmin] = useState(false);
    const { data: stats } = useData();

    useEffect(() => {
      if (currentUser?.isAdmin) { 
          setIsAdmin(true)   
      }
    }, [currentUser]); 
    

    
    return (
      <div className="flex h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div>{!isAdmin && <p className='mt-80 text-green'>LOST?</p>}</div>
          {isAdmin && <div className="flex flex-col py-5 w-full items-center bg-black bg-opacity-80">
            <p className="text-white text-md mt-4 md:text-xl lg:text-2xl font-semibold ">Select Categories to Load in home</p>
            <div className="bg-black w-1/2 py-4 mt-4 flex-col border-2 justify-center border-gray-800 flex">
              {categorys.map((cat: CategoryInterface) => (
                <CategoryTab key={cat.id} data={cat} home={cat.home} />
              ))}
            </div>
          </div>}
        </div>
    );
}

export default CategorySelect;