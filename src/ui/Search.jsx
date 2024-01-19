import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useCloseModal } from "../hooks/useCloseModal";
import { RxCross2 } from "react-icons/rx";
import { useSearchQuery } from "../context/useSearchQuery";

function Search() {
  const [search, setSearch] = useState(false);
  const { query, setQuery } = useSearchQuery();
  function open(e) {
    e.stopPropagation();
    setSearch((s) => !s);
  }
  const close = () => setSearch(false);
  const ref = useCloseModal(close, false, false);
  return (
    <>
      <div
        ref={ref}
        className={`flex relative items-center ${
          (search ||query) && "outline outline-1"
        }`}
      >
        <motion.button
          onClick={(e) => open(e)}
          className={`transition-all p-1 duration-100 outline-none w-fit justify-end 
          `}
        >
          <IoIosSearch />
        </motion.button>
        <AnimatePresence>
          {(search ||query) && (
            <>
            <motion.input autoFocus 
              placeholder=" Search Movies, Shows"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              initial={{ width: 0 }} key="searchExit"
              animate={{ width: "15rem" }}
              transition={{ duration: 0.4 }}
              exit={{ width: 0 }}
              className={` placeholder:text-gray-400 bg-transparent  ml-1 outline-none text-sm h-[2rem] `}
              type="search"
              />
         <motion.button initial={{display:"block"}} exit={{display:"none"}} transition={{duration:.3}}
          className="p-1" onClick={() => setQuery("")}><RxCross2 /></motion.button>
            </>
         )}
         </AnimatePresence>
      </div>
    </>
  );
}

export default Search;
