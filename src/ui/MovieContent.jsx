import { motion } from "framer-motion";
import { IMAGE_URL } from "../utils/Constans";
import { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";
import Video from "./video";

function MovieContent({ activeMovie }) {
  const [video, setVideo] = useState(false);
  const [logo, setLogo] = useState(false);

  useEffect(
    function () {
      setVideo(false);
      setLogo(false);
      const interval = setTimeout(() => {
        setVideo(true);
      }, 4500);
      const time = setTimeout(() => {
        setLogo(true);
      },5500);
      return () => {
        clearTimeout(interval);
        clearTimeout(time);
      };
    },
    [activeMovie]
  );
  function handlePause() {
    setTimeout(() => {
      setLogo(false);
      setVideo(false);
    }, 2000);
  }
  function handlePlay() {
    setLogo(false);
    setVideo(true);
  }

  return (
    <>
      {video && activeMovie.videos.results.length > 0 ? (
        <Video activeMovie={activeMovie} handlePause={handlePause} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundImage: `url(${IMAGE_URL}${activeMovie?.backdrop_path})`,
          }}
          className=" relative  w-full h-full  bg-center bg-cover duration-500"
        ></motion.div>
      )}
      <MovieInfo
        logo={logo}
        handlePlay={handlePlay}
        activeMovie={activeMovie}
      />
    </>
  );
}

export default MovieContent;
