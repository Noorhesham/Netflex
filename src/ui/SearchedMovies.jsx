import { useInView } from "react-intersection-observer";
import { useInfinteMovie } from "../features/movies/useInfinteMovie";
import Card from "./Card"
import ErrorFallback from "./ErrorFallBack";
import FeedSkeleton from "./FeedSkeleton";
import Skeleton from "./Skeleton";
import {motion} from "framer-motion"
import { useEffect } from "react";
import { useSearchedMovies } from "../features/movies/useSearchedMovies";
import SearchTitles from "./SearchTitles";

function SearchedMovies({query}) {
    const{ref,inView}=useInView()
    const{data:searchedMovies,isLoading,error,fetchNextPage,isFetchingNextPage,hasNextPage}=useInfinteMovie(query)
    const {searchedMovieTitle}=useSearchedMovies(query)
    const {total_pages,total_results} =searchedMovieTitle||{};

    useEffect(function(){
    if(inView&&hasNextPage) fetchNextPage()
    },[inView,hasNextPage,fetchNextPage])
    if(searchedMovies?.pages.length===0||total_results===0)return <ErrorFallback search={true} message={`your search for "${query}" did not have any matches`}/>
    if(isLoading) return <Skeleton/>
    if(error) return <ErrorFallback message={error.message}/>
    return (
     <section className="pt-20 ">
            <SearchTitles total_pages={total_pages} total_results={total_results} query={query}/>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.9}} 
         className="grid grid-cols-4 p-6 text-center  gap-5 min-h-[40rem]">
            {searchedMovies?.pages.flat(1).map((m,i)=>{
               if (searchedMovies?.pages.flat(1).length===i+1) return <Card innerRef={ref} key={m.id} movie={m}/>
               return <Card key={m.id} movie={m}/>
            })}
            {isFetchingNextPage&&Array(10).fill(<FeedSkeleton key={Math.random()}/>)}
            {/* <button ref={ref} onClick={()=>fetchNextPage()}> load</button> */}
        </motion.div>
     </section>
    )
    }

export default SearchedMovies
