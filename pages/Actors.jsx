import { MdArrowForwardIos } from "react-icons/md"
import { useGetPopularActors } from "../features/actors/useGetPopularActors"
import PersonData from "../ui/actors/PersonData"
import Title from "../ui/components/Title"
import Spinner from "../ui/loading/Spinner"
import MovieCardsSwiper from "../ui/swipers/MovieCardsSwiper"
import { useNavigate } from "react-router"

function Actors() {
    const {featuredActors,isLoading}=useGetPopularActors()
    if(isLoading) return <Spinner/>
    console.log(featuredActors)
    // const navigate = useNavigate();
    // function navigateToImages() {
    //     navigate(`/image/"person"/${actor.id}`);
    //   }
    return (
        <div>
            {<>
                <div className=" col-span-2">
            <Title >
              Profiles
              <MdArrowForwardIos className=" white group-hover:text-red-700 duration-100 " />
            </Title>
            <MovieCardsSwiper
              avatar={true}
              movies={featuredActors}
            />
          </div></>}
        </div>
    )
}

export default Actors
