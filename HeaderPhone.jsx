import { RiMenuAddLine } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { IoExitOutline } from "react-icons/io5";
import { motion } from "framer-motion";

function HeaderPhone({links}) {
  
  //for circle animation
  const variants = {
    open: {
      clipPath: "circle(2000px at 50px 50px)",
      transition: { type: "spring", stiffness: 20 },
    },
    closed: {
      clipPath: "circle(0px at 25px 25px",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };
  //this state is to figure out if the menu is clicked or not
  const [toggle, isToggle] = useState(false);
  const ref = useRef(); //we will connect this ref to the ul dom element so we can check if it is clicked we wont close the menu


  function handleClick() {
    isToggle((toggle) => !toggle);
  }

  useEffect(
    function () {
      function handleClickOutside(e) {
        //i want to make sure that the click is not on the ul or  the list so i wont close the menu
        if (!e.target.closest("button") &&ref.current !== e.target.closest("ul")) isToggle(false);
      }
      document.addEventListener("click", handleClickOutside);
    },
    [toggle]
  );

  return (
    <motion.div variants={variants}>
   <button onClick={handleClick}
        className=" lg:hidden block fixed z-[900000000000]
           bg-red-700 text-2xl py-5 px-5 rounded-full hover:bg-red-600  transition-all duration-75
          border-none active:ring-1 active:ring-purple-400"
      >
        <RiMenuAddLine />
      </button>
      
          
      <motion.ul
        variants={variants} animate={toggle ? "open" : "closed"} ref={ref}
        className="flex fixed bottom-0 flex-col  bg-white w-[50%] lg:w-[30%] h-full
            gap-14 justify-center items-stretch py-8 px-14 text-gray-800 font-semibold
            capitalize transition-all duration-100 z-[100000000000]"
      >
        {toggle && (
          <div>
            <button
              className="block w-fit fixed top-14 left-7  text-5xl text-pink-700  hover:text-white transition-all duration-100"
              onClick={handleClick}
            >
              <IoExitOutline />
            </button>
          </div>
        )}
         <div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="   p-5 shadow-xl"
          >
           <img className=" w-[7.5rem]" src="logo.png" alt="" />
          </motion.h2>
        </div>
        {links.map((link) => (<li key={link.name} className={` px-3 py-2 bg-gray-100  hover:text-white hover:bg-pink-600 transition-all duration-100 flex items-center gap-4 text-2xl lg:text-4xl `}>
             <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default HeaderPhone;
