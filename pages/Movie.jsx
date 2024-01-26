import {  useParams } from "react-router";
import useGetMovie from "../features/movies/useGetMovie";
import { useUser } from "../features/authentication/useUser";
import { motion } from "framer-motion";

import Spinner from "../ui/loading/Spinner";

import Data from "../ui/Data";

function Movie() {
  const { movieId } = useParams();
  const { movie, isLoading } = useGetMovie(movieId, true);
  const { user, isAuthenticated } = useUser();
  if (isLoading) return <Spinner />;
  const media='movie'
  console.log(movie)
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        <Data media={media} movie={movie}/>
     
    </motion.section>
  );
}

export default Movie;
