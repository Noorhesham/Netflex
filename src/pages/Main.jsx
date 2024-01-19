import {   useState } from "react";
import { useFeaturedMovies } from "../features/movies/useFeaturedMovies"
import MovieSwiper from "../features/movies/movieSwiper";
import MovieContent from "../ui/MovieContent";
import MovieCardsSwiper from "../ui/MovieCardsSwiper";
import { useSuperHeroMovies } from "../features/movies/useSuperHeroMovies";
import { usePlayingMovies } from "../features/movies/usePlayingMovies";
import { useMovieUpcoming } from "../features/movies/useMovieUpcoming";
import { useAnime } from "../features/movies/useAnime";
import { useSearchQuery } from "../context/useSearchQuery";
import SearchedMovies from "../ui/SearchedMovies";
import Skeleton from "../ui/Skeleton";
import Spinner from "../ui/Spinner";

function Main() {
    const {featuredMovies,isLoading}=useFeaturedMovies();
    const {featuredMovies:featuredMovies2,isLoading:isLoading6}=useFeaturedMovies(2);
    const{superHeroMovies,isLoading:isLoading2}=useSuperHeroMovies();
    const {playingMovies,isLoading:isLoading3}=usePlayingMovies();
    const {upcomingMovies,isLoading:isLoading4}=useMovieUpcoming();
    const {anime,isLoading:isLoading5}=useAnime(4);
    const {anime:anime2,isLoading:isLoading7}=useAnime(3);
    const [currentSlide,setCurrentSlide]=useState(0);
    const {query}=useSearchQuery()
   

    const setSlide=(s)=>setCurrentSlide(s);
    if(isLoading) return <Spinner/>
    if(isLoading2||isLoading3||isLoading4||isLoading5||isLoading6||isLoading7) return <Skeleton/>
    const activeMovie=featuredMovies?.at(currentSlide)
    return (
    <div className=" w-full h-[100vh] max-w-[full] relative  group">
    {query?<SearchedMovies query={query} />
    :
    isLoading?<Spinner/>:<><MovieContent activeMovie={activeMovie}/>
    <MovieSwiper setSlide={setSlide} curSlide={currentSlide} slides={featuredMovies}/></>}
   <div className="h-full relative py-4 ">
   <MovieCardsSwiper title={"Marvel cinematic universe"} movies={superHeroMovies}/>
   <MovieCardsSwiper title={"Playing Now"} movies={playingMovies}/>
   <MovieCardsSwiper title={"Coming soon"} movies={upcomingMovies}/>
   <MovieCardsSwiper title={"Top rated"} movies={featuredMovies2}/>
   <MovieCardsSwiper title={"Anime"} movies={anime}/>
   <MovieCardsSwiper title={""} movies={anime2}/>
   </div>
    </div>
    )
}

export default Main
