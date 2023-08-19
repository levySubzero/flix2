import { useCallback, useEffect, useState, useRef } from "react";
import NavbarItem from "./Navbaritem"
import SearchBar from "./SearchBar"
import MobileMenu from '@/components/MobileMenu';
import AccountMenu from "./AccountMenu";
import { BsBell, BsSearch, BsChevronDown } from 'react-icons/bs';
import { useRouter } from "next/router";
import Link from 'next/link';

const TOP_OFFSET = 66; 

interface NavbarProps {
  home: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ home }) => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const [showSBar, setshowSBar] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        // console.log(window.scrollY)
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

    const showBar = useCallback(() => {
      setshowSBar(true);
    }, []);
  
    const toggleAccountMenu = useCallback(() => {
      setShowAccountMenu((current) => !current);
    }, []);
    
    const toggleMobileMenu = useCallback(() => {
      setShowMobileMenu((current) => !current);
    }, []);
  
    return (
      <nav className={`w-full h-[100px] fixed top-0 ${home==true ? 'z-40' : ''}`}>
        <div className={`px-4 md:px-16 py-2 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
          <img onClick={() => router.push(`/`)} src="/images/logo.png" className="h-full w-20 md:h-[150px] md:w-[150px]" alt="Logo" />
          <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <Link href={"/"}><NavbarItem label="Home" /></Link>
            <Link href={"/seriesP"}><NavbarItem label="Series" /></Link>
            <Link href={"/films"}><NavbarItem label="Films" /></Link>
            <Link href={"/myList"}><NavbarItem label="My List" /></Link>
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-4 md:ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
            <MobileMenu visible={showMobileMenu} />
          </div>
          <div className="flex flex-row ml-auto gap-7 items-center">
            <div className={`${showSBar ? 'hidden' : 'block'} flex align-center cursor-pointer transition block md:hidden`}>
              <BsSearch onClick={() => showBar()} className="text-white"/>
            </div>
            <div className={`${showSBar ? 'block' : 'hidden'} flex align-center cursor-pointer transition  md:block`}>
              <SearchBar showB={showSBar} />
            </div>
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