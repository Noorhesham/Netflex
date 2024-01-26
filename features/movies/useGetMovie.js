import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTvDetails } from "../../services/apiMovie";

export default function useGetMovie(id,publicMovie=false,media,url) {
  const {
    data: movie,
    error,
    isLoading,
  } = useQuery({ queryFn:()=>media==="tv"?getTvDetails(id):getMovieDetails(id,publicMovie), queryKey: ["movie",id,url] });
  return { movie, error, isLoading };
}
