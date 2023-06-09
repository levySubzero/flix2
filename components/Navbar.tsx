import { useCallback, useEffect, useState } from "react";
import NavbarItem from "./Navbaritem"
import MobileMenu from '@/components/MobileMenu';
import AccountMenu from "./AccountMenu";
// import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { BsBell, BsSearch, BsChevronDown } from 'react-icons/bs';
import { useRouter } from "next/router";

const TOP_OFFSET = 66; 

interface NavbarProps {
  home: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ home }) => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const handleScroll = () => {
        console.log(window.scrollY)
        if (window.scrollY >= TOP_OFFSET) {
          setShowBackground(true)
        } else {
          setShowBackground(false)
        }
      }
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }, []);
  
    const toggleAccountMenu = useCallback(() => {
      setShowAccountMenu((current) => !current);
    }, []);
  
    const toggleMobileMenu = useCallback(() => {
      setShowMobileMenu((current) => !current);
    }, []);
  
    return (
      <nav className={`w-full fixed ${home==true ? 'z-40' : ''}`}>
        <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-20 lg:h-full" alt="Logo" />
          <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <span onClick={() => router.push(`/`)}><NavbarItem label="Home" /></span>
            <span onClick={() => router.push(`/seriesP`)}><NavbarItem label="Series" /></span>
            <span onClick={() => router.push(`/films`)}><NavbarItem label="Films" /></span>
            <span onClick={() => router.push(`/myList`)}><NavbarItem label="My List" /></span>
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
            <MobileMenu visible={showMobileMenu} />
          </div>
          <div className="flex flex-row ml-auto gap-7 items-center">
            {/* <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
              <BsSearch className="w-6" />
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
              <BsBell className="w-6" />
            </div> */}
            <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-blue.png" alt="" />
              </div>
              <BsChevronDown className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;