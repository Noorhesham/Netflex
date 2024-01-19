import ReactPlayer from "react-player";
import { YOUTUBE_URL } from "../utils/Constans";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";

function Player() {
  const { url } = useParams();
  const navigate = useNavigate();
  console.log(url);
  return (
    <div className=" relative  pt-[2.5rem] w-[300%] h-[100vh] left-[-100%]">
      <FaArrowLeft
        className=" absolute text-5xl z-[99999] left-[34%] cursor-pointer hover:text-gray-500 duration-150 top-[10%]"
        onClick={() => navigate(-1)}
      />
      <ReactPlayer
        width="100%"
        height="100%"
        playing={true}
        controls={false}
        className=" absolute top-0 left-0 w-full h-full rounded-2xl bg-center bg-cover"
        url={`${YOUTUBE_URL}${url}`}
      />
    </div>
  );
}

export default Player;
