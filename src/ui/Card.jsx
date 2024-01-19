import { useEffect, useRef, useState } from "react";
import { IMAGE_URL_SMALL } from "../utils/Constans";
import Video from "./video";
import { IoPlayCircleSharp } from "react-icons/io5";
import { PiPlusFill, PiThumbsDownFill, PiThumbsUpFill } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

function Card({ movie,innerRef }) {
  const [isHovered, setIsHovered] = useState(false);
  const [video, setVideo] = useState(false);
  const [positionX, setPositionX] = useState();
  const [positionY, setPositionY] = useState();
  const [height, setHeight] = useState();
  const ref = useRef();
  const image = useRef();
  useEffect(
    function () {
      setVideo(false);
      const interval = setTimeout(() => {
        setVideo(true);
      }, 2500);
      return () => clearTimeout(interval);
    },
    [movie, isHovered]
  );
  function onHover() {
    // console.log(image.current.getBoundingClientRect().height)
    setHeight(image?.current?.getBoundingClientRect().clientHeight);
    setPositionX(ref.current.getBoundingClientRect().left + window.scrollX);
    setPositionY(ref.current.getBoundingClientRect().top + window.scrollY);
    setIsHovered(true);
  }
  if((!movie.backdrop_path||movie.backdrop_path===null)) return null
  return (
    <div
      ref={ref}
      className=" relative  w-[20rem] mt-4 "
      onMouseEnter={() => onHover()}
      onMouseLeave={() => setIsHovered(false)}
    >
     <img ref={innerRef}
        className="duration-150  rounded-lg "
        src={`${IMAGE_URL_SMALL}${movie.backdrop_path}`}
        alt=""
      />
      {isHovered &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ left: positionX, top: positionY }}
            className=" flex flex-col duration-150 absolute right-[-25%] top-[-15%]  w-[24rem]  shadow-2xl bg-[#242424] rounded-lg cursor-pointer z-50"
          >
            <div className=" h-[14rem] ">
              {video&&movie.videos&&movie.videos.results.length!==0 ? (
                <Video mute={true} activeMovie={movie} />
              ) : (
               <img
                  ref={image}
                  className=" w-full  rounded-lg  "
                  src={`${IMAGE_URL_SMALL}${movie.backdrop_path}`}
                  alt=""
                />
              )}
            </div>
            <div className="flex flex-col bg-[#242424] rounded-md shadow-2xl">
              <div className="flex justify-between text-3xl p-4 ">
                <div className=" flex  items-center gap-2 ">
                  <div className=" hover:bg-gray-800 p-2 rounded-full border-gray-200 border-2  ">
                    <IoPlayCircleSharp />
                  </div>
                  <div className=" hover:bg-gray-800 p-2 rounded-full border-gray-200 border-2  ">
                    <PiThumbsUpFill />
                  </div>
                  <div className=" hover:bg-gray-800 p-2 rounded-full border-gray-200 border-2  ">
                    <PiThumbsDownFill />
                  </div>
                  <div className=" hover:bg-gray-800 p-2 rounded-full border-gray-200 border-2  ">
                    <PiPlusFill />
                  </div>
                </div>
                <div className=" hover:bg-gray-800 p-2 rounded-full border-gray-200 border-2  ">
                  <FaChevronDown title="more info" />
                </div>
              </div>
              <div className="flex flex-col items-start ml-1">
                <h2 className=" p-1 text-lg font-semibold capitalize ">
                  {movie.title||movie.name}
                </h2>
                <div>
                  <ul className=" p-1 flex text-xl flex-wrap font-semibold text-gray-300 gap-2">
                    {movie.genres?.map((gen) => (
                      <li key={gen.name}>{gen.name}</li>
                    ))}
                  </ul>
                </div>
                <div className=" flex gap-3  pb-3 p-1 text-lg font-semibold text-gray-200">{movie.runtime?`${movie.runtime} min `:movie.seasons?`${movie.number_of_episodes} episodes   ${movie.seasons.length} ${movie.seasons.length===1?` season` :'seasons'}`:""}</div>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </div>
  );
}

export default Card;
