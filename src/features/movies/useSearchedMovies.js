import { useQuery } from "@tanstack/react-query";
import { searchForMovie } from "../../services/apiMovie";

export function useSearchedMovies(query){
    const{data:searchedMovieTitle,isLoading,error}=useQuery({queryFn:()=>searchForMovie(query,1,true),queryKey:[`search${query}`],});
    return {searchedMovieTitle,isLoading,error}
}