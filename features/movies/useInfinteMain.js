import { useInfiniteQuery } from "@tanstack/react-query";
import {  getPopularMovies } from "../../services/apiMovie";

export function useInfinteMain(max=20){
    const {
        data, isSuccess,fetchNextPage,hasNextPage,isFetchingNextPage,isLoading,error,
      } = useInfiniteQuery({
        queryKey: [`featuredMovScroll`],
        queryFn:({pageParam})=>getPopularMovies(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage,allPages,) => {
          const nextPage=lastPage.length?allPages.length+1:undefined
          if (nextPage===max) return undefined
          return nextPage 
        },
      });
      return { data,isLoading ,fetchNextPage,hasNextPage,isFetchingNextPage,error};
}