import {  Link, NavLink } from "react-router-dom";
import { useLogout } from "../features/authentication/useLogout";
import { IoIosSearch, IoMdNotificationsOutline  } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { PiTelevisionThin } from "react-icons/pi";
import { MdRateReview } from "react-icons/md";

import DropMenu from "./DropMenu";
import Search from "./Search";
import { useEffect, useState } from "react";

function Header() {
  const { isLoggingOut, logout } = useLogout();
  const [navBar,setNavBar]=useState(false);

   const handleScroll = () => {
    if(window.pageYOffset > 10) setNavBar(true);
    else setNavBar(false)
  };
  
  useEffect(() => {
   window.addEventListener('scroll', handleScroll, true);
    return () =>window.removeEventListener('scroll', handleScroll, true);
  }, []);
  return (
    <header className={`flex justify-between items-center py-4 px-6 bg-black/10 fixed w-full z-50 duration-300 ${navBar&&"is-sticky"}`}>
        <div>
            <img className=" w-[7.5rem]" src="logo.png" alt="" />
        </div>
      <ul className="flex gap-5 items-center flex-1 ml-10 text-[.9rem] font-medium text-gray-300">
        <li>
          <NavLink className="hover:text-gray-400 transition-all duration-100" to="main">Home</NavLink>
        </li>
        <li>
          <NavLink className="hover:text-gray-400 transition-all duration-100" to="shows">Tv shows</NavLink>
        </li>
        <li>
          <NavLink className="hover:text-gray-400 transition-all duration-100" to="movies">Movies</NavLink>
        </li>
        <li>
          <NavLink className="hover:text-gray-400 transition-all duration-100" to="new">New & Popular</NavLink>
        </li>
        <li>
          <NavLink className="hover:text-gray-400 transition-all duration-100" to="list">My List</NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-5 text-2xl mr-5">
        <Search/>
        <IoMdNotificationsOutline />
        <div className="flex items-center text-xl relative">
         
          <DropMenu>
            <DropMenu.Toggle id={1} /> 
            <DropMenu.Menu id={1}>
            <li className=" hover:text-white transition-all duration-100 hover:underline"><Link to="account" className="flex items-center gap-2"><IoPerson/> Account</Link></li>
            <li className=" hover:text-white transition-all duration-100 hover:underline"><Link className="flex items-center gap-2"><PiTelevisionThin/> watch list</Link></li>
            <li className=" hover:text-white transition-all duration-100 hover:underline"><Link className="flex items-center gap-2"><MdRateReview/> my reviews</Link></li>
            <li className=" flex items-center gap-2 hover:underline hover:text-red-600
             transition-all duration-100 cursor-pointer " onClick={() => logout()}><VscSignOut/> Sign out</li>
            </DropMenu.Menu>
          </DropMenu>
        </div>
      </div>

    </header>
  );
}

export default Header;
