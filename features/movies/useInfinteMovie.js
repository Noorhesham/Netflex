import { useInfiniteQuery } from "@tanstack/react-query";
import { searchForMovie } from "../../services/apiMovie";
import { searchForMovieOnly } from "../../services/apiSearch";

export function useInfinteMovie( query,genre='',media ) {
  
  const {
    data,fetchNextPage,hasNextPage,isFetchingNextPage,isLoading,error,
  } = useInfiniteQuery({
    queryKey: [`search`,query,genre],
    queryFn:({pageParam=1})=>media==="movie"?searchForMovieOnly(query,genre,pageParam):searchForMovie(query,genre,pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage,allPages,) => {
      const nextPage=lastPage.length?allPages.length+1:undefined
      return nextPage 
    },
  });
  return { data,isLoading ,fetchNextPage,hasNextPage,isFetchingNextPage,error};
}
