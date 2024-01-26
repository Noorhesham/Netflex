import useGetTvDetails from "../tv/usegetTvDetails";
import Spinner from "../ui/loading/Spinner";
import { motion } from "framer-motion";
import Data from "../ui/Data";
import Episodes from "../ui/episodes/Episodes";
import Title from "../ui/components/Title";
import { MdArrowForwardIos } from "react-icons/md";
import Seasons from "../ui/episodes/Seasons";
import TvShowsEpisodes from "../ui/episodes/TvShowsEpisodes";

function Show() {
  const { show, isLoading } = useGetTvDetails();
  if (isLoading) return <Spinner />;
  console.log(show);
  const media = "tv";
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Data media={media} movie={show}>
        <TvShowsEpisodes show={show} />
      </Data>
    </motion.section>
  );
}

export default Show;
