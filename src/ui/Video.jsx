import ReactPlayer from "react-player";
import { YOUTUBE_URL } from "../utils/Constans";

function Video({ handlePause, activeMovie, mute = false, height }) {
  // <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
  //     <YouTube opts={{height:'90%',width:'100%',playerVars:{autoplay:1,controls:0,rel:0,fs:0,disablekb:0,}}}
  //    className="relative   w-full h-full rounded-2xl bg-center bg-cover duration-500" videoId={activeMovie.videos.results[0].key}/>
  return !mute ? (
    <div className=" relative  pt-[2.5rem] w-[300%] h-full left-[-100%]">
      <ReactPlayer
        onPause={handlePause}
        width="100%"
        height="100%"
        playing={true}
        controls={false}
        className=" absolute top-0 left-0 w-full h-full rounded-2xl bg-center bg-cover"
        config={{ youtube: { playerVars: { start: 11 } } }}
        url={`${YOUTUBE_URL}${activeMovie.videos.results[0].key}`}
      />
    </div>
  ) : (
    <ReactPlayer
      width="100%"
      height={"100%"}
      playing={true}
      controls={false}
      className="pointer-events-none rounded-lg h-full object-cover  "
      config={{
        youtube: {
          playerVars: { start: 11, rel: 0, showinfo: 0 },
          preload: true,
        },
      }}
      muted
      url={`${YOUTUBE_URL}${activeMovie.videos?.results?.length>0&&activeMovie.videos.results[0].key}`}
    />
  );
}

export default Video;
