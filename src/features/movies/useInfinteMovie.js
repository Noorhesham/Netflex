import { useInfiniteQuery } from "@tanstack/react-query";
import { searchForMovie } from "../../services/apiMovie";

export function useInfinteMovie( query ) {
  const {
    data, isSuccess,fetchNextPage,hasNextPage,isFetchingNextPage,isLoading,error,
  } = useInfiniteQuery({
    queryKey: [`search`,query],
    queryFn:({pageParam=1})=>searchForMovie(query,pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage,allPages,) => {
      const nextPage=lastPage.length?allPages.length+1:undefined
      return nextPage 
    },
  });
  return { data,isLoading ,fetchNextPage,hasNextPage,isFetchingNextPage};
}
